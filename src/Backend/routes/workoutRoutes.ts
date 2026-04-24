import express from "express";
import workoutController from "../controllers/workoutController.ts";
import { jwtMiddleware } from "../middleware/jwtMiddleware.ts";

export const router = express.Router();

router.post(
  "/create-workout",
  jwtMiddleware.jwtTokenIsValid,
  (req, res, next) => {
    workoutController.createWorkout(req, res);
  },
);
router.get("/get-workouts", jwtMiddleware.jwtTokenIsValid, (req, res, next) => {
  workoutController.getWorkouts(req, res);
});
