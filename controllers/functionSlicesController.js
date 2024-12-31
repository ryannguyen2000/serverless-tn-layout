import { FunctionSlices } from "../models/index.js";
import dotenv from "dotenv";
import { connectToDb } from "./index.js";

dotenv.config();

export const createFunctionSlices = async (req, res) => {
  try {
    await connectToDb();
    const functionSlicesChecker = await FunctionSlices.findOneAndUpdate(
      {
        sliceId: req.body.sliceId,
        functions: req.body.functions,
        createdAt: new Date()
      },
      {
        $set: {
          // sliceId: req.body.sliceId,
          functions: req.body.functions,
          createdAt: new Date()
        }
      },
      {
        upsert: true,
        new: true
      }
    )
    return res.status(201).json({
      message: "Success",
      pid: functionSlicesChecker.sliceId,
      did: functionSlicesChecker.functions,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request",
      details: error.message,
    });
  }
}