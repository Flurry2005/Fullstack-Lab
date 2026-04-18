import { router as userRouter } from "./userRoutes.ts";
import { router as exerciceRouter } from "./exerciceRoute.ts";
import express from "express";

export const mainRouter = express.Router();

mainRouter.use(userRouter);

mainRouter.use(exerciceRouter);
