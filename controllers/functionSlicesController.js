import { FunctionSlices } from "../models/index.js";
import dotenv from "dotenv";
import { connectToDb } from "./index.js";

dotenv.config();

export const createFunctionSlice = async (req, res) => {
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

export const getFunctionsSlice = async (req, res) => {
  const { sliceId } = req.params
  try {
    await connectToDb();
    if (sliceId) {
      const result = await FunctionSlices.find({ sliceId })
      res.json({
        result,
        message: "Get functions successfully!"
      })
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request fetch data",
      details: error.message,
    });
  }
}

export const updateFunctionSlice = async (req, res) => {
  const { sliceId } = req.body
  try {
    await connectToDb();
    if (!req.body) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const result = await FunctionSlices.updateOne(
      { sliceId },
      {
        $set: req.body,
      }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Functions slice not found" });
    }
    res.json({ message: "Functions updated" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request update document",
      details: error.message,
    });
  }
}