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
  upload,
  uploadImage,
  uploadMedia,
} from "../controllers/index.js";

export const router = express.Router();

// get routes
router.get("/slices", getSlices);
router.get("/documents", getDocument);
router.get("/projects", getProject);

// create routes
router.post("/slices", createSlices);
router.post("/documents", createDocument);
router.post("/projects", createProject);

// update routes
router.put("/slices", updateSlices);
router.put("/documents", updateDocument);
router.put("/projects", updateProject);
// delete routes
router.delete("/slices/:projectId/:documentId", deleteSlices);
router.delete("/documents/:id", deleteDocument);
router.delete("/projects/:id", deleteProject);

// image upload
router.post("/upload", uploadImage);
router.post("/uploadMedia", upload.single("media"), uploadMedia);