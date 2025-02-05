import express from "express";
import { createComponentJson, getComponentJson } from "../controllers/componentJsonControllers.js";

export const componentJsonRoutes = express.Router();

componentJsonRoutes.post("/", createComponentJson);
componentJsonRoutes.get("/:documentId", getComponentJson);
