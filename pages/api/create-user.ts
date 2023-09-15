import type { NextApiRequest, NextApiResponse } from "next";
import contentfulClient from "@/clients/contentful-client";
import { UserType } from "@/provider/app-context";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    interface TempUser extends UserType {
      password: string;
    }
    try {
      const body: TempUser = req.body;
      const space = await contentfulClient.getSpace("t87r035xoi6u");
      const env = await space.getEnvironment("master");
      try {
        const entry = await env.createEntry("user", {
          fields: {
            name: {
              "en-US": body.name
            },
            email: {
              "en-US": body.email
            },
            image: {
              "en-US": body.image
            },
            phoneNumber: { "en-US": body.phoneNumber },
            password: {
              "en-US": body.password
            },
            addressBuilding: {
              "en-US": body.addressBuilding
            },
            addressCity: {
              "en-US": body.addressCity
            },
            addressLandmark: {
              "en-US": body.addressLandmark
            },
            addressStreet: {
              "en-US": body.addressStreet
            },
            addressState: {
              "en-US": body.addressState
            },
            addressPincode: { "en-US": body.addressPincode }
          }
        });
        if (entry) {
          try {
            await entry.publish();
            res.status(200).json({ ...entry });
          } catch {
            res.status(500).json({ message: "something went wrong" });
          }
        } else {
          res.status(500).json({ message: "something went wrong" });
        }
      } catch {
        res.status(500).json({ message: "something went wrong" });
      }
    } catch {
      res.status(500).json({ message: "something went wrong" });
    }
  } else {
    res.status(405).json({ message: "not allowed" });
  }
}
