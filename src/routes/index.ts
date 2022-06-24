import express from "express";
import UserRouter from "./user.router";
import CartRouter from "./cart.router"
import ItemRouter from "./item.router"
import PromoRouter from "./promo.router"
import LoginRouter from "./login.router"
import SearchRouter from "./search.router"
import CategoryRouter from "./category.router"


const router = express.Router();

router.use("/users", UserRouter)

//router.use("/login", LoginRouter)

router.use("/carts", CartRouter)
router.use("/categories", CategoryRouter)
router.use("/items", ItemRouter)
router.use("/promos", PromoRouter)
router.use("/search", SearchRouter)

export default router;
