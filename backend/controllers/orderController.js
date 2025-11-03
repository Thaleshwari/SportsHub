import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, items, subtotal, shipping, total, paymentId } = req.body;
    const newOrder = new Order({
      userId,
      items,
      subtotal,
      shipping,
      total,
      paymentId,
      status: "Paid",
    });
    await newOrder.save();
    res.status(201).json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
