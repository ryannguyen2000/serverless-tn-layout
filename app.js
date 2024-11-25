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
import {v2 as cloudinary} from "cloudinary";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const base64Regex =
  /^data:image\/(png|jpeg|jpg|gif|bmp|webp);base64,([A-Za-z0-9+/=]+)$/;

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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(bodyParser.json({limit: "10mb"}));

app.use("/api", router);

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

app.post("/upload", async (req, res) => {
  const {image} = req.body;
  if (!image) {
    return res.status(400).send("No image file uploaded");
  }

  if (!base64Regex.test(image)) {
    return res.status(400).json({
      error:
        "Invalid image format. Its must be start 'data:image...' and allow for png,jpeg,jpg,gif,bmp or webp",
    });
  }

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "uploads",
    });

    res.json({
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
    });
    res.send({imageUrl});
  } catch (error) {
    res.send({error: error.message});
  }
});

app.post("/webhook-page", async (req, res) => {
  console.log(req.body);
  try {
    if (req.body) {
      const response = await axios.get(
        `${req.body.apiUrl}/v2/documents/search?ref=${req.body.masterRef}&q=[[at(document.type,"page")]]`
      );

      console.log(JSON.stringify(response.data));

      // io.emit(
      //   "webhook-data",
      //   extractVariantAndId(response.data?.results[0]?.data?.slices)
      // );
    }
    res.status(200).send("Webhook received and broadcasted");
  } catch (error) {
    console.error(error);
  }
});
app.post("/webhook-homepage", async (req, res) => {
  try {
    if (req.body) {
      const response = await axios.get(
        `${req.body.apiUrl}/v2/documents/search?ref=${req.body.masterRef}&q=[[at(document.type,"homepage")]]`
      );
      if (response) {
        console.log(JSON.stringify(req));

        // io.emit(
        //   "webhook-data",
        //   extractVariantAndId(response.data?.results[0]?.data?.slices)
        // );
      }
    }
    res.status(200).send("Webhook received and broadcasted");
  } catch (error) {
    console.error(error);
  }
});
app.post("/webhook", async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
  }
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
