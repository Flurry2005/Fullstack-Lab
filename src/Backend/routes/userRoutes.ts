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

router.get("/profile/:username", (req, res, next) => {
  userController.getProfile(req, res);
});
