import express from "express";
import Order from "../models/Order.js"; // ensure correct path

const router = express.Router();

// ---------------- Create a new order ----------------
router.post("/", async (req, res) => {
  try {
    const { userId, items, subtotal, shipping, total, paymentId } = req.body;

    // Basic validation
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    if (!items || !items.length) {
      return res.status(400).json({ message: "Items are required" });
    }
    if (!subtotal || !total || !paymentId) {
      return res.status(400).json({ message: "Subtotal, total, and paymentId are required" });
    }

    const newOrder = new Order({
      userId,
      items,
      subtotal,
      shipping,
      total,
      paymentId,
      status: "Pending", // you could change this to 'Paid' if payment is confirmed
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ---------------- Get all orders for a user ----------------
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Optional: Get all orders (admin)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
