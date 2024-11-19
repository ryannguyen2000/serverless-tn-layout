import express from "express";
import bodyParser from "body-parser";
import http from "http";
import dotenv from "dotenv";
import {Server} from "socket.io";
import cors from "cors";
import {router} from "./routes/index.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FE_HOST || process.env.FE_PORT_2,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Khởi tạo HTTP server và Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FE_HOST || process.env.FE_HOST_2,
    methods: ["POST"],
    credentials: true,
  },
});

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

app.post("/webhook", (req, res) => {
  console.log("Webhook received:", req.body);

  io.emit("webhook-data", req.body);

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
