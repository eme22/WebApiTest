import express from "express";
import SearchController from "../controllers/search.controller";

const router = express.Router();

router.get("/:query", async (req, res) => {
    const controller = new SearchController();
    const response = await controller.search(req.params.query);
    return res.send(response);
  });

  export default router