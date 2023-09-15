import type { NextApiRequest, NextApiResponse } from "next";
import gqlclient from "@/gql/client";
import { checkForEmail } from "@/gql/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST" && req.body.email) {
      const body = req.body;
      const email = Buffer.from(body.email, "base64").toString("utf-8");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userInfo: any = await gqlclient.request(checkForEmail, {
        email: email
      });
      if (userInfo.userCollection.items.length > 0) {
        res.status(200).json(userInfo.userCollection.items);
      } else throw new Error("No user found");
    } else throw new Error("No email provided");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(404).json({ error: e?.message });
  }
}
