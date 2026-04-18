import express from "express";
import exerciceController from "../controllers/exerciceController.ts";
import { jwtMiddleware } from "../middleware/jwtMiddleware.ts";

export const router = express.Router();

router.get(
  "/get-exercices",
  jwtMiddleware.jwtTokenIsValid,
  (req, res, next) => {
    exerciceController.getWorkouts(req, res);
  },
);
