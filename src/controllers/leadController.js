import Lead from "../models/Lead.js";
import transporter from "../config/mailer.js";

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, serviceType, message } = req.body;

    if (!name?.trim() || !email?.trim() || !phone?.trim() || !serviceType?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const lead = await Lead.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      serviceType: serviceType.trim(),
      message: message?.trim() || "",
    });

    return res.status(201).json({
      success: true,
      message: "Lead saved successfully",
      leadId: lead._id,
    });
  } catch (error) {
    console.error("Create lead error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.error("Get leads error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};