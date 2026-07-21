import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOtpEmail(to: string, code: string) {
  await resend.emails.send({
    from: "Shopby Admin <onboarding@resend.dev>",
    to,
    subject: "Kode Verifikasi Login Shopby",
    html: `<p>Kode verifikasi login kamu: <strong style="font-size:24px">${code}</strong></p>
           <p>Kode ini berlaku 5 menit. Kalau bukan kamu yang coba login, abaikan email ini.</p>`,
  })
}