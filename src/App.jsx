<<<<<<< ours
=======
import { useEffect, useMemo, useState } from 'react'
>>>>>>> theirs
import './App.css'

const pages = {
  '/': {
    label: 'Inicio',
    title: 'ICONS',
    description: 'Alta moda nocturna con brillo controlado.',
  },
  '/tienda': {
    label: 'Tienda',
    title: 'Catálogo',
    description: 'Piezas hipnóticas, siluetas precisas y acabados de atelier.',
  },
  '/lookbook': {
    label: 'Lookbook',
    title: 'Lookbook',
    description: 'Visuales editoriales para inspirar la próxima caída.',
  },
  '/sobre': {
    label: 'Sobre ICONS',
    title: 'Sobre ICONS',
    description: 'Elegancia minimalista para una presencia inolvidable.',
  },
  '/contacto': {
    label: 'Contacto',
    title: 'Contacto',
    description: 'Agenda un fitting privado o consulta disponibilidad.',
  },
}

const getRoute = () => {
  const hash = window.location.hash.replace('#', '')
  if (!hash) return '/'
  return hash.startsWith('/') ? hash : `/${hash}`
}

function App() {
<<<<<<< ours
  return (
    <div className="page">
      <header className="top-nav">
        <div className="brand">ICONS</div>
        <nav className="nav-links">
          <a href="#shop">SHOP</a>

          <div className="nav-dropdown">
            <button className="nav-trigger" type="button" aria-haspopup="true">
              COLLECTIONS
            </button>
            <div className="nav-menu">
              <a href="#lookbook">LOOKBOOK</a>
              <a href="#atelier">ATELIER</a>
              <a href="#journal">JOURNAL</a>
            </div>
          </div>

          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </nav>

        <div className="nav-actions">
          <a className="icon-button" href="#shop" aria-label="Search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </a>

          <a className="icon-button" href="#contact" aria-label="Cart">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 7h12l-1.4 10H7.4L6 7z" />
              <path d="M9 7V6a3 3 0 0 1 6 0v1" />
            </svg>
          </a>
        </div>
      </header>

      <main className="hero">
        <p className="hero-eyebrow">Wear the statement.</p>
        <h1 className="hero-title">ICONS</h1>
        <p className="hero-subtitle">
          Crafted essentials that move with you, wherever the night takes you.
        </p>
        <a className="hero-cta" href="#shop">
          SHOP NOW
        </a>
      </main>

      <section className="shop" id="shop">
        <div className="section-head">
          <p>Curated essentials for the midnight wardrobe.</p>
          <h2>SHOP THE GALAXY</h2>
        </div>
        <div className="carousel">
          <article className="product-card" id="product-aurora">
            <div className="product-image image-aurora" />
            <div className="product-body">
              <div>
                <h3>Aurora Drape Coat</h3>
                <p>Fluid wool, sculpted lines, and a subtle metallic sheen.</p>
              </div>
              <div className="product-meta">
                <span>$980</span>
                <a className="product-action" href="#contact">
                  Reserve
                </a>
              </div>
            </div>
          </article>

          <article className="product-card" id="product-vanta">
            <div className="product-image image-vanta" />
            <div className="product-body">
              <div>
                <h3>Vanta Slip Dress</h3>
                <p>Silk satin cut to glow softly under city lights.</p>
              </div>
              <div className="product-meta">
                <span>$640</span>
                <a className="product-action" href="#contact">
                  Add to Cart
                </a>
              </div>
            </div>
          </article>

          <article className="product-card" id="product-orbit">
            <div className="product-image image-orbit" />
            <div className="product-body">
              <div>
                <h3>Orbit Tailored Set</h3>
                <p>Precision tailoring with hypnotic jacquard texture.</p>
              </div>
              <div className="product-meta">
                <span>$1,240</span>
                <a className="product-action" href="#contact">
                  Reserve
                </a>
              </div>
            </div>
          </article>

          <article className="product-card" id="product-mirror">
            <div className="product-image image-mirror" />
            <div className="product-body">
              <div>
                <h3>Mirrorline Knit</h3>
                <p>Soft merino with liquid-shine threads throughout.</p>
              </div>
              <div className="product-meta">
                <span>$420</span>
                <a className="product-action" href="#contact">
                  Add to Cart
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="story" id="lookbook">
        <div>
          <h2>LOOKBOOK</h2>
          <p>
            A hypnotic collection that blends deep shadows with starlit shimmer.
            Every piece is crafted to move like constellations across the body.
          </p>
          <a className="ghost-button" href="#shop">
            View the edit
          </a>
        </div>
        <div className="story-card">
          <p>Limited drop • Atelier edition • 120 pieces worldwide</p>
          <a className="ghost-button" href="#atelier">
            Enter Atelier
          </a>
        </div>
      </section>

      <section className="story" id="journal">
        <div>
          <h2>JOURNAL</h2>
          <p>
            Explore the rituals behind the ICONS silhouette, from atelier craft
            to nocturnal styling.
          </p>
        </div>
        <div className="story-card">
          <p>Seasonal guide • Capsule wardrobe • Fabric archives</p>
          <a className="ghost-button" href="#contact">
            Read stories
          </a>
        </div>
      </section>

      <section className="about" id="about">
        <div className="section-head">
          <p>Minimal. Elevated. Magnetic.</p>
          <h2>ABOUT ICONS</h2>
        </div>
        <div className="about-grid">
          <div>
            <h3>Atelier-grade craft</h3>
            <p>
              Every seam is calibrated for movement, while luminous trims echo
              the deep night sky.
            </p>
          </div>
          <div>
            <h3>Hypnotic materials</h3>
            <p>
              Custom jacquards and silk blends deliver a soft glow that reads
              differently in every light.
            </p>
          </div>
          <div>
            <h3>Limited releases</h3>
            <p>
              Each drop is curated to remain rare, with bespoke concierge
              fittings available on request.
            </p>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="section-head">
          <p>Private appointments and bespoke styling.</p>
          <h2>CONTACT</h2>
        </div>
        <div className="contact-card">
          <p>icons@atelier.com</p>
          <p>+1 (212) 555-0192</p>
          <a className="hero-cta" href="mailto:icons@atelier.com">
            Book a fitting
          </a>
        </div>
      </section>
=======
  const [route, setRoute] = useState(getRoute())
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [route])

  const navItems = useMemo(
    () =>
      Object.entries(pages).map(([path, page]) => ({
        path,
        label: page.label,
      })),
    []
  )

  const currentPage = pages[route] ?? pages['/']

  return (
    <div className="page">
      <header className="top-nav">
        <a className="brand" href="#/">
          ICONS
        </a>
        <button
          className="nav-toggle glass"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="menu"
        >
          Menú
          <span className="nav-toggle-icon" aria-hidden="true" />
        </button>
        <div className={`nav-menu ${menuOpen ? 'is-open' : ''}`} id="menu">
          {navItems.map((item) => (
            <a key={item.path} href={`#${item.path}`}>
              {item.label}
            </a>
          ))}
        </div>
      </header>

      {route === '/' ? (
        <main className="hero">
          <p className="hero-eyebrow">Alta costura nocturna</p>
          <h1 className="hero-title">ICONS</h1>
          <a className="hero-cta glass" href="#/tienda">
            Comprar ahora
          </a>
        </main>
      ) : (
        <main className="content">
          <header className="section-head">
            <p>{currentPage.description}</p>
            <h2>{currentPage.title}</h2>
          </header>

          {route === '/tienda' && (
            <section className="shop">
              <div className="carousel">
                {[
                  {
                    name: 'Abrigo Aurora',
                    desc: 'Lana líquida, brillo sutil y caída arquitectónica.',
                    price: '$980',
                    tone: 'image-aurora',
                  },
                  {
                    name: 'Vestido Vanta',
                    desc: 'Satinado hipnótico con ajuste al cuerpo.',
                    price: '$640',
                    tone: 'image-vanta',
                  },
                  {
                    name: 'Set Órbita',
                    desc: 'Jacquard de alto contraste con textura lunar.',
                    price: '$1,240',
                    tone: 'image-orbit',
                  },
                  {
                    name: 'Tejido Mirrorline',
                    desc: 'Merino suave con destellos micro metálicos.',
                    price: '$420',
                    tone: 'image-mirror',
                  },
                ].map((item) => (
                  <article className="product-card" key={item.name}>
                    <div className={`product-image ${item.tone}`}>
                      <span>Imagen IA</span>
                    </div>
                    <div className="product-body">
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.desc}</p>
                      </div>
                      <div className="product-meta">
                        <span>{item.price}</span>
                        <a className="product-action glass" href="#/contacto">
                          Reservar
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {route === '/lookbook' && (
            <section className="story">
              <div>
                <h3>Edición Estelar</h3>
                <p>
                  Editorial minimalista con sombras profundas y texturas de alto
                  contraste.
                </p>
                <a className="ghost-button glass" href="#/tienda">
                  Ver catálogo
                </a>
              </div>
              <div className="story-card">
                <p>Serie limitada • 120 piezas • Atelier reservado</p>
                <a className="ghost-button glass" href="#/contacto">
                  Solicitar acceso
                </a>
              </div>
            </section>
          )}

          {route === '/sobre' && (
            <section className="about-grid">
              <div>
                <h3>Atelier preciso</h3>
                <p>
                  Construcción impecable para siluetas que se mueven con
                  intención.
                </p>
              </div>
              <div>
                <h3>Materiales hipnóticos</h3>
                <p>
                  Texturas con brillo controlado y acabados dignos de pasarela.
                </p>
              </div>
              <div>
                <h3>Experiencia privada</h3>
                <p>Concierge de estilo y fittings en espacios reservados.</p>
              </div>
            </section>
          )}

          {route === '/contacto' && (
            <section className="contact-card">
              <p>icons@atelier.com</p>
              <p>+1 (212) 555-0192</p>
              <a className="hero-cta glass" href="mailto:icons@atelier.com">
                Agendar cita
              </a>
            </section>
          )}
        </main>
      )}
>>>>>>> theirs

      <footer className="footer">
        <div className="footer-columns">
          <div className="footer-column">
<<<<<<< ours
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
=======
            <h3>Atención</h3>
            <ul>
              <li>
                <a href="#/contacto">Preguntas frecuentes</a>
              </li>
              <li>
                <a href="#/tienda">Envíos &amp; devoluciones</a>
              </li>
              <li>
                <a href="#/contacto">Soporte</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Compañía</h3>
            <ul>
              <li>
                <a href="#/sobre">Sobre ICONS</a>
              </li>
              <li>
                <a href="#/sobre">Privacidad</a>
              </li>
              <li>
                <a href="#/sobre">Términos</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Social</h3>
>>>>>>> theirs
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
<<<<<<< ours

        <p className="footer-note">© 2024 ICONS. All rights reserved.</p>
=======
        <p className="footer-note">© 2024 ICONS. Todos los derechos reservados.</p>
>>>>>>> theirs
      </footer>
    </div>
  )
}

export default App
