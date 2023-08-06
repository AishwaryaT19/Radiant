import nodemailer from "nodemailer";

const transMailer = nodemailer.createTransport({
  // port: 485,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.USER_PASSWORD
  },
  secure: true
});

export default transMailer;
