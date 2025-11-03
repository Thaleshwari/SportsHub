import React from 'react';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTocart, deleteFromCart } from '../redux/cartslice';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; 

// import all images...
import img1 from '../images/caro1.png'
import caro2 from '../images/caro2.png'
import caro3 from '../images/img.png'
import card1 from '../images/tshirt.jpg'
import card2 from '../images/shorts.jpg'
import card3 from '../images/kitbag.jpg'
import card4 from '../images/Tennis/shoe.jpg'
import card5 from '../images/Tennis/racket.jpg'
import card6 from '../images/badminton/Racket.jpg'
import card7 from '../images/cricket/gloves.jpg'
import card8 from '../images/cricket/cricket ball.jpg'
import card9 from '../images/cricket/cricket bat.jpg'
import card10 from '../images/cricket/helmet.jpg'
import card11 from '../images/cricket/leg guard.jpg'
import card12 from '../images/cricket/bag.jpg'
import card13 from '../images/cricket/shoe.jpg'
import card14 from '../images/badminton/Net.jpg'
import card15 from '../images/badminton/shuttle cock.jpg'
import card16 from '../images/badminton/yonex net.jpg'
import card17 from '../images/badminton/grip.jpg'
import card18 from '../images/badminton/string.jpg'
import card19 from '../images/badminton/shoe.jpg'
import card20 from '../images/accessories/kneeband.jpg'
import card21 from '../images/accessories/resistance bands.webp'
import card22 from '../images/accessories/wrist band.jpg'
import card23 from '../images/Tennis/ball.jpg'
import card24 from '../images/Tennis/grip.jpg'
import card25 from '../images/Tennis/net.jpg'
import card26 from '../images/Tennis/shoe.jpg'
import card27 from '../images/Tennis/training aid.jpg'




