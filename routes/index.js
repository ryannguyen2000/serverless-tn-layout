import express from "express";
import {
  createLayoutsData,
  createProjectsData,
  createSettingsData,
  deleteLayoutsData,
  deleteProjectsData,
  deleteSettingsData,
  getAllLayoutsData,
  getAllProjectsData,
  getAllSettingsData,
  getDataLayoutsById,
  getDataProjectsById,
  getDataSettingsById,
  updateLayoutsData,
  updateProjectsData,
  updateSettingsData,
} from "../controllers/index.js";

export const router = express.Router();

// get routes
router.get("/settings", getAllSettingsData);
router.get("/settings/:id", getDataSettingsById);
router.get("/layouts", getAllLayoutsData);
router.get("/layouts/:id", getDataLayoutsById);
router.get("/projects", getAllProjectsData);
router.get("/projects/:id", getDataProjectsById);

// create routes
router.post("/settings", createSettingsData);
router.post("/layouts", createLayoutsData);
router.post("/projects", createProjectsData);

// update routes
router.put("/settings/:id", updateSettingsData);
router.put("/layouts/:id", updateLayoutsData);
router.put("/projects/:id", updateProjectsData);

// delete routes
router.delete("/settings/:id", deleteSettingsData);
router.delete("/layouts/:id", deleteLayoutsData);
router.delete("/projects/:id", deleteProjectsData);
