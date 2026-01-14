import Lead from "../models/Lead.js";
import transporter from "../config/mailer.js";

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // basic validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // save to DB
    const lead = await Lead.create({ name, email, phone, message });

    // send email to admin (optional)
    if (process.env.ADMIN_EMAIL && process.env.SMTP_USER) {
      await transporter.sendMail({
        from: `"Uniqera Leads" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: "New Contact Form Lead - Uniqera",
        html: `
          <h3>New Lead Received</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Message:</b><br/>${message}</p>
        `,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Lead saved successfully",
      leadId: lead._id,
    });
  } catch (error) {
    console.error("Create lead error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
