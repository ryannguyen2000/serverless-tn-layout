import {ObjectId} from "mongodb";
import {connectToDb} from "../db/index.js";

const createSettingsData = async (req, res) => {
  try {
    const db = await connectToDb();
    const result = await db.collection("settings").insertOne(req.body);
    res.status(201).json({message: "Document created", id: result.insertedId});
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to create document", details: error.message});
  }
};
const createLayoutsData = async (req, res) => {
  try {
    const db = await connectToDb();
    const result = await db.collection("layouts").insertOne(req.body);
    res.status(201).json({message: "Document created", id: result.insertedId});
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to create document", details: error.message});
  }
};
const createProjectsData = async (req, res) => {
  try {
    const db = await connectToDb();
    const result = await db.collection("projects").insertOne(req.body);
    res.status(201).json({message: "Document created", id: result.insertedId});
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to create document", details: error.message});
  }
};

const updateSettingsData = async (req, res) => {
  const {id} = req.params;
  try {
    const db = await connectToDb();
    const result = await db
      .collection("settings")
      .updateOne({_id: new ObjectId(id)}, {$set: req.body});

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
    const db = await connectToDb();
    const result = await db
      .collection("layouts")
      .updateOne({_id: new ObjectId(id)}, {$set: req.body});

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
    const db = await connectToDb();
    const result = await db
      .collection("projects")
      .updateOne({_id: new ObjectId(id)}, {$set: req.body});

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
    const db = await connectToDb();
    const result = await db
      .collection("settings")
      .deleteOne({_id: new ObjectId(id)});

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
    const db = await connectToDb();
    const result = await db
      .collection("layouts")
      .deleteOne({_id: new ObjectId(id)});

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
    const db = await connectToDb();
    const result = await db
      .collection("projects")
      .deleteOne({_id: new ObjectId(id)});

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
    const db = await connectToDb();
    const data = await db.collection("settings").find({}).toArray();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to fetch data", details: error.message});
  }
};
const getAllLayoutsData = async (req, res) => {
  try {
    const db = await connectToDb();
    const data = await db.collection("layouts").find({}).toArray();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to fetch data", details: error.message});
  }
};
const getAllProjectsData = async (req, res) => {
  try {
    const db = await connectToDb();
    const data = await db.collection("projects").find({}).toArray();
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
    const db = await connectToDb();
    const data = await db
      .collection("settings")
      .findOne({_id: new ObjectId(id)});

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
    const db = await connectToDb();
    const data = await db
      .collection("layouts")
      .findOne({_id: new ObjectId(id)});

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
    const db = await connectToDb();
    const data = await db
      .collection("projects")
      .findOne({_id: new ObjectId(id)});

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
