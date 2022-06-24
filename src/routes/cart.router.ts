import express from "express";
import CartController from "../controllers/cart.controller";

const router = express.Router();

router.post("/", async (req, res) => {
    
  const controller = new CartController();
  const response = await controller.createCart(req.body);
  return res.send(response);

});

router.get("/all/", async (_req, res) => {
  const controller = new CartController();
  const response = await controller.getCarts();
  return res.send(response);
});


router.get("/all/:id", async (req, res) => {
  const controller = new CartController();
  const response = await controller.getAllUserCarts(req.params.id);
  return res.send(response);
});


router.get("/id/:id", async (req, res) => {
  const controller = new CartController();
  const response = await controller.getCart(req.params.id);
  if (!response) return res.status(404).send({message: "No cart found"})
  return res.send(response);
});

router.delete("/id/:id", async (req, res) => {
  const controller = new CartController();
  const response = await controller.deleteCart(req.params.id);
  if (!response) return res.status(404).send({message: "No cart found"})
  return res.send({message: response});
});

router.get("/current/:id", async (req, res) => {
  const controller = new CartController();
  const response = await controller.getCurrentCart(req.params.id);
  if (!response) return res.status(404).send({message: "No cart found"})
  return res.send(response);
});

export default router