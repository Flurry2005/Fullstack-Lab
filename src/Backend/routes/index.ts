import { router as userRouter } from "./userRoutes.ts";
import { router as exerciceRouter } from "./exerciceRoutes.ts";
import { router as workoutRouter } from "./workoutRoutes.ts";
import { router as sessionRouter } from "./sessionRoutes.ts";
import express from "express";

export const mainRouter = express.Router();

mainRouter.use(userRouter);

mainRouter.use(exerciceRouter);

mainRouter.use(workoutRouter);

mainRouter.use(sessionRouter);
