import express from "express";
import { jwtMiddleware } from "../middleware/jwtMiddleware.ts";
import sessionController from "../controllers/sessionController.ts";

export const router = express.Router();

router.get("/get-sessions", jwtMiddleware.jwtTokenIsValid, (req, res, next) => {
  sessionController.getSessions(req, res);
});

router.post("/add-session", jwtMiddleware.jwtTokenIsValid, (req, res, next) => {
  sessionController.addSession(req, res);
});
router.patch(
  "/update-session",
  jwtMiddleware.jwtTokenIsValid,
  (req, res, next) => {
    sessionController.updateSession(req, res);
  },
);
