import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  addTocart, 
  deleteFromCart, 
  updateQuantity, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} from "../redux/cartslice";

import { Link } from "react-router-dom";
import "./Cartpage.css";
import PaymentButton from "./PaymentButton";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart.cartitems);

  // Convert ₹string to number safely
  const getPrice = (priceString) => Number(priceString.replace(/₹/g, "").trim());

  // Calculate subtotal
  const subtotal = cartitems.reduce(
    (acc, item) => acc + getPrice(item.price) * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 100 : 0;
  const total = subtotal + shipping;

  return (
    <div className="container my-5 cart-container">
      <h2 className="text-center mb-4">🛒 Your Shopping Cart</h2>

      {cartitems.length === 0 ? (
        <div className="text-center py-5">
          <h4>Your cart is empty</h4>
          <p className="text-muted">Add some items to your cart to continue shopping.</p>
          <Link to="/" className="btn btn-primary mt-3">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          {/* Cart Items List */}
          <div className="col-md-8">
            <div className="card shadow-sm p-3 mb-4">
              {cartitems.map((item) => (
                <div
                  className="d-flex align-items-center justify-content-between border-bottom py-3"
                  key={item.id}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="cart-item-img me-3"
                    />
                    <div>
                      <h6 className="mb-1">{item.title}</h6>
                      <p className="text-muted small mb-1">{item.subtitle}</p>
                      <p className="fw-bold text-success mb-0">{item.price}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center">
                   <button
  className="btn btn-outline-secondary btn-sm me-2"
  onClick={() => dispatch(decreaseQuantity(item.id))}
  disabled={item.quantity <= 1}
>
  −
</button>

                    <span className="fw-bold">{item.quantity}</span>
                    <button
  className="btn btn-outline-secondary btn-sm"
  onClick={() => dispatch(increaseQuantity(item.id))}
>
  +
</button>

                    <button
                      className="btn btn-danger btn-sm ms-3"
                      onClick={() => dispatch(deleteFromCart(item))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-md-4">
            <div className="card shadow-sm p-4">
              <h5 className="mb-3">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              
              <PaymentButton amount={total} />
              <Link to="/" className="btn btn-outline-primary w-100 mt-2">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
