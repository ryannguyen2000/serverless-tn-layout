import {MongoClient} from "mongodb";

let db;

export const connectToDb = async () => {
  if (!db) {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        tls: true,
      });
      console.log("Connected to MongoDB");
      db = client.db(process.env.DB_NAME);
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error.message);
      throw new Error("Failed to connect to the database");
    }
  }
  return db;
};
