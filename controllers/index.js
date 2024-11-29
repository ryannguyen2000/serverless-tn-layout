import mongoose from "mongoose";
import {Documents, Projects, Slices} from "../models/index.js";
import {v2 as cloudinary} from "cloudinary";
import axios from "axios";
import {
  extractVariantAndId,
  formatString,
  processString,
} from "../utils/index.js";
import {io} from "../app.js";

// #region cloudinary config =================================================================================================================================================

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// #endregion

// #region Connect to MongoDB using Mongoose ===================================================================================================================================

const connectToDb = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
// #endregion

// #region create route =============================================================================================================================================================

const createSlices = async (req, res) => {
  try {
    await connectToDb();
    if (!req.body) {
      return res.status(400).json({error: "Invalid request body"});
    }

    if (Array.isArray(req.body)) {
      const slices = await Slices.insertMany(req.body);
      return res.status(201).json({
        message: "Success",
      });
    }

    const slicesChecker = await Slices.findOneAndUpdate(
      {
        sliceId: req.body.slideId,
        projectId: req.body.projectId,
        documentId: req.body.documentId,
      },
      {
        $set: {
          projectId: req.body.projectId,
          documentId: req.body.documentId,
          sliceId: req.body.sliceId,
          thumnail: req.body.thumnail,
          detail: typeof req.body.detail === "object" ? req.body.detail : {},
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    return res.status(201).json({
      message: "Success",
      pid: slicesChecker.projectId,
      did: slicesChecker.documentId,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request",
      details: error.message,
    });
  }
};

const createDocument = async (req, res) => {
  try {
    await connectToDb();

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({error: "Invalid request body"});
    }

    const {projectId, documentId, documentName, layoutJson, thumnail} =
      req.body;

    if (!projectId || !documentId || !documentName) {
      return res.status(400).json({error: "Missing required fields"});
    }

    const documentChecker = await Documents.findOneAndUpdate(
      {
        projectId: projectId,
        documentId: documentId,
      },
      {
        $set: {
          projectId: projectId,
          documentId: documentId,
          documentName: documentName,
          thumnail: thumnail,
          layoutJson: layoutJson,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    return res.status(201).json({
      message: "Success",
      pid: documentChecker.projectId,
      did: documentChecker.documentId,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to execute request",
      details: error.message,
    });
  }
};

const createProject = async (req, res) => {
  try {
    await connectToDb();
    if (!req.body) {
      return res.status(400).json({error: "Invalid request body"});
    }
    const projectChecker = await Projects.findOneAndUpdate(
      {
        projectId: req.body.projectId,
      },
      {
        $set: {
          projectId: req.body.projectId,
          projectName: req.body.projectName,
          projectUrl: req.body.projectUrl,
          websiteUrl: req.body.websiteUrl,
          thumnail: req.body.thumnail,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    return res.status(201).json({
      message: "Success",
      pid: projectChecker.projectId,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request",
      details: error.message,
    });
  }
};
// #endregion

// #region update route ===========================================================================================================================================================

const updateSlices = async (req, res) => {
  const {projectId, documentId} = req.body;
  try {
    await connectToDb();
    if (!req.body) {
      return res.status(400).json({error: "Invalid request body"});
    }
    const result = await Slices.updateOne(
      {projectId: projectId, documentId: documentId},
      {$set: req.body}
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({error: "Slices not found"});
    }
    res.json({message: "Slices updated"});
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request update slices",
      details: error.message,
    });
  }
};

const updateDocument = async (req, res) => {
  const {projectId, documentId} = req.body;
  try {
    await connectToDb();
    if (!req.body) {
      return res.status(400).json({error: "Invalid request body"});
    }
    const result = await Documents.updateOne(
      {documentId: documentId, projectId: projectId},
      {
        $set: req.body,
      }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({error: "Document not found"});
    }
    res.json({message: "Document updated"});
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request update document",
      details: error.message,
    });
  }
};
const updateProject = async (req, res) => {
  const {id} = req.body;
  try {
    await connectToDb();
    if (!req.body) {
      return res.status(400).json({error: "Invalid request body"});
    }
    const result = await Projects.updateOne({projectId: id}, {$set: req.body});
    if (result.matchedCount === 0) {
      return res.status(404).json({error: "Project not found"});
    }
    res.json({message: "Project updated"});
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request update project",
      details: error.message,
    });
  }
};
// #endregion

// #region delete route ==================================================================================================================================================

const deleteSlices = async (req, res) => {
  const {projectId, documentId} = req.params;
  try {
    await connectToDb();
    if (!projectId && !documentId) {
      return res.status(400).json({error: "Invalid request body"});
    }
    const result = await Slices.deleteMany({
      projectId: projectId,
      documentId: documentId,
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({error: "Slices not found"});
    }
    res.json({message: "Slices deleted"});
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request delete slices",
      details: error.message,
    });
  }
};

const deleteDocument = async (req, res) => {
  const {id} = req.params;
  try {
    await connectToDb();
    if (!id) {
      return res.status(400).json({error: "Invalid request body"});
    }
    const result = await Documents.deleteOne({documentId: id});
    if (result.deletedCount === 0) {
      return res.status(404).json({error: "Document not found"});
    }
    res.json({message: "Document deleted"});
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request delete document",
      details: error.message,
    });
  }
};
const deleteProject = async (req, res) => {
  const {id} = req.params;
  try {
    await connectToDb();
    if (!id) {
      return res.status(400).json({error: "Invalid request body"});
    }
    const result = await Projects.deleteOne({projectId: id});
    if (result.deletedCount === 0) {
      return res.status(404).json({error: "Project not found"});
    }
    res.json({message: "Project deleted"});
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request delete project",
      details: error.message,
    });
  }
};
// #endregion

