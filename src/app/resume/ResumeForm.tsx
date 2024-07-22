'use client'
import { useToast } from '@/components/ui/use-toast'
import React, { FormEvent, useState } from 'react'

const ResumeForm = () => {
  const [email, setEmail] = useState('')
  const [isloading, setIsLoading] = useState(false)

  const { toast } = useToast()
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const origin =
        typeof window !== 'undefined' && window.location.origin
          ? window.location.origin
          : 'https://shop-next.nullchemy.com'
      const res: any = await fetch(`${origin}/api/resume`, {
        method: 'POST',
        redirect: 'follow',
        cache: 'no-store',
        body: JSON.stringify({ email: email }),
      })
      setIsLoading(false)

      if (!res.ok) {
        throw new Error('Failed to send request. Please Retry!')
      }
      const response: any = await res.json()
      toast({
        title: 'Request Success',
        description: `Request received from ${response?.results?.successEmails[0]}`,
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
      })
    }
  }
  return (
    <form
      className="flex items-center justify-center gap-4 mb-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="py-2 px-6 w-[300px] rounded-md outline-none border border-slate-900"
        placeholder="email..."
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />
      <button
        className="bg-blue-500 h-10 w-24 rounded-full text-white cursor-pointer"
        type="submit"
      >
        {isloading ? <div className="dot-flashing"></div> : 'request'}
      </button>
    </form>
  )
}

export default ResumeForm