import customer1 from '../images/review1.jpg'
import customer2 from '../images/review2.jpg'
import customer3 from '../images/review3.jpg'
import customer4 from '../images/review4.jpg'

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart.cartitems);
 const navigate = useNavigate(); 
  const addCart = (item) => dispatch(addTocart(item));
  const deleteCart = (item) => dispatch(deleteFromCart(item));

  const products = [
    {
        id:1,
        img: card1,
        title: "Sports T-Shirt",
        subtitle:"Breathable, lightweight dry-fit T-shirt for workouts and outdoor use.",
        price:"₹599",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1
      },
      {
        id:2,
        img: card2,
        title: "Athletic Shorts",
        subtitle:"Elastic-fit shorts with quick-dry technology, perfect for sports.",
        price:"₹499",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1

      },
      {
        id:3,
        img: card3,
        title: "Sports Kit Bag",
        subtitle:"Spacious and durable kit bag with multiple compartments.",
        price:"₹1199",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1
      },
      {
        id:4,
        img: card4,
        title: "Tennis Shoes",
        subtitle:"Comfortable and grippy shoes ideal for tennis and training.",
        price:"₹2499",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1
      },
      {
        id:5,
        img: card5,
        title: "Tennis Racket",
        subtitle:"Lightweight graphite racket for powerful swings and control.",
        price:"₹3999",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1
      },
      {
        id:6,
        img: card6,
        title: "Badminton Racket",
        subtitle:"Carbon fiber frame with balanced weight for all-level players.",
        price:"₹1299",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1
      },
      {
        id:7,
        img: card7,
        title: "Cricket Gloves",
        subtitle:"High-protection gloves with superior grip and padding.",
        price:"₹899",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1
      },
      {
        id:8,
        img: card8,
        title: "Cricket Ball",
        subtitle:"Premium leather cricket ball suitable for matches and practice.",
        price:"₹349",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1
      },
      {
        id:9,
        img: card9,
        title: "Professional Cricket Bat",
        subtitle:"English willow bat with anti-scorch facing.",
        price:"₹3499",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1
      },
      {
        id:10,
        img: card10,
        title: "Protective Helmet",
        subtitle:"Durable helmet with strong grill and shock absorption.",
        price:"₹2299",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1
      },
      {
        id:11,
        img: card11,
        title: "Cricket Leg Guard",
        subtitle:"Lightweight leg guard with double straps for protection.",
        price:"₹1099",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1
      },
      {
        id:12,
        img: card12,
        title: "Cricket Kit Bag",
        subtitle:"Spacious cricket kit bag with wheel support and extra pockets.",
        price:"₹1599",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1
      },

      {
        id:13,
        img: card13,
        title: "Cricket Shoes",
        subtitle:"High-impact cricket shoes with outdoor studs & breathable overlay—perfect for enhanced grip.",
        price:"₹2299",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1
      },
      {
        id:14,
        img: card14,
        title: "Badminton Net",
        subtitle:"Durable nylon badminton net with reinforced edges for indoor/outdoor use.",
        price:"₹499",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1
      },
      {
        id:15,
        img: card15,
        title: "Feather Shuttlecock",
        subtitle:"Premium feather shuttlecock with excellent flight stability for professional play.",
        price:"₹399",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1
      },
      {
        id:16,
        img: card16,
        title: "Yonex Badminton Net",
        subtitle:"Official Yonex synthetic net designed for tournament-level play.",
        price:"₹699",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1
      },
      {
        id:17,
        img: card17,
        title: "Racket Grip",
        subtitle:"Anti-slip racket grip with moisture absorption for better control.",
        price:"₹199",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1
      },
      {
        id:18,
        img: card18,
        title: "Racket Strings",
        subtitle:"High-tension strings for power shots and long-lasting durability.",
        price:"₹299",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1
      },

      {
        id:19,
        img: card19,
        title: "Badminton Shoes",
        subtitle:"High-impact shoes with toe protection and breathable mesh for extended matches.",
        price:"₹1699",
        buy:"Buy Now",
        add:"Add to Cart",
        quantity:1
      },{
  id:20,
 img: card20,
 title: "Knee Support Band",
 subtitle:"Comfortable and flexible knee band for joint support during workouts and recovery.",
 price:"₹299",
 buy:"Buy Now",
 add:"Add to Cart",
quantity:1
},
{
  id:21,
 img: card21,
 title: "Resistance Bands Set",
 subtitle:"Breathable, lightweight dry-fit T-shirt for workouts and outdoor use.",
 price:"₹599",
 buy:"Buy Now",
 add:"Add to Cart",
 quantity:1
},
{
  id:22,
 img: card22,
 title: "Sweat Wrist Band",
 subtitle:"Soft, absorbent wristband to keep sweat away while running, gymming, or playing.",
 price:"₹299",
 buy:"Buy Now",
 add:"Add to Cart",
 quantity:1
},
{
  id: 23,
  img: card23,
  title: "Tennis Ball",
  subtitle: "High-quality tennis balls for consistent bounce and durability.",
  price: "₹399",
  buy: "Buy Now",
  add: "Add to Cart",
 quantity:1
},
{
  id: 24,
  img: card24,
  title: "Tennis Grip",
  subtitle: "Comfortable and anti-slip grip for better racket control.",
  price: "₹199",
  buy: "Buy Now",
  add: "Add to Cart",
 quantity:1
},
{
  id: 25,
  img: card25,
  title: "Tennis Net",
  subtitle: "Sturdy and weather-resistant tennis net for practice and matches.",
  price: "₹2499",
  buy: "Buy Now",
  add: "Add to Cart",
 quantity:1
},
{
  id: 26,
  img: card26,
  title: "Racket Shoe",
  subtitle: "Lightweight, cushioned shoes designed for agility on the court.",
  price: "₹1799",
  buy: "Buy Now",
  add: "Add to Cart",
 quantity:1
},
{
  id: 27,
  img: card27,
  title: "Training Aids",
  subtitle: "Essential tools to improve your tennis techniques and fitness.",
  price: "₹999",
  buy: "Buy Now",
  add: "Add to Cart",
 quantity:1
}


];
 const handleBuyNow = (item) => {
    // Add item to cart if not already in cart
    if (!cartitems.find((cartItem) => cartItem.id === item.id)) {
      dispatch(addTocart(item));
    }
    // Redirect to Cart page
    navigate("/Cart");
  };
  return (
    <div>
      {/* Hero Section */}
      
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="display-4">Shop Smart. Play Strong.</h1>
          <p className="lead">Affordable, durable, and ready for action.</p>
          <a href="#featured" className="btn btn-danger btn-lg mt-3">Explore Now</a>

        </div>
      </div>

      

      {/* Carousel and Promo Text */}
      <div className="container my-1">
        <div className="row align-items-center gx-1">
          <div className="col-md-7">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
              <div className="carousel-inner">
                <div className="carousel-item active"><img src={img1} className="d-block w-100" alt="slide1" /></div>
                <div className="carousel-item"><img src={caro2} className="d-block w-100" alt="slide2" /></div>
                <div className="carousel-item"><img src={caro3} className="d-block w-100" alt="slide3" /></div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev"data-bs-interval="3000">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next"data-bs-interval="3000">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
              </button>
            </div>
          </div>



          <div className="col-md-5">
            <div className="text-container">
              <h2 className="mb-3">Shop Quality Sports Gear</h2>
              <p>Upgrade your performance with top-tier sports equipment...</p>
              <ul>
                <li>Branded</li>
                <li>Limited Stocks</li>
                <li>Special Offers</li>
                <li>High quality</li>
                <li>More varieties</li>
              </ul>
              <a href="#" className="btn btn-danger mt-3">Explore Now</a>
              <br/><br/><br/>
              {/* <div className="container-fluid service-section mt-5">
        <div className="container">
          <div className="row text-center align-items-center">
            <div className="col-md-3"><i className="bi bi-patch-check-fill service-icon"></i><div>100% AUTHENTIC</div></div>
            <div className="col-md-3"><i className="bi bi-shield-lock-fill service-icon"></i><div>SECURE SHOPPING</div></div>
            <div className="col-md-3"><i className="bi bi-truck service-icon"></i><div>EXPRESS SHIPPING</div></div>
            <div className="col-md-3"><i className="bi bi-joystick service-icon"></i><div>CUSTOMIZED SERVICES</div></div>
          </div>
        </div>
      </div> */}
            </div>
          </div>
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

     

      
     <div className="review-image">
      <div className="container my-5">
        <h2 className="text-center mb-4">Customer Reviews</h2>
        <div id="reviewCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            
            
            <div className="carousel-item active">
              <div className="row">
                <div className="col-md-6 d-flex flex-column align-items-center text-center">
                  <img src={customer1} className="rounded-circle customer-img" alt="customer1" />
                  <h5 className="mt-3">Surya</h5>
                  <div className="star-rating mb-2">⭐⭐⭐⭐⭐</div>
                  <p className="review-text">"Amazing service! The quality exceeded my expectations. Highly recommend."</p>
                </div>
                <div className="col-md-6 d-flex flex-column align-items-center text-center">
                  <img src={customer2} className="rounded-circle customer-img" alt="customer2" />
                  <h5 className="mt-3">Rahul Verma</h5>
                  <div className="star-rating mb-2">⭐⭐⭐⭐</div>
                  <p className="review-text">"Very friendly staff and fast delivery. Will definitely shop again!"</p>
                </div>
              </div>
            </div>

           
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-6 d-flex flex-column align-items-center text-center">
                  <img src={customer3} className="rounded-circle customer-img" alt="customer3" />
                  <h5 className="mt-3">Priya</h5>
                  <div className="star-rating mb-2">⭐⭐⭐⭐⭐</div>
                  <p className="review-text">"A smooth and satisfying experience. I'm very happy with the purchase."</p>
                </div>
                <div className="col-md-6 d-flex flex-column align-items-center text-center">
                  <img src={customer4} className="rounded-circle customer-img" alt="customer4" />
                  <h5 className="mt-3">Karan Mehta</h5>
                  <div className="star-rating mb-2">⭐⭐⭐⭐⭐</div>
                  <p className="review-text">"Top-notch quality and excellent customer support. Five stars!"</p>
                </div>
              </div>
            </div>

          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#reviewCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#reviewCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;

