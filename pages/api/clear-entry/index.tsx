import type { NextApiHandler } from "next";
import mongoClient from "@/clients/mongo-client";

const clearEntryHandler: NextApiHandler = async (req, res) => {
  try {
    const { uid: uidFromBody } = req.body;
    const { uid: uidFromParams } = req.query;
    const uid = uidFromBody ?? uidFromParams;
    if (uid) {
      const mongoInst = await mongoClient.connect();
      await mongoInst.db("radiant").collection("orders").deleteOne({ id: uid });
      await mongoInst.close();
    } else {
      throw new Error("No uid provided");
    }
    res.status(200).json({ message: "Success" });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default clearEntryHandler;
