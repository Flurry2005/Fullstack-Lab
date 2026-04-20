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
router.post("/update-user", (req, res, next) => {
  userController.updateUser(req, res);
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
router.get("/get-sessions", jwtMiddleware.jwtTokenIsValid, (req, res, next) => {
  userController.getSessions(req, res);
});

router.post("/add-session", jwtMiddleware.jwtTokenIsValid, (req, res, next) => {
  userController.addSession(req, res);
});
router.patch(
  "/update-session",
  jwtMiddleware.jwtTokenIsValid,
  (req, res, next) => {
    userController.updateSession(req, res);
  },
);
