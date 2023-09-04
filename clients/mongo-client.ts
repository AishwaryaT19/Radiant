import { MongoClient, ServerApiVersion } from "mongodb";
const uri = `mongodb+srv://${process.env.MDB_USR}:${process.env.MDB_PAS}@\
${process.env.MDB_USR}.8bgh6yx.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

export default mongoClient;
