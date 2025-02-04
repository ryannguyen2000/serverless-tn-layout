import { connectToDb } from "./index.js";
import { LayoutJsons } from "../models/layoutJson.js";


export const createLayoutJson = async (req, res) => {
  try {
    await connectToDb();
    const layoutJsonChecker = await LayoutJsons.findOneAndUpdate(
      {
        documentId: req.body.documentId,
      },
      {
        $set: {
          layoutJson: req.body.layoutJson,
          documentName: req.body.documentName,
          createdAt: new Date()
        }
      },
      {
        upsert: true,
        new: true
      }
    )
    return res.status(201).json({
      message: "Success!",
      documentId: layoutJsonChecker.documentId,
      documentName: req.body.documentName,
      layoutJson: layoutJsonChecker.layoutJson,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request",
      details: error.message,
    });
  }
};

export const getLayoutJson = async (req, res) => {
  const { documentId } = req.params
  try {
    await connectToDb();
    if (documentId) {
      const result = await LayoutJsons.findOne({ documentId })
      res.json({
        result,
        message: "Get layout successfully!"
      })
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request fetch data",
      details: error.message,
    });
  }
}