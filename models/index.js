import mongoose from "mongoose";

// Define Mongoose models
const settingsSchema = new mongoose.Schema(
  {
    repoHost: {type: String},
    repoName: {type: String},
  },
  {timestamps: true}
);

const layoutsSchema = new mongoose.Schema(
  {
    documentId: {type: String},
    layoutJson: {
      type: mongoose.Schema.Types.Mixed,
    },
    repoName: {
      type: String,
    },
  },
  {timestamps: true}
);

const projectsSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
    },
    projectName: {
      type: String,
    },
  },
  {timestamps: true}
);

// Create Mongoose models
const Settings = mongoose.model("Settings", settingsSchema);
const Layouts = mongoose.model("Layouts", layoutsSchema);
const Projects = mongoose.model("Projects", projectsSchema);

export {Layouts, Projects, Settings};
