import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "cloudnotes65@gmail.com",
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false
  
}
});

export default transporter;
