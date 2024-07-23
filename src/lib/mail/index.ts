import { EmailOptionsType } from '@/interfaces'
import nodemailer, { Transporter } from 'nodemailer'
require('dotenv').config()

class Mailer {
  private transporter: Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOSTNAME || 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD,
      },
    })
  }

  async sendMail(options: EmailOptionsType): Promise<{
    message: string | string[]
    status: number
    successEmails?: string[]
    errorEmails?: string[]
  }> {
    try {
      if (Array.isArray(options.to)) {
        const results = await Promise.all(
          options.to.map(async (email: string) => {
            try {
              const info = await this.transporter.sendMail({
                ...options,
                to: email,
                from: `"Dennis Kibet R." <contact@denniskibet.com>`,
              })
              console.log('Message sent: %s', info.messageId)
              return { email, status: 'success' }
            } catch (error: any) {
              return { email, status: 'error' }
            }
          })
        )

        const successEmails = results
          .filter((result) => result.status === 'success')
          .map((result) => result.email)
        const errorEmails = results
          .filter((result) => result.status === 'error')
          .map((result) => result.email)

        return {
          message: 'Email sending process completed.',
          status: 200,
          successEmails,
          errorEmails,
        }
      } else {
        const info = await this.transporter.sendMail({
          ...options,
          from: `"Dennis Kibet R." <contact@denniskibet.com>`,
        })
        console.log('Message sent: %s', info.messageId)
        return {
          message: 'Email sent successfully!',
          status: 200,
          successEmails: [options.to],
        }
      }
    } catch (error: any) {
      console.error('Error sending email:', error)
      return { message: error.message, status: 400 }
    }
  }
}

export default Mailer
