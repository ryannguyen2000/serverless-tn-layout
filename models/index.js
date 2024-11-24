import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema(
  {
    projectId: {type: String, required: true, unique: true},
    projectName: {type: String, required: true},
    projectUrl: {type: String, required: true},
    websiteUrl: {type: String, required: true},
    thumnail: {type: String, required: true},
  },
  {timestamps: true}
);

const documentsSchema = new mongoose.Schema(
  {
    projectId: {type: String, required: true, ref: "Projects"},
    documentId: {type: String, required: true, unique: true},
    documentName: {type: String, required: true},
    thumnail: {type: String, required: true},
    layoutJson: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {timestamps: true}
);

const sliceSchema = new mongoose.Schema({
  sliceId: {type: String, required: true, unique: true},
  thumnail: {type: String, required: true},
  detail: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const slicesSchema = new mongoose.Schema(
  {
    projectId: {type: String, required: true, ref: "Projects"},
    documentId: {type: String, required: true, ref: "Documents"},
    slices: {type: [sliceSchema], required: true},
  },
  {timestamps: true}
);

const Documents = mongoose.model("Documents", documentsSchema);
const Projects = mongoose.model("Projects", projectsSchema);
const Slices = mongoose.model("Slices", slicesSchema);
const Slice = mongoose.model("Slice", sliceSchema);

export {Documents, Projects, Slices, Slice};
