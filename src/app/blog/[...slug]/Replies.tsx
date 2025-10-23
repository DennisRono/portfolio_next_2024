'use client'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Heart, Loader2, MessageCircle, ReplyIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Editor } from '@/components/editor'
import { toast } from 'sonner'

const formSchema: any = z.object({
  full_name: z.string().min(1, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  reply: z.string().min(10, {
    message: 'Reply must be at least 10 characters.',
  }),
  newsletter: z.boolean().default(false),
})

interface Reply {
  id: number
  author: string
  content: string
  replies: Reply[]
}

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const initialReplies: Reply[] = []

const Replies = () => {
  const [replies, setReplies] = useState<Reply[]>(initialReplies)
  const [newReply, setNewReply] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pendingSubmission, setPendingSubmission] = useState<z.infer<
    typeof formSchema
  > | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      email: '',
      reply: '',
      newsletter: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPendingSubmission(values)
    setIsModalOpen(true)
  }

  const handleConfirmSubmission = async () => {
    if (!pendingSubmission) return

    setIsModalOpen(false)
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)

    const newReplyObj: Reply = {
      id: Date.now(),
      author: pendingSubmission.full_name,
      content: pendingSubmission.reply,
      replies: [],
    }

    if (replyingTo === null) {
      setReplies([...replies, newReplyObj])
    } else {
      const updatedReplies = addReplyToThread(replies, replyingTo, newReplyObj)
      setReplies(updatedReplies)
      setReplyingTo(null)
    }

    form.reset()
    setNewReply('')
    setPendingSubmission(null)

    toast.success('Reply submitted successfully!', {
      description: 'Your comment has been added to the discussion.',
    })
  }

  const addReplyToThread = (
    thread: Reply[],
    parentId: number,
    newReply: Reply
  ): Reply[] => {
    return thread.map((reply) => {
      if (reply.id === parentId) {
        return { ...reply, replies: [...reply.replies, newReply] }
      } else if (reply.replies.length > 0) {
        return {
          ...reply,
          replies: addReplyToThread(reply.replies, parentId, newReply),
        }
      }
      return reply
    })
  }

  const renderReplies = (replyList: Reply[], depth = 0, isLastChild = true) => {
    return replyList.map((reply, index: number) => {
      return (
        <div key={index} className={`mt-4 ${depth > 0 ? 'ml-8' : ''} relative`}>
          <div className="p-4 rounded-lg border border-gray-100/2 shadow-sm">
            <h4 className="font-bold">{reply.author}</h4>
            <p>{reply.content}</p>
            <div className="flex items-center justify-start gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 p-1 px-2"
                onClick={() => setReplyingTo(reply.id)}
              >
                <ReplyIcon className="mr-1 h-2 w-2" />
                Reply
              </Button>
              <Button variant="ghost" size="sm" className="mt-2 p-1 px-2">
                <Heart className="mr-1 h-2 w-2" />
                Like
              </Button>
            </div>
          </div>
          {reply.replies.length > 0 && (
            <div className="mt-2">
              {renderReplies(
                reply.replies,
                depth + 1,
                index === replyList.length - 1
              )}
            </div>
          )}
        </div>
      )
    })
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="border border-gray-500 dark:border-white !rounded-[10px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@dkr.com"
                      {...field}
                      className="border border-gray-500 dark:border-white !rounded-[10px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="reply"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Reply</FormLabel>
                <FormControl>
                  <Editor mode="comment" {...field} />
                </FormControl>
                <FormDescription>
                  {replyingTo !== null ? 'Replying to a comment. ' : ''}
                  Abide by policies in your reply
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-start w-full">
            <FormField
              control={form.control}
              name="newsletter"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Subscribe to newsletter</FormLabel>
                    <FormDescription>
                      Get updates on our latest articles and changes
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-min px-8 text-white bg-indigo-600 hover:bg-indigo-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-6 animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                'Submit Reply'
              )}
            </Button>
          </div>
        </form>
      </Form>

      <div>
        <h2 className="text-2xl font-bold mb-4">Replies to Blog Post</h2>
        {renderReplies(replies)}
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSubmission}
      />
    </div>
  )
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="!bg-white">
        <DialogHeader>
          <DialogTitle>Confirm Submission</DialogTitle>
          <DialogDescription>
            Verify the confirmation link in your email within 24 hours, or your
            Comment/Reply will be deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className='!bg-violet-700 text-white' onClick={onConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Replies
