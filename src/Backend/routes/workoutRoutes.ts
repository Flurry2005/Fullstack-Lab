import express from "express";
import workoutController from "../controllers/workoutController.ts";
import { jwtMiddleware } from "../middleware/jwtMiddleware.ts";

export const router = express.Router();

router.post(
  "/create-workout",
  jwtMiddleware.jwtTokenIsValid,
  async (req, res, next) => {
    try {
      await workoutController.createWorkout(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Interal Server Error" });
    }
  },
);
router.get(
  "/get-workouts",
  jwtMiddleware.jwtTokenIsValid,
  async (req, res, next) => {
    try {
      await workoutController.getWorkouts(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Interal Server Error" });
    }
  },
);
