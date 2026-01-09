import './App.css'

function App() {
  return (
    <div className="page">
      <header className="top-nav">
        <div className="brand">ICONS</div>
        <nav className="nav-links">
          <a href="#shop">SHOP</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <div className="nav-actions">
          <button className="icon-button" type="button" aria-label="Search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </button>
          <button className="icon-button" type="button" aria-label="Cart">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 7h12l-1.4 10H7.4L6 7z" />
              <path d="M9 7V6a3 3 0 0 1 6 0v1" />
            </svg>
          </button>
        </div>
      </header>

      <main className="hero">
        <p className="hero-eyebrow">Wear the statement.</p>
        <h1 className="hero-title">ICONS</h1>
        <p className="hero-subtitle">
          Crafted essentials that move with you, wherever the night takes you.
        </p>
        <button className="hero-cta" type="button">
          SHOP NOW
        </button>
      </main>

      <footer className="footer">
        <div className="footer-columns">
          <div className="footer-column">
            <h3>CUSTOMER CARE</h3>
            <ul>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#returns">Shipping &amp; Returns</a>
              </li>
              <li>
                <a href="#support">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>COMPANY</h3>
            <ul>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>FOLLOW US</h3>
            <div className="social-icons">
              <a href="https://instagram.com" aria-label="Instagram">
                <span>◉</span>
              </a>
              <a href="https://twitter.com" aria-label="X">
                <span>◎</span>
              </a>
            </div>
          </div>
        </div>
        <p className="footer-note">© 2024 ICONS. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
