import express from "express";
import PromoController from "../controllers/promo.controller";
import FileMiddleware from '../middleware/upload.middleware';

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new PromoController();
  const response = await controller.getPromos();
  return res.send(response);
});

router.post("/", FileMiddleware.memoryLoader.single('data'), async (req, res) => {

  const file = req.file;

  if (file){
    const controller = new PromoController();
    const response = await controller.createPromo(req.body, file.buffer, file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length));
    return res.send(response);

  }
  else{
    res.statusCode = 404;
    return res.send({message: 'File Not Found'});
  }
});

router.get("/:id", async (req, res) => {
  const controller = new PromoController();
  const response = await controller.getPromo(req.params.id);
  if (!response) res.status(404).send({message: "No promo found"})
  return res.send(response);
});

router.delete("/:id", async (req, res) => {
  const controller = new PromoController();
  const response = await controller.getPromo(req.params.id);
  if (!response) res.status(404).send({message: "No promo found"})
  return res.send(response);
});

export default router