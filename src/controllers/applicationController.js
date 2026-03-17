import Application from "../models/Application.js";
// import transporter from "../config/mailer.js"; // 

export const createApplication = async (req, res) => {
  try {
    const {
      fullName,
      email,
      countryCode,
      phone,
      role,
      resumeLink,
      isConfirmed,
    } = req.body;

    if (
      !fullName?.trim() ||
      !email?.trim() ||
      !countryCode?.trim() ||
      !phone?.trim() ||
      !role?.trim() ||
      !resumeLink?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!isConfirmed) {
      return res.status(400).json({
        success: false,
        message: "Please confirm your details before submitting",
      });
    }

    const application = await Application.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      countryCode: countryCode.trim(),
      phone: phone.trim(),
      role: role.trim(),
      resumeLink: resumeLink.trim(),
      isConfirmed,
    });

    // Optional admin email alert
    /*
    if (
      process.env.ADMIN_EMAIL &&
      process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      try {
        await transporter.sendMail({
          from: `"Uniqera Careers" <${process.env.SMTP_USER}>`,
          to: process.env.ADMIN_EMAIL,
          subject: "New Career Application - Uniqera",
          html: `
            <h3>New Job Application Received</h3>
            <p><b>Full Name:</b> ${fullName}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Country Code:</b> ${countryCode}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Role:</b> ${role}</p>
            <p><b>Resume / Portfolio:</b> <a href="${resumeLink}" target="_blank">${resumeLink}</a></p>
          `,
        });
      } catch (mailError) {
        console.error("Application email error:", mailError.message);
      }
    }
    */

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      applicationId: application._id,
    });
  } catch (error) {
    console.error("Create application error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("Get applications error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};