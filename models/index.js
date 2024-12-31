import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true, unique: true },
    projectName: { type: String, required: true },
    projectUrl: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    thumnail: { type: String, required: true },
  },
  { timestamps: true }
);

const documentsSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true, ref: "Projects" },
    documentId: { type: String, required: true, unique: true },
    documentName: { type: String, required: true },
    thumnail: { type: String, required: true },
    layoutJson: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

const slicesSchema = new mongoose.Schema({
  sliceId: { type: String, required: true, unique: true },
  projectId: { type: String, required: true, ref: "Projects" },
  documentId: { type: String, required: true, ref: "Documents" },
  thumnail: { type: String, required: true },
  detail: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const functionSlicesSchema = new mongoose.Schema({
  sliceId: { type: String, required: true, unique: true },
  functions: { type: String, require: true },
  createdAt: { type: Date, default: Date.now }
})

const Documents = mongoose.model("Documents", documentsSchema);
const Projects = mongoose.model("Projects", projectsSchema);
const Slices = mongoose.model("Slices", slicesSchema);
const FunctionSlices = mongoose.model("FunctionSlices", functionSlicesSchema)

export { Documents, Projects, Slices, FunctionSlices };
