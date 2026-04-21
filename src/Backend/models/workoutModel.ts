import mongoose from "mongoose";

const workoutsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  workoutName: {
    type: String,
    required: true,
    trim: true,
  },
  workoutDesc: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: false,
  },
  exercices: {
    type: [],
    required: true,
  },
});

export default mongoose.model("Workouts", workoutsSchema);
