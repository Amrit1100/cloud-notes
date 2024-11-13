import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "cloudnotes65@gmail.com",
    pass: "jjmqlcenxwqimtli",
  },
  tls: {
    rejectUnauthorized: false
  
}
});

export default transporter;