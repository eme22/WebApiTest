import express from "express";
import CategoryController from "../controllers/category.controller";
import FileMiddleware from '../middleware/upload.middleware';

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new CategoryController();
  const response = await controller.getCategorys();
  return res.send(response);
});

router.post("/", FileMiddleware.memoryLoader.single('data'), async (req, res) => {

  const file = req.file;

  if (file){
    const controller = new CategoryController();
    const response = await controller.createCategory(req.body, file.buffer, file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length));
    return res.send(response);

  }
  else{
    res.statusCode = 404;
    return res.send({message: 'File Not Found'});
  }
});

router.get("/:id", async (req, res) => {
  const controller = new CategoryController();
  const response = await controller.getCategory(req.params.id);
  if (!response) return res.status(404).send({message: "No category found"})
  return res.send(response);
});

router.delete("/:id", async (req, res) => {
  const controller = new CategoryController();
  const response = await controller.getCategory(req.params.id);
  if (!response) return res.status(404).send({message: "No category found"})
  return res.send(response);
});

export default router