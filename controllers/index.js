import mongoose from "mongoose";
import {Documents, Projects, Slice, Slices} from "../models/index.js";

// Connect to MongoDB using Mongoose ===================================================================================================================================
const connectToDb = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// create =============================================================================================================================================================

const createSlice = async (req, res) => {
  try {
    await connectToDb();
    if (!req.body) {
      return res.status(400).json({error: "Invalid request body"});
    }
    const newSlice = new Slice(req.body);
    const result = await newSlice.save();
    res.status(201).json({message: "Slice created", id: result.sliceId});
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to create slice", details: error.message});
  }
};

const createSlices = async (req, res) => {
  try {
    await connectToDb();
    if (!req.body) {
      return res.status(400).json({error: "Invalid request body"});
    }
    const newSlices = new Slices(req.body);

    const result = await newSlices.save();
    res.status(201).json({message: "Slices created", id: result._id});
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to create slices", details: error.message});
  }
};

const createDocument = async (req, res) => {
  try {
    await connectToDb();

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({error: "Invalid request body"});
    }

    const {projectId, documentId, documentName, layoutJson} = req.body;

    if (!projectId || !documentId || !documentName) {
      return res.status(400).json({error: "Missing required fields"});
    }

    const updateDocumentData = {
      projectId,
      documentName,
      layoutJson,
    };

    const existingDocument = await Documents.findOneAndUpdate(
      {documentId},
      updateDocumentData,
      {new: true}
    ).exec();

    if (existingDocument) {
      return res.status(200).json({
        message: "Document exists, updated existing document",
        data: existingDocument,
      });
    }

    const newDocument = new Documents(req.body);
    const result = await newDocument.save();

    return res.status(201).json({
      message: "Document created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating/updating document:", error);
    return res
      .status(500)
      .json({error: "Failed to save document", details: error.message});
  }
};

const createProject = async (req, res) => {
  try {
    await connectToDb();
    if (!req.body) {
      return res.status(400).json({error: "Invalid request body"});
    }
    const newProject = new Projects(req.body);
    const result = await newProject.save();
    res.status(201).json({message: "Project created", id: result.projectId});
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to create project", details: error.message});
  }
};

// update ===========================================================================================================================================================

const updateSlice = async (req, res) => {
  const {id} = req.body;
  try {
    await connectToDb();
    if (!req.body) {
      return res.status(400).json({error: "Invalid request body"});
    }
    const result = await Slice.updateOne({sliceId: id}, {$set: req.body});
    if (result.matchedCount === 0) {
      return res.status(404).json({error: "Slice not found"});
    }
    res.json({message: "Slice updated"});
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to update slice", details: error.message});
  }
};

const updateSlices = async (req, res) => {
  const {projectId, documentId} = req.body;
  try {
    await connectToDb();
    if (!req.body) {
      return res.status(400).json({error: "Invalid request body"});
    }
    const result = await Layouts.updateOne(
      {projectId: projectId, documentId: documentId},
      {$set: req.body}
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({error: "Slices not found"});
    }
    res.json({message: "Slices updated"});
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to update slices", details: error.message});
  }
};

const updateDocument = async (req, res) => {
  const {id} = req.body;
  try {
    await connectToDb();
    if (!req.body) {
      return res.status(400).json({error: "Invalid request body"});
    }
    const result = await Documents.updateOne(
      {documentId: id},
      {$set: req.body}
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({error: "Document not found"});
    }
    res.json({message: "Document updated"});
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to update document", details: error.message});
  }
};
const updateProject = async (req, res) => {
  const {id} = req.body;
  try {
    await connectToDb();
    if (!req.body) {
      return res.status(400).json({error: "Invalid request body"});
    }
    const result = await Projects.updateOne({projectId: id}, {$set: req.body});
    if (result.matchedCount === 0) {
      return res.status(404).json({error: "Project not found"});
    }
    res.json({message: "Project updated"});
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to update project", details: error.message});
  }
};
// delete ==================================================================================================================================================

const deleteSlice = async (req, res) => {
  const {id} = req.params;
  try {
    await connectToDb();
    if (!id) {
      return res.status(400).json({error: "Invalid request body"});
    }
    const result = await Slice.deleteOne({sliceId: id});
    if (result.deletedCount === 0) {
      return res.status(404).json({error: "Slice not found"});
    }
    res.json({message: "Slice deleted"});
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to delete slice", details: error.message});
  }
};

const deleteSlices = async (req, res) => {
  const {projectId, documentId} = req.params;
  try {
    await connectToDb();
    if (!projectId && !documentId) {
      return res.status(400).json({error: "Invalid request body"});
    }
    const result = await Slices.deleteOne({
      projectId: projectId,
      documentId: documentId,
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({error: "Slices not found"});
    }
    res.json({message: "Slices deleted"});
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to delete slices", details: error.message});
  }
};

const deleteDocument = async (req, res) => {
  const {id} = req.params;
  try {
    await connectToDb();
    if (!req.params) {
      return res.status(400).json({error: "Invalid request body"});
    }
    const result = await Documents.deleteOne({documentId: id});
    if (result.deletedCount === 0) {
      return res.status(404).json({error: "Document not found"});
    }
    res.json({message: "Document deleted"});
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to delete document", details: error.message});
  }
};
const deleteProject = async (req, res) => {
  const {id} = req.params;
  try {
    await connectToDb();
    if (!req.params) {
      return res.status(400).json({error: "Invalid request body"});
    }
    const result = await Projects.deleteOne({projectId: id});
    if (result.deletedCount === 0) {
      return res.status(404).json({error: "Project not found"});
    }
    res.json({message: "Project deleted"});
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to delete project", details: error.message});
  }
};
//  get ==================================================================================================================================================
const getSlice = async (req, res) => {
  const {id} = req.query;
  try {
    await connectToDb();
    if (id) {
      const data = await Slice.findOne({sliceId: id});
      res.json(data);
    }
    const data = await Slice.find();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to fetch data", details: error.message});
  }
};
const getSlices = async (req, res) => {
  const {pId, dId} = req.query;
  try {
    await connectToDb();
    if (pId && dId) {
      const data = await Slices.findOne({projectId: pId, documentId: dId});
      res.json(data);
    }
    const data = await Slices.find();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to fetch data", details: error.message});
  }
};

const getDocument = async (req, res) => {
  const {id} = req.query;
  try {
    await connectToDb();
    if (id) {
      const data = await Documents.findOne({documentId: id});
      res.json(data);
    }
    const data = await Documents.find();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to fetch data", details: error.message});
  }
};

const getProject = async (req, res) => {
  const {id} = req.query;
  try {
    await connectToDb();
    if (id) {
      const data = await Projects.findOne({projectId: id});
      res.json(data);
    }
    const data = await Projects.find();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to fetch data", details: error.message});
  }
};

export {
  createSlice,
  createSlices,
  createDocument,
  createProject,
  updateSlice,
  updateSlices,
  updateDocument,
  updateProject,
  deleteSlice,
  deleteSlices,
  deleteDocument,
  deleteProject,
  getSlice,
  getSlices,
  getDocument,
  getProject,
};
