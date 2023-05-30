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
              "en-US": body.imageUrl
            },
            phoneNumber: { "en-US": body.phoneNumber },
            password: {
              "en-US": body.password
            },
            addressBuilding: {
              "en-US": body.address.buildingDetails
            },
            addressCity: {
              "en-US": body.address.city
            },
            addressLandmark: {
              "en-US": body.address.landmark
            },
            addressStreet: {
              "en-US": body.address.street
            },
            addressState: {
              "en-US": body.address.state
            },
            addressPincode: { "en-US": body.address.pincode }
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
