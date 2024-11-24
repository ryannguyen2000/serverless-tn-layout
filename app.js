import express from "express";
import bodyParser from "body-parser";
import http from "http";
import dotenv from "dotenv";
import {Server} from "socket.io";
import cors from "cors";
import {router} from "./routes/index.js";
import {extractVariantAndId} from "./utils/index.js";
import axios from "axios";
import multer from "multer";
import path from "path";
import {v6} from "uuid";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const filename = v6() + extname;
    cb(null, filename);
  },
});

const upload = multer({storage: storage});

import fs from "fs";
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(bodyParser.json());

app.use("/api", router);

let connectedClients = [];

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);
  connectedClients.push(socket);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    connectedClients = connectedClients.filter(
      (client) => client.id !== socket.id
    );
  });
});

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No image file uploaded");
  }

  const imageUrl = `https://serverless-tn-layout-production.up.railway.app/uploads/${req.file.filename}`;
  res.send({imageUrl});
});
app.use("/uploads", express.static("uploads"));

app.post("/webhook", async (req, res) => {
  if (req.body) {
    const response = await axios.get(
      `${req.body.apiUrl}/v2/documents/search?ref=${req.body.masterRef}&q=[[at(document.type,"homepage")]]`
    );
    if (response) {
      io.emit(
        "webhook-data",
        extractVariantAndId(response.data?.results[0]?.data?.slices)
      );
    }
  }

  res.status(200).send("Webhook received and broadcasted");
});

app.post("/publish", (req, res) => {
  console.log("Webhook received:", req.body);

  io.emit("return-json", req.body);

  res.status(200).send("Webhook received and broadcasted");
});

app.get("/", (req, res) => {
  res.send("Webhook server with Socket.IO is running!");
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
