import express from "express";
import ItemController from "../controllers/item.controller";
import FileMiddleware from '../middleware/upload.middleware';

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new ItemController();
  const response = await controller.getItems();
  return res.send(response);
});

router.post("/", FileMiddleware.memoryLoader.single('data'), async (req, res) => {

  const file = req.file;

  if (file){
    const controller = new ItemController();
    const response = await controller.createItem(req.body, file.buffer, file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length));
    return res.send(response);

  }
  else{
    res.statusCode = 404;
    return res.send({message: 'File Not Found'});
  }
});

router.get("/:id", async (req, res) => {
  const controller = new ItemController();
  const response = await controller.getItem(req.params.id);
  if (!response) return res.status(404).send({message: "No item found"})
  return res.send(response);
});

router.delete("/:id", async (req, res) => {
  const controller = new ItemController();
  const response = await controller.getItem(req.params.id);
  if (!response) return res.status(404).send({message: "No item found"})
  return res.send(response);
});

export default router