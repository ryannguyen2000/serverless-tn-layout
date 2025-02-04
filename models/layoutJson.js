import mongoose from "mongoose";

const layoutJsonSchema = new mongoose.Schema({
  documentId: { type: String, required: true, unique: true },
  documentName: { type: String, required: true },
  layoutJson: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const LayoutJsons = mongoose.model("LayoutJsons", layoutJsonSchema);

export { LayoutJsons };
