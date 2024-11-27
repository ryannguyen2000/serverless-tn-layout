import express from "express";
export const webhook = express.Router();
import {
  webhookPublishTypeHomePage,
  webhookPublishTypeNone,
  webhookPublishTypePage,
  webhookPublish,
} from "../controllers/index.js";

webhook.post("/webhook-page", webhookPublishTypePage);
webhook.post("/webhook-homepage", webhookPublishTypeHomePage);
webhook.post("/webhook", webhookPublishTypeNone);
webhook.post("/publish", webhookPublish);
