import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartslice";
import { useNavigate } from "react-router-dom";

const PaymentButton = ({ amount }) => {
  const cartitems = useSelector((state) => state.cart.cartitems);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!cartitems.length) {
      alert("Your cart is empty!");
      return;
    }

    if (!user || !user._id) {
      alert("Please log in before making a purchase.");
      return;
    }

    setLoading(true);

    try {
      // ✅ Prepare cart data
      const orderItems = cartitems.map((item) => ({
        title: item.title,
        price: Number(item.price.toString().replace(/₹/g, "").trim()),
        quantity: item.quantity,
        img: item.img,
      }));

      const subtotal = orderItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );
      const shipping = subtotal > 0 ? 100 : 0;
      const total = subtotal + shipping;

      // ✅ Step 1: Create Razorpay order (Backend → /create-order)
      const res = await fetch("http://localhost:5055/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }), // amount in rupees
      });

      const data = await res.json();
      if (!res.ok || !data.id) {
        throw new Error(data.error || "Failed to create Razorpay order");
      }

      // ✅ Step 2: Setup Razorpay checkout
      const options = {
        key: "rzp_test_RbJCZxYxdMoPVS", // 🧪 your Razorpay test key
        amount: data.amount, // in paise
        currency: data.currency,
        name: "SportsHub",
        description: "Sports Equipment Purchase",
        order_id: data.id,
        handler: async function (response) {
          try {
            // ✅ Step 3: Save the order in your database
            const saveRes = await fetch("http://localhost:5055/api/orders/create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: user._id,
                items: orderItems,
                subtotal,
                shipping,
                total,
                paymentId: response.razorpay_payment_id,
              }),
            });

            const saveData = await saveRes.json();

            if (saveRes.ok) {
              alert("✅ Payment successful! Order saved.");
              dispatch(clearCart());
              navigate("/orders");
            } else {
              alert("⚠️ Payment succeeded but order not saved.");
              console.error("Order save failed:", saveData);
            }
          } catch (err) {
            console.error("Order save error:", err);
            alert("❌ Error saving order!");
          }
        },
        prefill: {
          name: user?.name || "Guest User",
          email: user?.email || "guest@example.com",
          contact: "9999999999",
        },
        theme: { color: "#007bff" },
        modal: {
          ondismiss: () => {
            alert("❌ Payment cancelled or closed by user.");
          },
        },
      };

      // ✅ Step 4: Open Razorpay checkout
      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("⚠️ Razorpay SDK failed to load. Please refresh the page.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("❌ Payment process failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn btn-success w-100 mt-3"
      onClick={handlePayment}
      disabled={loading}
    >
      {loading ? "Processing..." : `Pay ₹${amount}`}
    </button>
  );
};

export default PaymentButton;
