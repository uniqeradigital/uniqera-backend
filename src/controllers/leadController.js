import Lead from "../models/Lead.js";
import transporter from "../config/mailer.js";

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, serviceType, message } = req.body;

    // validation
    if (!name?.trim() || !email?.trim() || !phone?.trim() || !serviceType?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      serviceType,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Lead saved successfully",
      leadId: lead._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
