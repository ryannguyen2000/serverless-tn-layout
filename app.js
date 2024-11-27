import express from "express";
import bodyParser from "body-parser";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import {router} from "./routes/index.js";
import {extractVariantAndId} from "./utils/index.js";
import axios from "axios";
import {webhook} from "./webhooks/index.js";
import {Server} from "socket.io";
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

app.use(bodyParser.json({limit: "10mb"}));
app.use("/api", router);
app.use(webhook);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  },
});

let connectedClients = [];

io.on("connection", (socket) => {
  console.log(`Socket connected`);
  connectedClients.push(socket);

  socket.on("disconnect", () => {
    console.log(`Socket disconnected`);
    connectedClients = connectedClients.filter(
      (client) => client.id !== socket.id
    );
  });
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
