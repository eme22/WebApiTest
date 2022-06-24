import express from "express";
import UserController from "../controllers/user.controller";
import FileMiddleware from '../middleware/upload.middleware';

const router = express.Router();

router.get("/all/", async (_req, res) => {
  const controller = new UserController();
  const response = await controller.getUsers();
  return res.send(response);
});

router.post("/"
,FileMiddleware.memoryLoader.single('data'), async (req, res) => {

  const file = req.file
  const controller = new UserController();
  var response;
  if (file == undefined) {
    response = await controller.createUser(req.body, undefined, "");
  }
  else
    response = await controller.createUser(req.body, file.buffer, file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length));
  return res.send(response);

  }
);

router.get("/id/:id", async (req, res) => {
  const controller = new UserController();
  const response = await controller.getUser(req.params.id);
  if (!response) return res.status(404).send({message: "No user found"})
  return res.send(response);
});

router.delete("/id/:id", async (req, res) => {
  const controller = new UserController();
  const response = await controller.deleteUser(req.params.id);
  if (!response) return res.status(404).send({message: "No user found"})
  return res.send({message: response});
});

router.get("/count", async (_req, res) => {
  const controller = new UserController();
  const response = await controller.count();
  return res.send({count: response});
});

router.post("/login", async (req, res) => {
  const controller = new UserController();
  const response = await controller.login(req.body.email, req.body.passwordHash);
  return res.send(response);
});

router.get("/exist/:email", async (req, res) => {
  const controller = new UserController();
  const response = await controller.exist(req.params.email);
  return res.send({exist: response});
});

export default router