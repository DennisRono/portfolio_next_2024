'use client'
import { useToast } from '@/components/ui/use-toast'
import React, { FormEvent, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const ResumeForm = () => {
  const [email, setEmail] = useState('')
  const [isloading, setIsLoading] = useState(false)
  const [token, setToken] = useState<string | null>('')
  const [recaptchaLoaded, setRecaptchaLoaded] = useState<boolean>(false)

  const recaptchaRef: any = React.createRef()

  const { toast } = useToast()
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    recaptchaRef.current.execute()
    console.log(token)
    setIsLoading(true)
    try {
      const origin =
        typeof window !== 'undefined' && window.location.origin
          ? window.location.origin
          : 'https://denniskibet.com'
      if (!email) {
        throw new Error('Email is a required field')
      }
      if (!token) {
        throw new Error('Captcha token is required!')
      }
      const res: any = await fetch(`${origin}/api/resume`, {
        method: 'POST',
        redirect: 'follow',
        cache: 'no-store',
        body: JSON.stringify({ email: email, token: token }),
      })
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
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form
      className="flex flex-col sm:flex-row items-end sm:items-center justify-end sm:justify-center gap-4 mb-4 w-full px-2"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="py-2 px-6 w-[100%] sm:w-[350px] rounded-md outline-none border border-slate-900 !text-black"
        placeholder="email..."
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />
      <div className="absolute bottom-0 right-0">
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY! as string}
          onChange={(value) => {
            console.log(value)

            setToken(value)
          }}
          asyncScriptOnLoad={() => {
            setRecaptchaLoaded(true)
          }}
        />
      </div>
      <button
        className="bg-blue-500 h-10 w-24 rounded-full text-white cursor-pointer"
        type="submit"
        style={{
          background: 'linear-gradient(90deg, #8753ff, #64a0ff)',
        }}
        disabled={!recaptchaLoaded}
      >
        {isloading ? <div className="dot-flashing"></div> : 'request'}
      </button>
    </form>
  )
}

export default ResumeForm
