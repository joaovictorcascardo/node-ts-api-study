import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const userController = new UserController();

userRouter.get("/age-range", userController.getUsersByAgeRange);
userRouter.get("/:id", userController.getUserById);
userRouter.delete("/cleanup-inactive", userController.cleanupInactiveUsers);
