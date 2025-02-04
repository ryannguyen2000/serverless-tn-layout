import express from "express";
import { createLayoutJson, getLayoutJson } from "../controllers/layoutJsonControllers.js";

export const layoutsonRoutes = express.Router();

layoutsonRoutes.post("/", createLayoutJson);
layoutsonRoutes.get("/:documentId", getLayoutJson);
