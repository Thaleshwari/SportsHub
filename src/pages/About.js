import React, { Component } from 'react'
import './About.css'
import img from '../images/aboutimg.jpg'
import { Link } from 'react-router-dom'

export class About extends Component {
  render() {
    return (
      <div>
        <section id="about" className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            
            <div className="col-md-6 mb-4 mb-md-0">
                <div className="overflow-hidden">
                  <img src={img}
                       className="img-fluid w-100 h-100 object-fit-cover rounded shadow"
                       alt="About Us"/>
                </div>
              </div>
    
           
            <div className="col-md-6">
              <h2 className="mb-4">🏆 About Our Store</h2>
              <p className="text-muted">
                Welcome to <strong>SportsHub</strong>, your trusted online store for high-quality sports equipment and fitness accessories. We believe that the right gear empowers every athlete — whether you're a beginner or a pro.
              </p>
              <p className="text-muted">
                From gym wear and resistance bands to professional kits and recovery tools, we provide premium products to enhance your performance, comfort, and safety.
              </p>
              <ul className="list-unstyled">
                <li>✔️ Top-notch Quality</li>
                <li>✔️ Affordable Pricing</li>
                <li>✔️ Fast & Secure Delivery</li>
                <li>✔️ 24/7 Customer Support</li>
              </ul>
              <Link to='/' className="btn btn-danger mt-3">Shop Now</Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    )
  }
}

export default About
