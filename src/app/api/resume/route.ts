import Mailer from '@/lib/mail'
import { NextRequest, NextResponse } from 'next/server'

//send?email=levimaximin@gmail.com

export async function POST(request: NextRequest) {
  const data = await request.json()
  try {
    const mail = new Mailer()

    const result = await mail.sendMail({
      to: 'dennisrkibet@gmail.com',
      subject: 'NEW RESUME REQUEST: Someone Has requested for your Resume',
      html: `<!DOCTYPE html>
            <html>
            <head>
                <style>
                    .container {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        padding: 20px;
                        border: 1px solid #eaeaea;
                        border-radius: 10px;
                        width: 80%;
                        margin: auto;
                    }
                    .button {
                        background-color: #4CAF50;
                        color: white;
                        padding: 10px 20px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        border-radius: 5px;
                        font-size: 16px;
                        margin-top: 20px;
                    }
                    .footer {
                        margin-top: 30px;
                        font-size: 14px;
                        color: #777;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <p>Hello,</p>
                    <p><strong>${data.email}</strong> has requested your resume from <a href="https://denniskibet.com" style="color: #1a73e8; text-decoration: none;">denniskibet.com</a>. If you would like to share your resume with them, please accept the request by clicking the button below.</p>
                    <p>We value your privacy and ensure that your information is shared securely.</p>
                    <div>
                        <a href="https://denniskibet.com/api/send?email=${data.email}" class="button">Send Resume</a>
                    </div>
                    <p class="footer">Best regards,<br>
                    Dennis Kibet R.</p>
                    <p class="footer">If you did not request this email, please ignore it.</p>
                </div>
            </body>
            </html>
      `,
    })

    if (result.status === 200) {
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
    } else {
      throw new Error('Failed to send Request! Retry')
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
