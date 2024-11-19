import mongoose from "mongoose";
import {Layouts, Projects, Settings} from "../models/index.js";

// Connect to MongoDB using Mongoose
const connectToDb = async () => {
  if (mongoose.connections[0].readyState) {
    return; // Already connected
  }

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const createSettingsData = async (req, res) => {
  try {
    await connectToDb();
    const newSettings = new Settings(req.body);
    const result = await newSettings.save();
    res.status(201).json({message: "Document created", id: result._id});
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to create document", details: error.message});
  }
};

const createLayoutsData = async (req, res) => {
  try {
    await connectToDb();
    const newLayout = new Layouts(req.body);
    const result = await newLayout.save();
    res.status(201).json({message: "Document created", id: result._id});
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to create document", details: error.message});
  }
};

const createProjectsData = async (req, res) => {
  try {
    await connectToDb();
    const newProject = new Projects(req.body);
    const result = await newProject.save();
    res.status(201).json({message: "Document created", id: result._id});
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to create document", details: error.message});
  }
};

const updateSettingsData = async (req, res) => {
  const {id} = req.params;
  try {
    await connectToDb();
    const result = await Settings.updateOne({_id: id}, {$set: req.body});
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

const updateLayoutsData = async (req, res) => {
  const {id} = req.params;
  try {
    await connectToDb();
    const result = await Layouts.updateOne({_id: id}, {$set: req.body});
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

const updateProjectsData = async (req, res) => {
  const {id} = req.params;
  try {
    await connectToDb();
    const result = await Projects.updateOne({_id: id}, {$set: req.body});
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

const deleteSettingsData = async (req, res) => {
  const {id} = req.params;
  try {
    await connectToDb();
    const result = await Settings.deleteOne({_id: id});
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

const deleteLayoutsData = async (req, res) => {
  const {id} = req.params;
  try {
    await connectToDb();
    const result = await Layouts.deleteOne({_id: id});
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

const deleteProjectsData = async (req, res) => {
  const {id} = req.params;
  try {
    await connectToDb();
    const result = await Projects.deleteOne({_id: id});
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

const getAllSettingsData = async (req, res) => {
  try {
    await connectToDb();
    const data = await Settings.find();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to fetch data", details: error.message});
  }
};

const getAllLayoutsData = async (req, res) => {
  try {
    await connectToDb();
    const data = await Layouts.find();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to fetch data", details: error.message});
  }
};

const getAllProjectsData = async (req, res) => {
  try {
    await connectToDb();
    const data = await Projects.find();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to fetch data", details: error.message});
  }
};

const getDataSettingsById = async (req, res) => {
  const {id} = req.params;
  try {
    await connectToDb();
    const data = await Settings.findById(id);
    if (!data) {
      return res.status(404).json({error: "Document not found"});
    }
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to fetch document", details: error.message});
  }
};

const getDataLayoutsById = async (req, res) => {
  const {id} = req.params;
  try {
    await connectToDb();
    const data = await Layouts.findById(id);
    if (!data) {
      return res.status(404).json({error: "Document not found"});
    }
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to fetch document", details: error.message});
  }
};

const getDataProjectsById = async (req, res) => {
  const {id} = req.params;
  try {
    await connectToDb();
    const data = await Projects.findById(id);
    if (!data) {
      return res.status(404).json({error: "Document not found"});
    }
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to fetch document", details: error.message});
  }
};

export {
  createSettingsData,
  createLayoutsData,
  createProjectsData,
  updateSettingsData,
  updateLayoutsData,
  updateProjectsData,
  deleteSettingsData,
  deleteLayoutsData,
  deleteProjectsData,
  getAllSettingsData,
  getAllLayoutsData,
  getAllProjectsData,
  getDataSettingsById,
  getDataLayoutsById,
  getDataProjectsById,
};
