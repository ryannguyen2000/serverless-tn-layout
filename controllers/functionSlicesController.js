import { FunctionDocuments } from "../models/index.js";
import dotenv from "dotenv";
import { connectToDb } from "./index.js";

dotenv.config();

export const createFunctionDocument = async (req, res) => {
  try {
    await connectToDb();
    const functionDocumentChecker = await FunctionDocuments.findOneAndUpdate(
      {
        documentId: req.body.documentId,
      },
      {
        $set: {
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
      documentId: functionDocumentChecker.documentId,
      functions: functionDocumentChecker.functions,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request",
      details: error.message,
    });
  }
}

export const getFunctionsDocument = async (req, res) => {
  const { documentId } = req.params
  try {
    await connectToDb();
    if (documentId) {
      const result = await FunctionDocuments.findOne({ documentId })
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
  const { documentId } = req.body
  try {
    await connectToDb();
    if (!req.body) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const result = await FunctionDocuments.updateOne(
      { documentId },
      {
        $set: req.body,
      }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Functions document not found" });
    }
    res.json({ message: "Functions updated" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request update document",
      details: error.message,
    });
  }
}