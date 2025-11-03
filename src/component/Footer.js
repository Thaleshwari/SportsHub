import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div>
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            
            <div className="col-md-6 mb-4">
              <div className="mb-3 d-flex align-items-start">
                <i className="bi bi-geo-alt-fill fs-4 bg-secondary text-white rounded-circle p-2 me-1"></i>
                <div>
                  <p className="mb-0">6/23,RR Nagar</p>
                  <strong>Coimbatore</strong>
                </div>
              </div>
              <div className="mb-3 d-flex align-items-start">
                <i className="bi bi-telephone-fill fs-4 bg-secondary text-white rounded-circle p-2 me-1"></i>
                <div>
                  <strong>+91 9345186147</strong>
                </div>
              </div>
              <div className="mb-3 d-flex align-items-start">
                <i className="bi bi-envelope-fill fs-4 bg-secondary text-white rounded-circle p-2 me-1"></i>
                <div>
                  <div>sportshubofficial@gmail.com</div>
                </div>
              </div>
            </div>
      
            
            <div className="col-md-6">
              <h5 className="fw-bold">About the company</h5>
              <p >
              SportsHub is a modern e-commerce platform that provides sports enthusiasts with an easy and secure way to shop for high-quality sports equipment. 
              </p><br/><br/>
              <div className="d-flex gap-2">
                <a href="#" className="btn btn-secondary rounded-1"><i className="bi bi-facebook"></i></a>
                <a href="#" className="btn btn-secondary rounded-1"><i className="bi bi-twitter"></i></a>
                <a href="#" className="btn btn-secondary rounded-1"><i className="bi bi-linkedin"></i></a>
                <a href="#" className="btn btn-secondary rounded-1"><i className="bi bi-github"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
