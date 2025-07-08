import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortcode: {
    type: String,
    required: true,
    unique: true,
  },
  defaulturl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  validity: {
    type: Number,
    default: 30,
  },
  expiresAt: {
    type: Date,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

const urlModel = mongoose.model("UrlModel", urlSchema);

export default urlModel;
