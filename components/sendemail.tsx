import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { OnboardEmail, OnboardEmailProps } from "@/components/emails/OnboardEmail";

// ✅ Accept props as OnboardEmailProps
export async function sendOnboardEmail(props: OnboardEmailProps) {
  // ✅ Render component to HTML
  const html = await render(<OnboardEmail {...props} />);

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
    subject: "Reset Your Password",
    html,
  });
}
