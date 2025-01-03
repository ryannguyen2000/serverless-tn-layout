import express from "express";
import {
  createDocument,
  createProject,
  createSlices,
  deleteDocument,
  deleteProject,
  deleteSlices,
  getDocument,
  getProject,
  getSlices,
  updateDocument,
  updateProject,
  updateSlices,
  uploadImage,
} from "../controllers/index.js";
import { createFunctionDocument, getFunctionsDocument, updateFunctionSlice } from "../controllers/functionSlicesController.js";

export const router = express.Router();

// get routes
router.get("/slices", getSlices);
router.get("/documents", getDocument);
router.get("/projects", getProject);
router.get("/functions/:documentId", getFunctionsDocument)

// create routes
router.post("/slices", createSlices);
router.post("/documents", createDocument);
router.post("/projects", createProject);
router.post("/functions", createFunctionDocument)

// update routes
router.put("/slices", updateSlices);
router.put("/documents", updateDocument);
router.put("/projects", updateProject);
router.put("/functions", updateFunctionSlice)

// delete routes
router.delete("/slices/:projectId/:documentId", deleteSlices);
router.delete("/documents/:id", deleteDocument);
router.delete("/projects/:id", deleteProject);

// image upload
router.post("/upload", uploadImage);