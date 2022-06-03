import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/count", async (_req, res) => {
  const controller = new UserController();
  const response = await controller.count();
  return res.send({count: response});
});

router.post("/login", async (req, res) => {
  const controller = new UserController();
  const response = await controller.login(req.body.email, req.body.passwordHash);
  if (!response) return res.status(404).send({message: "No user found"})
  return res.send(response);
});

router.get("/exist/:email", async (req, res) => {
  const controller = new UserController();
  const response = await controller.exist(req.params.email);
  return res.send({exist: response});
});

export default router