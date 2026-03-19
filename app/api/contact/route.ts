import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const { error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: "jerinrx@gmail.com",
            replyTo: email,
            subject: `New message from ${name} — Portfolio`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a0a0f; color: #ffffff; border-radius: 12px;">
                    <h2 style="color: #06b6d4; margin-bottom: 4px;">New Contact Message</h2>
                    <p style="color: #6b7280; font-size: 14px; margin-bottom: 24px;">from your portfolio website</p>

                    <div style="background: #1a1a2e; border: 1px solid #2d2d44; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
                        <p style="margin: 0 0 8px 0;"><span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</span></p>
                        <p style="margin: 0; font-size: 16px; font-weight: 600;">${name}</p>
                    </div>

                    <div style="background: #1a1a2e; border: 1px solid #2d2d44; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
                        <p style="margin: 0 0 8px 0;"><span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</span></p>
                        <a href="mailto:${email}" style="margin: 0; font-size: 16px; color: #06b6d4; text-decoration: none;">${email}</a>
                    </div>

                    <div style="background: #1a1a2e; border: 1px solid #2d2d44; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                        <p style="margin: 0 0 8px 0;"><span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</span></p>
                        <p style="margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>

                    <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(to right, #2563eb, #7c3aed); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                        Reply to ${name}
                    </a>

                    <p style="color: #4b5563; font-size: 12px; margin-top: 24px; border-top: 1px solid #2d2d44; padding-top: 16px;">
                        This message was sent from your portfolio contact form.
                    </p>
                </div>
            `,
        });

        if (error) {
            return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch {
        return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
    }
}