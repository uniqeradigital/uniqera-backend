import nodemailer from "nodemailer"
 const transporter = nodemailer.createTransport(
    {
        host: process.env.SMTO_HOST,
        port: process.env.SMTO_PORT,
        secure: true ,
        auth :{
        user: process.env.SMTO_USER,
        pass: process.env.SMTP_PASS,
    },
} );
export default transporter;