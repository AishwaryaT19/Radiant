import type { NextApiRequest, NextApiResponse } from "next";
import gqlclient from "@/gql/client";
import { getDiscount } from "@/gql/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST" && req.body.code) {
      const body = req.body;
      const code = Buffer.from(body.code, "base64").toString("utf-8");
      const promo: any = await gqlclient.request(getDiscount, {
        code: code
      });
      if (promo.promoCollection.items.length > 0) {
        res.status(200).json(promo.promoCollection.items);
      } else throw new Error("No code found");
    } else throw new Error("No code provided");
  } catch (e: unknown) {
    res.status(404).json({ error: "not found" });
  }
}
