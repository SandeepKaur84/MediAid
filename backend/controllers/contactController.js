import nodemailer from "nodemailer";

export const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ message: "All fields are required." });

  try {
    // ✅ Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your email (e.g., Gmail)
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // ✅ Send to admin
    await transporter.sendMail({
      from: `"MediAid+ Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // ✅ Send confirmation to user
    await transporter.sendMail({
      from: `"MediAid Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your message!",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for contacting <strong>MediAid+</strong>. Our support team will get back to you soon.</p>
        <br />
        <p>Best Regards,<br/>MediAid+ Team</p>
      `,
    });

    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
};
