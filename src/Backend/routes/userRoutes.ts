import express from "express";
import userController from "../controllers/userController.ts";

export const router = express.Router();

router.post("/login", (req, res, next) => {
  userController.login(req, res);
});
router.post("/register", (req, res, next) => {
  userController.register(req, res);
});
