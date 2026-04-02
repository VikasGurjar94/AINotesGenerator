import Razorpay from "razorpay";
import crypto from "crypto";
import UserModel from "../models/user.model.js";

const getCreditsForAmount = (amount) => {
    switch (amount) {
        case 100: return 50;
        case 200: return 120;
        case 500: return 300;
        default: return 0;
    }
};

export const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;
        
        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: "Invalid amount" });
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: amount * 100, // amount in paisa
            currency: "INR",
            receipt: `rcpt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).json({ success: false, message: "Error creating order" });
        }

        res.json({ success: true, order });
    } catch (error) {
        console.error("Order Creation Error: ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Payment is verified
            const creditsToAdd = getCreditsForAmount(amount);
            
            const user = await UserModel.findById(req.userId);
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            user.credits += creditsToAdd;
            await user.save();

            res.json({ success: true, message: "Payment verified successfully", credits: user.credits });
        } else {
            res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (error) {
        console.error("Payment Verification Error: ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
