/* eslint-disable camelcase */
import type { NextApiHandler } from "next";
import Stripe from "stripe";
import gqlclient from "@/gql/client";
import { getProductById } from "@/gql/queries";

const stripe = new Stripe((process.env?.STRIPE_SECRET_KEY as string) ?? "", { apiVersion: "2022-11-15" });
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
        custDetails: {
          name: string;
          phoneNumber: string;
          building: string;
          street: string;
          landmark: string;
          city: string;
          state: string;
          pincode: string;
        };
      } = JSON.parse(decryptedString);
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
      const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
      if (realData?.promo) {
        discounts.push({
          coupon: realData?.promo
        });
      }
      for (let i = 0; i < realData.cart.length; i++) {
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
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        discounts: discounts
      });
      // res.redirect(303, session?.url ?? "/");
      res.status(200).json({ url: session?.url });
    } catch (e: any) {
      res.status(500).json({ message: "something went wrong" });
    }
  } else {
    res.status(405).json({ message: "method not allowed OR wrong data passed" });
  }
};
export default checkoutHandler;
