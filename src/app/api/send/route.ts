import Mailer from '@/lib/mail'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  let email: string | undefined = searchParams.get('email')?.trim()
  try {
    if (email) {
      const mail = new Mailer()
      const results: any = await mail.sendMail({
        to: email,
        subject: 'Dennis Kibet Resume',
        html: `<p>Attached below is my resume</p>
        <p>Thank you for your patience.</p>
        <p>Best regards,<br> Dennis Kibet R.</p>`,
        attachments: [
          {
            filename: 'resume.pdf',
            path: process.env.PATH_TO_RESUME,
          },
        ],
      })
      if (results.status !== 200) {
        throw new Error(results.message)
      }

      return NextResponse.json(
        {
          message: 'Emails Sent Successfully',
          results,
        },
        { status: 200 }
      )
    } else {
      throw new Error('Email is required!')
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
