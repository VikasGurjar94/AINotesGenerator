import express from "express";
import isAuth from "../middleware/isAuth.js";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-order", isAuth, createOrder);
router.post("/verify", isAuth, verifyPayment);

export default router;
