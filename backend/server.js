// server.js
import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ------------------ Middleware ------------------
app.use(cors());
app.use(express.json());

// ------------------ MongoDB Setup ------------------
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ------------------ Schemas ------------------

// User schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    dob: { type: String },
    gender: { type: String },
    sports: { type: [String], default: [] },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

// Order schema
const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        title: String,
        price: Number,
        quantity: Number,
        img: String,
      },
    ],
    subtotal: Number,
    shipping: Number,
    total: Number,
    paymentId: String,
    status: { type: String, default: "Paid" },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);

// ------------------ Razorpay Setup ------------------
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ Razorpay credentials missing in .env");
  process.exit(1);
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ------------------ Routes ------------------

// Test route
app.get("/", (req, res) => res.send("✅ Server is running"));

// ------------------ User Registration ------------------
app.post("/upload", async (req, res) => {
  try {
    const userData = req.body;
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser)
      return res.status(400).json({ error: "Email already registered" });

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (err) {
    console.error("❌ Error in /upload:", err);
    res.status(500).json({ error: "Server error. Try again later." });
  }
});

// ------------------ User Login ------------------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.password !== password)
      return res.status(401).json({ error: "Invalid password" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("❌ Error in /login:", err);
    res.status(500).json({ error: "Server error. Try again later." });
  }
});

// ------------------ Create Razorpay Order ------------------
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const options = {
      amount: Math.round(Number(amount) * 100), // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(201).json({
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (err) {
    console.error("❌ Error in /create-order:", err);
    res.status(500).json({ error: err.message });
  }
});

// ------------------ Save Order (after successful payment) ------------------
app.post("/api/orders/create", async (req, res) => {
  try {
    const { userId, items, subtotal, shipping, total, paymentId } = req.body;

    if (!userId) return res.status(400).json({ error: "userId is required" });
    if (!items || items.length === 0)
      return res.status(400).json({ error: "Items are required" });

    const order = new Order({
      userId,
      items,
      subtotal,
      shipping,
      total,
      paymentId,
      status: "Paid",
    });

    const savedOrder = await order.save();
    res.status(201).json({
      success: true,
      message: "Order saved successfully",
      order: savedOrder,
    });
  } catch (err) {
    console.error("❌ Error saving order:", err);
    res.status(500).json({ error: err.message });
  }
});

// ------------------ Fetch all orders ------------------
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: err.message });
  }
});

// ------------------ Fetch user-specific orders ------------------
app.get("/orders/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!orders.length)
      return res.status(404).json({ message: "No orders found for this user" });

    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching user orders:", err);
    res.status(500).json({ error: err.message });
  }
});

// ------------------ Start Server ------------------
const PORT = process.env.PORT || 5055;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
