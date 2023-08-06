import { NextApiHandler } from "next";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import transMailer from "@/clients/nodemailer-client";
import { deleteValue, readValue } from "@/utils/database";

const SendMailHandler: NextApiHandler = async (req, res) => {
  try {
    const uid = req.query.uid as string;
    const { mailOptions }: { mailOptions: MailOptions } = readValue(uid ?? "");

    if (mailOptions) {
      let isEverythingOkay = false;

      const verificationPromise = new Promise((resolve, reject) => {
        transMailer.verify(function verification(error, success) {
          if (error) {
            isEverythingOkay = false;
            reject(error);
          } else {
            isEverythingOkay = true;
            resolve(success);
          }
        });
      });
      try {
        await verificationPromise;
        const sendMailPromise = new Promise((resolve, reject) => {
          try {
            const mailCallback = (err: Error | null, info: SMTPTransport.SentMessageInfo) => {
              if (err) {
                isEverythingOkay = false;
                reject(err);
              } else {
                isEverythingOkay = true;
                resolve(info);
              }
            };
            transMailer.sendMail(mailOptions, mailCallback);
          } catch {
            isEverythingOkay = false;
            reject();
          }
        });
        try {
          await sendMailPromise;
          isEverythingOkay = true;
        } catch (e: any) {
          isEverythingOkay = false;
        }
      } catch {
        //
      }
      deleteValue(uid);
      if (isEverythingOkay) {
        res.status(200).json({});
      } else {
        res.status(500).json({});
      }
    } else {
      res.status(404).json({});
    }
  } catch {
    res.status(500).json({});
  }
};
export default SendMailHandler;
