import { NextApiHandler } from "next";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import mongoClient from "@/clients/mongo-client";
import transMailer from "@/clients/nodemailer-client";

interface DataFromDB {
  mailText: string;
  mailTo: string[];
}
const SendMailHandler: NextApiHandler = async (req, res) => {
  try {
    const { uid: uidFromBody } = req.body;
    const { uid: uidFromParams } = req.query;
    const uid = uidFromBody ?? uidFromParams;
    if (uid) {
      let isEverythingOkay = false;
      const mongoInstance = await mongoClient.connect();
      const dbdata = (await mongoInstance
        .db("radiant")
        .collection("orders")
        .findOne({ id: uid })) as unknown as DataFromDB;
      const { mailText, mailTo } = dbdata;
      if (mailText) {
        const subject = "Congratulations ! Your Order from Radiant is Placed Successfully";
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
              transMailer.sendMail(
                {
                  from: process.env.USER_MAIL,
                  to: mailTo,
                  subject: subject,
                  text: mailText
                },
                mailCallback
              );
            } catch {
              isEverythingOkay = false;
              reject();
            }
          });
          try {
            await sendMailPromise;
            isEverythingOkay = true;
          } catch {
            isEverythingOkay = false;
          }
        } catch {
          //
        }
      } else {
        isEverythingOkay = false;
      }
      try {
        await mongoInstance.db("radiant").collection("orders").deleteOne({ id: uid });
      } catch {
        /**/
      } finally {
        await mongoInstance.close();
      }
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
