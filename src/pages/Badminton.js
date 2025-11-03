import React, { useState } from 'react';
import './Badminton.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTocart, deleteFromCart } from '../redux/cartslice';
import { useNavigate } from "react-router-dom"; 

import card1 from '../images/badminton/Net.jpg';
import card2 from '../images/badminton/shuttle cock.jpg';
import card3 from '../images/badminton/yonex net.jpg';
import card4 from '../images/badminton/Racket.jpg';
import card5 from '../images/kitbag.jpg';
import card6 from '../images/badminton/grip.jpg';
import card7 from '../images/badminton/string.jpg';
import card8 from '../images/badminton/shoe.jpg';

const Badminton = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart.cartitems);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const addCart = (item) => dispatch(addTocart(item));
  const deleteCart = (item) => dispatch(deleteFromCart(item));

  const products = [
    { id: 301, img: card1, title: "Badminton Net", subtitle: "Durable nylon badminton net with reinforced edges for indoor/outdoor use.", price: "₹499", quantity:1 },
    { id: 302, img: card2, title: "Feather Shuttlecock", subtitle: "Premium feather shuttlecock with excellent flight stability for professional play.", price: "₹399", quantity:1 },
    { id: 303, img: card3, title: "Yonex Badminton Net", subtitle: "Official Yonex synthetic net designed for tournament-level play.", price: "₹699", quantity:1 },
    { id: 304, img: card4, title: "Badminton Racket", subtitle: "Carbon fiber frame with balanced weight for all-level players.", price: "₹1299", quantity:1 },
    { id: 305, img: card5, title: "Badminton Kit Bag", subtitle: "Spacious and durable badminton kit bag with multi-compartments and shoulder straps.", price: "₹1299", quantity:1 },
    { id: 306, img: card6, title: "Racket Grip", subtitle: "Anti-slip racket grip with moisture absorption for better control.", price: "₹199", quantity:1 },
    { id: 307, img: card7, title: "Racket Strings", subtitle: "High-tension strings for power shots and long-lasting durability.", price: "₹299", quantity:1 },
    { id: 308, img: card8, title: "Badminton Shoes", subtitle: "High-impact shoes with toe protection and breathable mesh for extended matches.", price: "₹1699", quantity:1 }
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
      <div className="hero-section-badminton">
        <div className="hero-content-badminton">
          <h1 className="display-4">Explore the World of Badminton</h1>
          <p className="lead">
            Whether you're a beginner or a pro, gear up with high-quality rackets, shoes, and accessories designed to boost your performance. Find the perfect equipment that matches your playing style and level.
          </p>
          <a href="#featured" className="btn btn-danger btn-lg mt-3">Explore Now</a>
        </div>
      </div>

      <div className="container mt-4">
        <input
          type="text"
          placeholder="Search products by name..."
          className="form-control mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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

          {filteredProducts.length === 0 && (
            <p className="text-center">No products found matching "{searchTerm}"</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Badminton;
