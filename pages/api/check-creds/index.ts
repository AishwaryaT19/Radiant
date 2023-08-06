import type { NextApiRequest, NextApiResponse } from "next";
import gqlclient from "@/gql/client";
import { checkForCredentials } from "@/gql/queries";

export default async function credHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST" && req.body?.credentials) {
      const rawCredentials = req.body.credentials;
      const credentialString = Buffer.from(rawCredentials, "base64").toString("utf-8");
      const credentials = JSON.parse(credentialString);
      const email = credentials.email;
      const password = credentials.password;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userInfo: any = await gqlclient.request(checkForCredentials, {
        email: email,
        password: password
      });
      if (userInfo?.userCollection?.items?.length > 0) {
        res.status(200).json(userInfo.userCollection.items[0]);
      } else throw new Error();
    } else throw new Error();
  } catch {
    res.status(404).json({ message: "user not found" });
  }
}
