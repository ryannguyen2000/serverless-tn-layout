import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return mongoose.connection;
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
    });

    console.log("Connected to MongoDB via Mongoose");
    return mongoose.connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    throw error;
  }
};
