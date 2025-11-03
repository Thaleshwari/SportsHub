import React from 'react';
import './Accessories.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTocart, deleteFromCart } from '../redux/cartslice';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; 

import card1 from '../images/tshirt.jpg';
import card2 from '../images/shorts.jpg';
import card3 from '../images/accessories/kneeband.jpg';
import card4 from '../images/accessories/resistance bands.webp';
import card5 from '../images/accessories/wrist band.jpg';
import card6 from '../images/kitbag.jpg';

const Accessories = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart.cartitems);

  const addCart = (item) => dispatch(addTocart(item));
  const deleteCart = (item) => dispatch(deleteFromCart(item));

  const products = [
    {
      id: 101,
      img: card1,
      title: "Sports T-Shirt",
      subtitle: "Breathable, lightweight dry-fit T-shirt for workouts and outdoor use.",
      price: "₹599",
      buy: "Buy Now",
      add: "Add to Cart",
      quantity: 1
    },
    {
      id: 102,
      img: card2,
      title: "Athletic Shorts",
      subtitle: "Elastic-fit shorts with quick-dry technology, perfect for sports.",
      price: "₹499",
      buy: "Buy Now",
      add: "Add to Cart",
      quantity: 1
    },
    {
      id: 103,
      img: card3,
      title: "Knee Support Band",
      subtitle: "Comfortable and flexible knee band for joint support during workouts and recovery.",
      price: "₹299",
      buy: "Buy Now",
      add: "Add to Cart",
      quantity: 1
    },
    {
      id: 104,
      img: card4,
      title: "Resistance Bands Set",
      subtitle: "Durable, stretchable resistance bands for strength training at home or gym.",
      price: "₹599",
      buy: "Buy Now",
      add: "Add to Cart",
      quantity: 1
    },
    {
      id: 105,
      img: card5,
      title: "Sweat Wrist Band",
      subtitle: "Soft, absorbent wristband to keep sweat away while running, gymming, or playing.",
      price: "₹299",
      buy: "Buy Now",
      add: "Add to Cart",
      quantity: 1
    },
    {
      id: 106,
      img: card6,
      title: "Sports Kit Bag",
      subtitle: "Spacious and durable kit bag with multiple compartments.",
      price: "₹1199",
      buy: "Buy Now",
      add: "Add to Cart",
      quantity: 1
    }
  ];
const navigate = useNavigate();

  const handleBuyNow = (item) => {
    // Add item to cart if not already in cart
    if (!cartitems.find((cartItem) => cartItem.id === item.id)) {
      dispatch(addTocart(item));
    }
    // Redirect to Cart page
    navigate("/Cart");
  };
  return (
    <div className="accessoriesclass">
      <div className="hero-section-acc">
        <div className="hero-content-acc">
          <h1 className="display-4">🎒 Power Up Your Game <br />with <br />Premium Accessories</h1>
          <p className="lead">From gloves to gym bags, water bottles to wristbands,<br />get the gear that supports your performance.</p>
          <a href="#featured" className="btn btn-danger btn-lg mt-3">Explore Now</a>

        </div>
      </div>

      <h3 id="featured" className="text-center my-4">🛍️ Featured Products</h3>

      <div className="container mt-5">
        <div className="row">
          {products.map((item) => (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
        <div className="card border shadow">
          <img src={item.img} className="card-img-top" alt={item.title} />
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text text-muted">{item.subtitle}</p>
            <p className="fw-bold text-success">{item.price}</p>
            <div className="d-flex justify-content-between">
              {user ? (
                <>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleBuyNow(item)}
                  >
                    Buy Now
                  </button>
                  {cartitems.find((cartItem) => cartItem.id === item.id) ? (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteCart(item)}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => addCart(item)}
                    >
                      Add to Cart
                    </button>
                  )}
                </>
              ) : (
                <a href="/login" className="btn btn-warning btn-sm">
                  Login to Buy
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    ))}
        </div>
      </div>
    </div>
  );
};

export default Accessories;
