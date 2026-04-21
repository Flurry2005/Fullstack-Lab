import mongoose from "mongoose";

const sessionsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  workoutId: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  exercices: {
    type: [],
  },
});

export default mongoose.model("Sessions", sessionsSchema);
