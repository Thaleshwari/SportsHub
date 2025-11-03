// 🌐 Dependencies
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import Stripe from "stripe";

// 🧩 Routes
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

// 🚀 Initialize app
const app = express();
const port = process.env.PORT || 5055;

// 🧩 Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// 🗄️ MongoDB setup
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("SportsEquipment");
    console.log("✅ Connected to MongoDB");

    // Optional: You can export collections here if needed
    app.locals.usersCollection = db.collection("user");
    app.locals.ordersCollection = db.collection("orders");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}

connectDB();

// 💳 Example Stripe setup (you can remove if not using now)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 🧭 Routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// 🧪 Health check endpoint
app.get("/", (req, res) => {
  res.send("🏏 SportsHub backend running successfully!");
});

// 🚀 Start Server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
