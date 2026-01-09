import { useEffect, useMemo, useState } from 'react'
import './App.css'

const products = [
  {
    id: 'gorra-obsidiana',
    name: 'Gorra Obsidiana',
    desc: 'Visera precisa con textura satinada mate.',
    price: '$120',
    tone: 'image-aurora',
    category: 'gorras',
  },
  {
    id: 'gorra-nocturna',
    name: 'Gorra Nocturna',
    desc: 'Lona premium con brillo sutil en costuras.',
    price: '$145',
    tone: 'image-orbit',
    category: 'gorras',
  },
  {
    id: 'playera-constelacion',
    name: 'Playera Constelación',
    desc: 'Algodón pesado con caída impecable.',
    price: '$180',
    tone: 'image-vanta',
    category: 'playeras',
  },
  {
    id: 'playera-orbita',
    name: 'Playera Órbita',
    desc: 'Tejido suave con destellos micro metálicos.',
    price: '$210',
    tone: 'image-mirror',
    category: 'playeras',
  },
]

const pages = {
  '/': {
    label: 'Inicio',
    title: 'ICONS',
    description: 'Alta moda nocturna con brillo controlado.',
  },
  '/tienda': {
    label: 'Tienda',
    title: 'Tienda',
    description: 'Selección curada para la noche urbana.',
  },
  '/guia': {
    label: 'Guía de estilo',
    title: 'Guía de estilo',
    description: 'Combinaciones sugeridas para cada colección.',
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

const sizes = ['XS', 'S', 'M', 'L', 'XL']

const getRoute = () => {
  const hash = window.location.hash.replace('#', '')
  if (!hash) return '/'
  return hash.startsWith('/') ? hash : `/${hash}`
}

function App() {
  const [route, setRoute] = useState(getRoute())
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [cartItems, setCartItems] = useState([])

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

  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    window.location.hash = '#/tallas'
  }

  const handleAddToCart = (product) => {
    setCartItems((items) => [...items, product])
  }

  return (
    <div className="page">
      <header className="top-nav glass">
        <a className="brand" href="#/">
          ICONS
        </a>

        <div className="nav-actions">
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

          <a className="nav-link glass" href="#/login">
            Log in
          </a>

          <a className="nav-link glass" href="#/carrito">
            Carrito ({cartItems.length})
          </a>
        </div>

        <div className={`nav-menu glass ${menuOpen ? 'is-open' : ''}`} id="menu">
          {navItems.map((item) => (
            <a key={item.path} href={`#${item.path}`}>
              {item.label}
            </a>
          ))}
        </div>
      </header>

      {route === '/' ? (
        <main className="hero">
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
              <div className="shop-group">
                <h3>Gorras</h3>
                <div className="carousel">
                  {products
                    .filter((product) => product.category === 'gorras')
                    .map((item) => (
                      <article className="product-card" key={item.id}>
                        <div className={`product-image ${item.tone}`}>
                          <span>Imagen IA</span>
                        </div>
                        <div className="product-body">
                          <div>
                            <h4>{item.name}</h4>
                            <p>{item.desc}</p>
                          </div>
                          <div className="product-meta">
                            <span>{item.price}</span>
                            <button
                              className="product-action glass"
                              type="button"
                              onClick={() => handleSelectProduct(item)}
                            >
                              Comprar
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                </div>
              </div>

              <div className="shop-group">
                <h3>Playeras</h3>
                <div className="carousel">
                  {products
                    .filter((product) => product.category === 'playeras')
                    .map((item) => (
                      <article className="product-card" key={item.id}>
                        <div className={`product-image ${item.tone}`}>
                          <span>Imagen IA</span>
                        </div>
                        <div className="product-body">
                          <div>
                            <h4>{item.name}</h4>
                            <p>{item.desc}</p>
                          </div>
                          <div className="product-meta">
                            <span>{item.price}</span>
                            <button
                              className="product-action glass"
                              type="button"
                              onClick={() => handleSelectProduct(item)}
                            >
                              Comprar
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                </div>
              </div>
            </section>
          )}

          {route === '/tallas' && selectedProduct && (
            <section className="preview">
              <div className="preview-card">
                <div className={`product-image ${selectedProduct.tone}`}>
                  <span>Vista previa IA</span>
                </div>
                <div>
                  <h3>{selectedProduct.name}</h3>
                  <p>{selectedProduct.desc}</p>
                  <p className="preview-price">{selectedProduct.price}</p>
                  <div className="size-grid">
                    {sizes.map((size) => (
                      <button className="size-pill glass" type="button" key={size}>
                        {size}
                      </button>
                    ))}
                  </div>
                  <div className="preview-actions">
                    <button
                      className="hero-cta glass"
                      type="button"
                      onClick={() => handleAddToCart(selectedProduct)}
                    >
                      Añadir al carrito
                    </button>
                    <a className="ghost-button glass" href="#/carrito">
                      Ir al carrito
                    </a>
                  </div>
                </div>
              </div>
            </section>
          )}

          {route === '/carrito' && (
            <section className="cart">
              {cartItems.length === 0 ? (
                <p>Tu carrito está vacío.</p>
              ) : (
                <div className="cart-list">
                  {cartItems.map((item, index) => (
                    <div className="cart-item" key={`${item.id}-${index}`}>
                      <span>{item.name}</span>
                      <span>{item.price}</span>
                    </div>
                  ))}
                  <a className="hero-cta glass" href="#/pago">
                    Pagar
                  </a>
                </div>
              )}
            </section>
          )}

          {route === '/pago' && (
            <section className="payment">
              <div className="payment-card">
                <h3>Solicitud de tarjeta</h3>
                <p>Completa los datos para continuar con el pago.</p>
                <div className="payment-grid">
                  <input type="text" placeholder="Nombre en la tarjeta" />
                  <input type="text" placeholder="Número de tarjeta" />
                  <input type="text" placeholder="MM/AA" />
                  <input type="text" placeholder="CVC" />
                </div>
                <button className="hero-cta glass" type="button">
                  Confirmar
                </button>
              </div>
            </section>
          )}

          {route === '/login' && (
            <section className="auth">
              <div className="auth-card">
                <h3>Acceso</h3>
                <p>Ingresa para administrar tu experiencia.</p>
                <div className="payment-grid">
                  <input type="email" placeholder="Correo" />
                  <input type="password" placeholder="Contraseña" />
                </div>
                <button className="hero-cta glass" type="button">
                  Entrar
                </button>
              </div>
            </section>
          )}

          {route === '/guia' && (
            <section className="story">
              <div>
                <h3>Combinaciones premium</h3>
                <p>
                  Propuestas de outfits para elevar cada lanzamiento con coherencia visual.
                </p>
                <a className="ghost-button glass" href="#/tienda">
                  Explorar la tienda
                </a>
              </div>
              <div className="story-card">
                <p>Capsulas estacionales • Edición limitada • Estilo nocturno</p>
                <a className="ghost-button glass" href="#/contacto">
                  Asesoría privada
                </a>
              </div>
            </section>
          )}

          {route === '/sobre' && (
            <section className="about-grid">
              <div>
                <h3>Atelier preciso</h3>
                <p>Construcción impecable para siluetas que se mueven con intención.</p>
              </div>
              <div>
                <h3>Materiales hipnóticos</h3>
                <p>Texturas con brillo controlado y acabados dignos de pasarela.</p>
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

      <footer className="footer">
        <div className="footer-columns">
          <div className="footer-column">
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
        <p className="footer-note">© 2026 ICONS. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default App
