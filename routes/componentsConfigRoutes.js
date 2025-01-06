import express from "express";
import { createComponentConfig, getComponentConfig } from "../controllers/componentsConfigControllers.js";

export const componentsConfigRoutes = express.Router();

componentsConfigRoutes.post("/", createComponentConfig);
componentsConfigRoutes.get("/:documentId", getComponentConfig);
