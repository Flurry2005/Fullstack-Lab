import {router as userRouter} from "./userRoutes.ts"
import express from "express";


export const mainRouter = express.Router();

mainRouter.use(userRouter)