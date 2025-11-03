import React, { useState } from 'react';
import './Cricket.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTocart, deleteFromCart } from '../redux/cartslice';
import { useNavigate } from "react-router-dom"; 

import card1 from '../images/tshirt.jpg';
import card2 from '../images/cricket/cricket bat.jpg';
import card3 from '../images/cricket/cricket ball.jpg';
import card4 from '../images/cricket/gloves.jpg';
import card5 from '../images/cricket/helmet.jpg';
import card6 from '../images/cricket/leg guard.jpg';
import card7 from '../images/cricket/bag.jpg';
import card8 from '../images/cricket/shoe.jpg';

const Cricket = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart.cartitems);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const addCart = (item) => dispatch(addTocart(item));
  const deleteCart = (item) => dispatch(deleteFromCart(item));

  const products = [
    { id: 201, img: card1, title: "Sports T-Shirt", subtitle: "Breathable, lightweight dry-fit T-shirt for workouts and outdoor use.", price: 599, quantity:1 },
    { id: 202, img: card2, title: "Professional Cricket Bat", subtitle: "English willow bat with anti-scorch facing.", price: 3499, quantity:1 },
    { id: 203, img: card3, title: "Leather Cricket Ball", subtitle: "Hand-stitched red leather cricket ball for matches.", price: 349, quantity:1 },
    { id: 204, img: card4, title: "Batting Gloves", subtitle: "Comfort-fit gloves with high-density padding.", price: 99, quantity:1 },
    { id: 205, img: card5, title: "Protective Helmet", subtitle: "Durable helmet with strong grill and shock absorption.", price: 2299, quantity:1 },
    { id: 206, img: card6, title: "Cricket Leg Guard", subtitle: "Lightweight leg guard with double straps for protection.", price: 1099, quantity:1 },
    { id: 207, img: card7, title: "Cricket Kit Bag", subtitle: "Spacious cricket kit bag with wheel support and extra pockets.", price: 1599, quantity:1 },
    { id: 208, img: card8, title: "Cricket Shoes", subtitle: "High-impact cricket shoes with outdoor studs & breathable overlay—perfect for enhanced grip.", price: 2299, quantity:1 }
  ];

  const handleBuyNow = (item) => {
    if (!cartitems.find((cartItem) => cartItem.id === item.id)) {
      dispatch(addTocart(item));
    }
    navigate("/Cart");
  };

  // Filter products by search term
  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="hero-section-cricket">
        <div className="hero-content-cricket">
          <h1 className="display-4">🏏 Play Like a Pro,<br />Gear Up Like a Legend</h1>
          <p className="lead">Discover top-quality cricket bats, balls, gloves, and more.</p>
          <a href="#featured" className="btn btn-danger btn-lg mt-3">Explore Now</a>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mt-4">
        <div className="search-bar">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
        </div>
      </div>

      <h3 id="featured" className="text-center my-4">🛍️ Featured Products</h3>

      <div className="container mt-5">
        <div className="row">
          {filteredProducts.map((item) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
              <div className="card border shadow">
                <img src={item.img} className="card-img-top" alt={item.title} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text text-muted">{item.subtitle}</p>
                  <p className="fw-bold text-success">₹{item.price}</p>
                  <div className="d-flex justify-content-between">
                    {user ? (
                      <>
                        <button className="btn btn-primary btn-sm" onClick={() => handleBuyNow(item)}>Buy Now</button>
                        {cartitems.find((cartItem) => cartItem.id === item.id) ? (
                          <button className="btn btn-danger btn-sm" onClick={() => deleteCart(item)}>Remove</button>
                        ) : (
                          <button className="btn btn-danger btn-sm" onClick={() => addCart(item)}>Add to Cart</button>
                        )}
                      </>
                    ) : (
                      <a href="/login" className="btn btn-warning btn-sm">Login to Buy</a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p className="text-center">No products found for "{searchTerm}"</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cricket;
