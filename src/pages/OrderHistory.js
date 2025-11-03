import React, { useEffect, useState } from "react";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?._id) return;

        const response = await fetch(
          `http://localhost:5055/orders/user/${user._id}` // ✅ your backend route
        );

        if (!response.ok) {
          if (response.status === 404) {
            setOrders([]); // No orders found
            return;
          }
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();

        // Format orders safely
        const formattedOrders = data.map((order) => ({
          ...order,
          items: order.items?.map((item) => ({
            title: item.title || "Item",
            price: Number(item.price) || 0,
            quantity: Number(item.quantity) || 1,
            img: item.img || "https://via.placeholder.com/50",
          })) || [],
          subtotal: Number(order.subtotal) || 0,
          shipping: Number(order.shipping) || 0,
          total: Number(order.total) || Number(order.amount) / 100, // fallback for Razorpay-only orders
          status: order.status || "Pending",
        }));

        setOrders(formattedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user?._id]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">📦 Order History</h2>

      {orders.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No orders found.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div className="card p-3 mb-4 shadow-sm" key={order._id}>
            <h5>Order ID: {order._id}</h5>
            <p className="text-muted">
              Date: {new Date(order.createdAt).toLocaleString()}
            </p>
            <p>
              Status:{" "}
              <span
                className={`badge ${
                  order.status.toLowerCase() === "processing"
                    ? "bg-warning"
                    : order.status.toLowerCase() === "completed"
                    ? "bg-success"
                    : "bg-secondary"
                }`}
              >
                {order.status}
              </span>
            </p>
            <hr />

            {order.items.length === 0 ? (
              <p className="text-muted">No items in this order</p>
            ) : (
              order.items.map((item, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.img}
                      alt={item.title}
                      width="50"
                      className="me-3 rounded"
                    />
                    <div>
                      <p className="mb-0 fw-bold">{item.title}</p>
                      <small className="text-muted">
                        ₹{item.price} × {item.quantity} = ₹
                        {item.price * item.quantity}
                      </small>
                    </div>
                  </div>
                </div>
              ))
            )}

            <hr />
            <div className="d-flex justify-content-between">
              <span>Subtotal:</span>
              <strong>₹{order.subtotal}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <span>Shipping:</span>
              <strong>₹{order.shipping}</strong>
            </div>
            <div className="d-flex justify-content-between fw-bold mt-2">
              <span>Total:</span>
              <span>₹{order.total}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
