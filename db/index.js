import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return mongoose.connection;
    }

    await mongoose.connect("mongodb+srv://tompojson:7aS6XyxiZwk1YMzX@cluster0.jzkou.mongodb.net/tn_layout_tool?retryWrites=true&w=majority&appName=Cluster0", {
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
