import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { ChangePasswordEmail, ChangePasswordEmailProps } from "@/components/emails/ChangePasswordEmail";

// ✅ Accept props as OnboardEmailProps
export async function sendChangePasswordEmail(props: ChangePasswordEmailProps) {
  // ✅ Render component to HTML
  const html = await render(<ChangePasswordEmail {...props} />);

  // ✅ Send email
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  await transporter.sendMail({
    from: `"NidavTech" <${process.env.EMAIL_USER}>`,
    to: props.email,
    subject: "Change your Password",
    html,
  });
}
