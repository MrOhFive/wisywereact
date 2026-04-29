import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // for the carousel and mobile navbar

// --- Food options ---
const MENU_ITEMS = [
  { id: 'Munchies', name: 'Munchies', desc: 'Extra small -- The smallest of platers provided.', price: 5.00 },
  { id: 'Semi-Hungry', name: 'Semi-Hungry', desc: 'Small size plater.', price: 10.00 },
  { id: 'Hungry', name: 'Hungry', desc: 'Medium size plater.', price: 30.00 },
  { id: 'Craving', name: 'Craving', desc: 'Large -- The price depends on your income -- otherwise default will be the debt of our country. Recommend bring in your W2.', price: 39047057000000.00 }
];

const IMAGES = [
  "pics/chip.jpg", "pics/hamberger.jpg", "pics/salad.jpg", 
  "pics/soup.jpg", "pics/seafood.jpg", "pics/plate.jpg"
];

// --- main app---
export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart Logic
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === itemId);
      if (existing.quantity === 1) {
        return prevCart.filter((i) => i.id !== itemId);
      }
      return prevCart.map((i) => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  const clearCart = () => setCart([]);
  
  const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      {/* nav */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container-fluid px-4">
          <a className="navbar-brand text-danger fw-bold" href="#home">🍽️ what I serve YOU will EAT(wisywe)</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#menu">Menu</a></li>
              <li className="nav-item"><a className="nav-link" href="#gallery">Gallery</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <button className="btn btn-outline-danger fw-bold" onClick={() => setIsCartOpen(true)}>
                  Cart ({cartTotalCount})
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero banner */}
      <header id="home" className="position-relative d-flex align-items-center justify-content-center" style={{ height: '100vh', backgroundImage: "url('pics/hero-banner.jpg')", backgroundColor: '#2c3e50', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="bg-white p-5 rounded shadow text-center mx-3" style={{ maxWidth: '600px' }}>
          <h1 className="display-5 text-danger fw-bold">what I serve YOU will EAT</h1>
          <p className="lead mb-0">Don't think you came here thinking you have a choice.</p>
        </div>
      </header>

      {/* About */}
      <section id="about" className="container py-5 text-center">
        <div className="row justify-content-center pt-5">
          <div className="col-lg-8">
            <h2 className="display-4 text-danger mb-4">Our Story</h2>
            <p className="fs-5">
              We serve only the finest of cuisines. But you don't get to pick what. If you come here: you will be reminded of the privilege that make-your-own places provides, think back "You know, maybe my parents weren't so hard on me with food after all.", and leave with a smile on your face because of no tip screen. You might ask why... well... this place does you NO service!!! Please come back again with more money and less opinion on hunger :D
            </p>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="bg-white py-5 text-center">
        <div className="container pt-5">
          <h2 className="display-4 text-danger mb-5">Our Menu</h2>
          <div className="row g-4">
            {MENU_ITEMS.map((item) => (
              <div key={item.id} className="col-12 col-md-6 col-lg-3">
                <div className="card h-100 shadow-sm border-0 pt-4 pb-5 px-3 position-relative transition-hover">
                  <h3 className="text-danger h4">{item.name}</h3>
                  <p className="card-text text-muted flex-grow-1">{item.desc}</p>
                  <p className="fs-4 text-secondary fw-bold">
                    ${item.id === 'Craving' ? '(?)' : item.price.toFixed(2)}
                  </p>
                  <div className="position-absolute bottom-0 start-50 translate-middle-x w-100 pb-3 px-3">
                    <button className="btn btn-danger w-100 rounded-pill" onClick={() => addToCart(item)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart */}
      {isCartOpen && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Your Shopping Cart</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setIsCartOpen(false)}></button>
              </div>
              <div className="modal-body p-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted fs-5 my-4">Your cart is currently empty.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Item</th>
                          <th>Price</th>
                          <th className="text-center">Qty</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td className="text-center">{item.quantity}</td>
                            <td className="text-center">
                              <button className="btn btn-sm btn-outline-danger me-2" onClick={() => removeFromCart(item.id)}>-</button>
                              <button className="btn btn-sm btn-outline-success" onClick={() => addToCart(item)}>+</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div className="modal-footer bg-light justify-content-between">
                <h4 className="mb-0">Total: ${cartTotalPrice.toFixed(2)}</h4>
                <div>
                  <button className="btn btn-outline-danger me-2" onClick={clearCart}>Clear Cart</button>
                  <button className="btn btn-success" onClick={() => alert('Proceeding to checkout!')}>Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery (switched to carousel from bootstrap for simplicty) */}
      <section id="gallery" className="bg-secondary py-5 text-center text-white">
        <div className="container pt-5 pb-4">
          <h2 className="display-4 mb-5">Gallery</h2>
          <div className="mx-auto" style={{ maxWidth: '800px' }}>
            <div id="restaurantCarousel" className="carousel slide shadow rounded overflow-hidden" data-bs-ride="carousel">
              <div className="carousel-inner" style={{ height: '400px' }}>
                {IMAGES.map((imgSrc, index) => (
                  <div key={index} className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}>
                    <img src={imgSrc} className="d-block w-100 h-100" style={{ objectFit: 'cover' }} alt={`Gallery ${index + 1}`} />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#restaurantCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon bg-dark rounded p-3" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#restaurantCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon bg-dark rounded p-3" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section id="contact" className="bg-white py-5">
        <div className="container pt-5">
          <h2 className="display-4 text-danger text-center mb-5">Contact Us</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <form className="p-4 border rounded shadow-sm h-100" onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <input type="text" className="form-control form-control-lg" placeholder="Your Name" required />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control form-control-lg" placeholder="Your Email" required />
                </div>
                <div className="mb-3">
                  <textarea className="form-control form-control-lg" rows="4" placeholder="Your Message" required></textarea>
                </div>
                <button type="submit" className="btn btn-danger btn-lg w-100">Send Message</button>
              </form>
            </div>
            <div className="col-md-6">
              <div className="rounded overflow-hidden shadow-sm h-100" style={{ minHeight: '300px' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1609.140837591697!2d-73.9654172058638!3d40.76765328539826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258eb899f0889%3A0xb5e90aa7d877ee1f!2sHunter%20College!5e0!3m2!1sen!2sus!4v1773198991529!5m2!1sen!2sus"
                  title="Google Map"
                  style={{ width: '100%', height: '100%', border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy">
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <div className="container">
          <div className="mb-3">
            <a href="#!" className="text-white text-decoration-none mx-3 hover-warning">Facebook</a>
            <a href="#!" className="text-white text-decoration-none mx-3 hover-warning">Instagram</a>
            <a href="#!" className="text-white text-decoration-none mx-3 hover-warning">Twitter</a>
          </div>
          <p className="mb-1"><strong>Business Hours:</strong></p>
          <p className="mb-3">As long as you have your wallet (24/7)</p>
        </div>
      </footer>
    </div>
  );
}