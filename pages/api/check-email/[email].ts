import type { NextApiRequest, NextApiResponse } from "next";
import gqlclient from "@/gql/client";
import { checkForEmail } from "@/gql/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const emailEncoded = req.url?.replace("/api/check-email/", "") ?? "";
    const email = Buffer.from(emailEncoded, "base64").toString();
    const userInfo: any =
      (await gqlclient.request(checkForEmail, {
        email: email
      })) ?? {};
    res.status(200).json(userInfo?.userCollection?.items ?? []);
  } catch {
    res.status(200).json([]);
  }
}
