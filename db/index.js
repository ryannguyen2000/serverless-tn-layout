import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    // Check if mongoose is already connected to avoid redundant connections
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return mongoose.connection;
    }

    // Connect to MongoDB using Mongoose
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true, // Enable SSL connection
    });

    console.log("Connected to MongoDB via Mongoose");
    return mongoose.connection; // Return the connection instance
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    throw error; // Rethrow error for handling in your routes
  }
};

export default connectToDb;
