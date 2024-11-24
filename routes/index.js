import express from "express";
import {
  createDocument,
  createProject,
  createSlice,
  createSlices,
  deleteDocument,
  deleteProject,
  deleteSlice,
  deleteSlices,
  getDocument,
  getProject,
  getSlice,
  getSlices,
  updateDocument,
  updateProject,
  updateSlice,
  updateSlices,
} from "../controllers/index.js";

export const router = express.Router();

// get routes
router.get("/slice", getSlice);
router.get("/slices", getSlices);
router.get("/documents", getDocument);
router.get("/projects", getProject);

// create routes
router.post("/slice", createSlice);
router.post("/slices", createSlices);
router.post("/documents", createDocument);
router.post("/projects", createProject);

// update routes
router.put("/slice", updateSlice);
router.put("/slices", updateSlices);
router.put("/documents", updateDocument);
router.put("/projects", updateProject);

// delete routes
router.delete("/slice/:id", deleteSlice);
router.delete("/slices/:projectId/:documentId", deleteSlices);
router.delete("/documents/:id", deleteDocument);
router.delete("/projects/:id", deleteProject);
