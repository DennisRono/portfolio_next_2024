'use client'
import type React from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import z from 'zod'

const emailSchema = z.string().email('Please enter a valid email address')

export default function ResumeForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState('')

  const { toast } = useToast()

  const validateEmail = (email: string): boolean => {
    try {
      emailSchema.parse(email)
      setEmailError('')
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0].message)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email
    if (!validateEmail(email)) {
      return
    }

    try {
      setIsLoading(true)

      // Get origin for API call
      const origin =
        typeof window !== 'undefined' && window.location.origin
          ? window.location.origin
          : 'https://denniskibet.com'

      // Make API request
      const res = await fetch(`${origin}/api/resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(
          errorData.message || 'Failed to send request. Please try again.'
        )
      }

      const response = await res.json()

      // Show success message
      toast({
        title: 'Request Successful',
        description: `Resume has been sent to ${response?.results?.successEmails[0]}`,
        variant: 'default',
      })

      // Reset form
      setEmail('')
    } catch (error: any) {
      // Show error message
      toast({
        title: 'Request Failed',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className="w-full space-y-4"
      onSubmit={handleSubmit}
      aria-label="Resume request form"
    >
      <div className="space-y-2">
        <div className="relative">
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (e.target.value) validateEmail(e.target.value)
            }}
            className={`w-full py-2 px-4 rounded-md border ${
              emailError
                ? 'border-red-500 focus-visible:ring-red-500'
                : 'border-input'
            }`}
            disabled={isLoading}
            required
            aria-invalid={!!emailError}
            aria-describedby={emailError ? 'email-error' : undefined}
          />
          {emailError && (
            <p id="email-error" className="text-sm text-red-500 mt-1">
              {emailError}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-md py-2 transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Request Resume'
          )}
        </Button>
      </div>
    </form>
  )
}
