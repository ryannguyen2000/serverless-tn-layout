import { connectToDb } from "./index.js";
import { ComponentsConfigs } from "../models/index.js";


export const createComponentConfig = async (req, res) => {
  try {
    await connectToDb();
    const functionDocumentChecker = await ComponentsConfigs.findOneAndUpdate(
      {
        documentId: req.body.documentId,
      },
      {
        $set: {
          component: req.body.component,
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
      component: functionDocumentChecker.component,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request",
      details: error.message,
    });
  }
};

export const getComponentConfig = async (req, res) => {
  const { documentId } = req.params
  console.log('documentId', documentId);
  
  try {
    await connectToDb();
    if (documentId) {
      const result = await ComponentsConfigs.findOne({ documentId })
      res.json({
        result,
        message: "Get component successfully!"
      })
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request fetch data",
      details: error.message,
    });
  }
}