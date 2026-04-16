import express from "express";
import userController from "../controllers/userController.ts";
import { jwtMiddleware } from "../middleware/jwtMiddleware.ts";

export const router = express.Router();

router.post("/login", (req, res, next) => {
  userController.login(req, res);
});
router.post("/register", (req, res, next) => {
  userController.register(req, res);
});
router.post(
  "/create-workout",
  jwtMiddleware.jwtTokenIsValid,
  (req, res, next) => {
    userController.createWorkout(req, res);
  },
);
router.get("/get-workouts", jwtMiddleware.jwtTokenIsValid, (req, res, next) => {
  userController.getWorkouts(req, res);
});
