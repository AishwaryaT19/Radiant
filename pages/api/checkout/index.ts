/* eslint-disable camelcase */
import type { NextApiHandler } from "next";
import Stripe from "stripe";
import mongoClient from "@/clients/mongo-client";
import { email, personalEmail, phoneNumber } from "@/common-data";
import getId from "@/components/getid";
import gqlclient from "@/gql/client";
import { getDiscount, getProductById } from "@/gql/queries";
import { UserType } from "@/provider/app-context";

const stripe = new Stripe((process.env?.STRIPE_SECRET_KEY as string) ?? "", { apiVersion: "2022-11-15" });

function getMailText({
  discount,
  totalPrice,
  invoiceRows,
  customerDetails
}: {
  discount?: { promo: string; percentage: number } | undefined;
  totalPrice: number;
  invoiceRows: string[];
  customerDetails: UserType;
}) {
  let mailText = `
Thank you for your order. Your order details are given below :

`;
  mailText += invoiceRows.join("");
  if (discount) {
    mailText += `Congratulations You Have Successfully applied the ${discount?.promo} Promo\n`;
    mailText += `Total Cost without discount = ₹${totalPrice}\n`;
    mailText += `Total Cost = ₹${+totalPrice - (+totalPrice * discount.percentage) / 100}\n\n\nCustomer Details : \n`;
  } else {
    mailText += `Total Cost = ₹${totalPrice}\n\n\nCustomer Details : \n`;
  }
  mailText += `Name : ${customerDetails?.name}
Phone Number : ${customerDetails?.phoneNumber}
Email : ${customerDetails?.email}
Address : ${customerDetails?.addressBuilding}, ${customerDetails?.addressStreet},
${customerDetails?.addressCity}, ${customerDetails?.addressState}
Pincode : ${customerDetails?.addressPincode}
LandMark : ${customerDetails?.addressLandmark}
For Any Further Queries Please Contact us at ${email} or ${phoneNumber}`;
  return mailText;
}

const checkoutHandler: NextApiHandler = async (req, res) => {
  if (req.method === "POST" && req.body.data) {
    try {
      const receivedString = req.body.data;
      const decryptedString = Buffer.from(receivedString, "base64").toString("utf-8");
      const realData: {
        cart: {
          id: string;
          noi: number;
        }[];
        promo: string | undefined;
        customerDetails: UserType;
      } = JSON.parse(decryptedString);
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
      const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
      if (realData?.promo) {
        discounts.push({
          coupon: realData?.promo
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let dis: any;
      if (realData.promo) {
        dis = await gqlclient.request(getDiscount, {
          code: realData.promo
        });
      }

      let disPer = 0;
      try {
        disPer = +dis?.promoCollection?.items[0]?.discountPercentage;
      } catch {
        //catch
      }
      for (let i = 0; i < realData.cart.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const gqlData: Record<"products", any> = await gqlclient.request(getProductById, {
          id: realData.cart[i]?.id
        });
        const product = gqlData?.products;
        let price = product?.price;
        if (product?.salePercent) {
          price = price * ((100 - product?.salePercent) / 100);
        }

        if (product) {
          lineItems.push({
            price_data: {
              currency: "inr",
              product_data: {
                name: product?.name,
                images: [product?.bannnerImage?.url ?? "/logo.png"]
              },
              unit_amount: price * 100
            },
            quantity: realData.cart[i]?.noi ?? 0
          });
        }
      }
      const invoiceRows: string[] = [];
      let totalPrice = 0;
      lineItems.forEach((item, index) => {
        const name = item.price_data?.product_data?.name;
        const quant = item.quantity ?? 0;
        const unitamt = (item.price_data?.unit_amount ?? 0) / 100;
        invoiceRows.push(`${index + 1}. ${name} - ₹${unitamt} * ${quant} = ₹${unitamt * quant}\n`);
        totalPrice += unitamt * quant;
      });
      const uid = getId();
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: `${req.headers.origin}/?order=success&uid=${uid}`,
        cancel_url: `${req.headers.origin}/?canceled=true&uid=${uid}`,
        discounts: discounts
      });
      const discount =
        realData?.promo && disPer
          ? {
              promo: realData.promo,
              percentage: disPer
            }
          : undefined;
      const monoIns = await mongoClient.connect();
      const mailTo = [email, personalEmail];
      if (realData?.customerDetails?.email) {
        mailTo.push(realData?.customerDetails?.email);
      }
      monoIns
        .db("radiant")
        .collection("orders")
        .insertOne({
          id: uid,
          mailTo: mailTo,
          mailText: getMailText({
            discount: discount,
            totalPrice: totalPrice,
            invoiceRows: invoiceRows,
            customerDetails: realData?.customerDetails
          })
        })
        .then(() => monoIns.close());

      res.status(200).json({ url: session?.url });
    } catch {
      res.status(500).json({ message: "something went wrong" });
    }
  } else {
    res.status(405).json({ message: "method not allowed OR wrong data passed" });
  }
};
export default checkoutHandler;