// #region get route ==================================================================================================================================================

const getSlices = async (req, res) => {
  const {pId, dId, slideId} = req.query;
  try {
    await connectToDb();
    if (pId && dId) {
      const data = await Slices.find({projectId: pId, documentId: dId});
      return res.json(data);
    }
    if (!pId && !dId && slideId) {
      const data = await Slices.findOne({slideId: slideId, documentId: dId});
      return res.json(data);
    }
    const data = await Slices.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request fetch data",
      details: error.message,
    });
  }
};

const getDocument = async (req, res) => {
  const {dId, pId} = req.query;
  try {
    await connectToDb();
    if (dId && !pId) {
      const data = await Documents.findOne({documentId: dId});
      return res.json(data);
    }
    if (!dId && pId) {
      const data = await Documents.find({projectId: pId}).populate("projectId");
      return res.json(data);
    }
    const data = await Documents.find();
    return res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request fetch data",
      details: error.message,
    });
  }
};

const getProject = async (req, res) => {
  const {id} = req.query;
  try {
    await connectToDb();
    if (id) {
      const data = await Projects.findOne({projectId: id});
      res.json(data);
    }
    const data = await Projects.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute request fetch data",
      details: error.message,
    });
  }
};
// #endregion

// #region upload image =================================================================================================================================================
const uploadImage = async (req, res) => {
  const base64Regex =
    /^data:image\/(png|jpeg|jpg|gif|bmp|webp);base64,([A-Za-z0-9+/=]+)$/;
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
};
// #endregion

// #region Webhooks ===================================================================================================================================
const webhookPublishTypePage = async (req, res) => {
  await connectToDb();

  const ScanDocument = async () => {
    const listDocument = await axios.get(
      `${req.body.apiUrl}/v2/documents/search?ref=${req.body.masterRef}&q=[[at(document.type,"page")]]`
    );

    if (listDocument.status === 200 || listDocument.status === 201) {
      console.log("data: " + JSON.stringify(listDocument.data));
      for (const doc of listDocument.data?.results || []) {
        try {
          const documentExist = await Documents.findOne({
            projectId: req.body.domain,
            documentId: doc?.id,
          });

          console.log("doc: " + doc);
          console.log("docExist: " + documentExist);
          if (documentExist) {
            const sliceList = await Slices.find();
            const missingItems = doc?.data?.slices.filter(
              (docSlice) =>
                !sliceList.some((slice) => slice.sliceId === docSlice.id)
            );
            console.log("missItem: " + missingItems);

            if (!missingItems) {
              const data = new Slices({
                projectId: req.body.domain,
                documentId: doc?.id,
                sliceId: missingItems?.id,
                thumnail: "_",
                detail: {},
              });
              await data.save();
            }
            continue;
          }

          const data = new Documents({
            projectId: req.body.domain,
            documentId: doc?.id,
            documentName: formatString(doc?.uid),
            thumnail: "_",
            layoutJson: {},
          });
          await data.save();
        } catch (error) {
          console.error(`Error processing document: ${error.message}`);
        }
      }
    }
  };

  try {
    if (req.body) {
      const projectForm = {
        projectId: req.body.domain,
        projectName: formatString(req.body.domain),
        projectUrl: `https://${req.body.domain}.prismic.io`,
        websiteUrl: "_",
        thumnail: "_",
      };

      const projectExist = await Projects.findOne({
        projectId: req.body.domain,
      });

      if (!projectExist) {
        const data = new Projects(projectForm);
        await data.save();
      }

      await ScanDocument();
      io.emit("webhook-data", "active");

      return res.status(200).json({message: "Webhook success"});
    }

    return res.status(400).send("Webhook error: missing body");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

const webhookPublishTypeHomePage = async (req, res) => {
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
};
const webhookPublishTypeNone = async (req, res) => {
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
};
const webhookPublish = async (req, res) => {
  console.log("Webhook received:", req.body);

  io.emit("return-json", req.body);

  res.status(200).send("Webhook received and broadcasted");
};
// #endregion

export {
  createSlices,
  createDocument,
  createProject,
  updateSlices,
  updateDocument,
  updateProject,
  deleteSlices,
  deleteDocument,
  deleteProject,
  getSlices,
  getDocument,
  getProject,
  webhookPublishTypePage,
  webhookPublishTypeHomePage,
  webhookPublishTypeNone,
  webhookPublish,
  uploadImage,
};
