import mongoose from "mongoose";

export const exerciceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
  },
  type: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  muscles: {
    type: [String],
    required: true,
    minlength: 1,
  },
  sets: {
    type: [],
    required: false,
    default: undefined,
  },
});

export default mongoose.model("Exercice", exerciceSchema);
