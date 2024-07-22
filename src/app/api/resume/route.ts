import Mailer from '@/lib/mail'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.json()
  try {
    const mail = new Mailer()
    const results = await mail.sendMail({
      to: data.email,
      subject: 'CONFIRMATION: I have received you request for the resume',
      html: `<p>I have received your request for my resume. I will send it to you at the soonest possible time, within today.</p>
      <p>Thank you for your patience.</p>
    <p>Best regards,<br>
    Dennis Kibet R.</p>`,
    })

    return NextResponse.json(
      {
        message: 'Emails Sent Successfully',
        results,
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
