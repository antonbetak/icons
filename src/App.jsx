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
    id: 'gorra-lux',
    name: 'Gorra Lux',
    desc: 'Tejido compacto con brillo controlado.',
    price: '$135',
    tone: 'image-vanta',
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
    id: 'gorra-aurora',
    name: 'Gorra Aurora',
    desc: 'Paneles suaves con textura de luz tenue.',
    price: '$150',
    tone: 'image-mirror',
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
    id: 'playera-noir',
    name: 'Playera Noir',
    desc: 'Algodón italiano con acabado mate.',
    price: '$195',
    tone: 'image-aurora',
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
  {
    id: 'playera-eclipse',
    name: 'Playera Eclipse',
    desc: 'Fibra premium con textura hipnótica.',
    price: '$220',
    tone: 'image-orbit',
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

const sizes = ['S', 'M', 'L', 'XL', 'XXL']
const hatFitLabel = 'Ajuste trasero'

const getRoute = () => {
  const hash = window.location.hash.replace('#', '')
  if (!hash) return '/'
  return hash.startsWith('/') ? hash : `/${hash}`
}

function App() {
  const [route, setRoute] = useState(getRoute())
  const [menuOpen, setMenuOpen] = useState(false)
  const [themeMode, setThemeMode] = useState('system')
  const [systemTheme, setSystemTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedAngle, setSelectedAngle] = useState('A')
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [cartItems, setCartItems] = useState([])
  const [cartNotice, setCartNotice] = useState('')
  const cartTotal = cartItems.reduce((sum, item) => {
    const value = Number(item.price.replace(/[^0-9.]/g, ''))
    return sum + value
  }, 0)

  useEffect(() => {
    const handleHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [route])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const handleChange = (event) => setSystemTheme(event.matches ? 'light' : 'dark')
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', themeMode)
    }
  }, [themeMode])

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
    if (product.category === 'gorras') {
      setSelectedSize(hatFitLabel)
    } else {
      setSelectedSize('M')
    }
    setSelectedAngle('A')
    setGalleryOpen(false)
    window.location.hash = '#/tallas'
  }

  const handleAddToCart = (product) => {
    const sizeLabel = product.category === 'gorras' ? hatFitLabel : selectedSize
    setCartItems((items) => [
      ...items,
      {
        ...product,
        size: sizeLabel,
      },
    ])
    setCartNotice(`Añadido: ${product.name} · ${sizeLabel}`)
    window.setTimeout(() => setCartNotice(''), 1800)
  }

  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems((items) => items.filter((_, index) => index !== indexToRemove))
  }

  const activeTheme = themeMode === 'system' ? systemTheme : themeMode
  const galleryLabels = ['A', 'B', 'C']
  const handleToggleTheme = () => {
    setThemeMode((current) => {
      if (current === 'system') return 'light'
      if (current === 'light') return 'dark'
      return 'system'
    })
  }

  const handleOpenGallery = (index) => {
    setGalleryIndex(index)
    setGalleryOpen(true)
  }

  const handleNextGallery = () => {
    setGalleryIndex((current) => (current + 1) % galleryLabels.length)
  }

  const handlePrevGallery = () => {
    setGalleryIndex((current) => (current - 1 + galleryLabels.length) % galleryLabels.length)
  }

  return (
    <div
      className={`page ${route === '/' ? 'page-home' : ''} ${activeTheme === 'light' ? 'theme-light' : ''}`}
    >
      <header className="top-nav">
        <a className="brand" href="#/">
          ICONS
        </a>
        <div className="nav-actions">
          <div className="nav-menu-wrap">
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
            <div className={`nav-menu glass ${menuOpen ? 'is-open' : ''}`} id="menu">
              {navItems.map((item) => (
                <a key={item.path} href={`#${item.path}`}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <button
            className="nav-icon glass theme-toggle"
            type="button"
            onClick={handleToggleTheme}
            aria-label={`Tema: ${themeMode === 'system' ? 'sistema' : themeMode}`}
          >
            {themeMode === 'system' ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="5" width="18" height="12" rx="2" />
                <path d="M8 19h8" />
              </svg>
            ) : activeTheme === 'dark' ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1l2.1-2.1M17 7l2.1-2.1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" />
              </svg>
            )}
          </button>
          <a className="nav-icon glass" href="#/login" aria-label="Log in">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.8-3.5 5.2-5 8-5s6.2 1.5 8 5" />
            </svg>
          </a>
          <a className="nav-icon glass" href="#/carrito" aria-label="Carrito">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 7h12l-1.4 10H7.4L6 7z" />
              <path d="M9 7V6a3 3 0 0 1 6 0v1" />
            </svg>
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </a>
        </div>
      </header>

      {route === '/' ? (
        <main className="hero">
          <h1 className="hero-title font-gothic">ICONS</h1>
          {/* TODO: ajustar tipografía del título principal "ICONS" */}
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
                      <article
                        className="product-card"
                        key={item.id}
                        onClick={() => handleSelectProduct(item)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            handleSelectProduct(item)
                          }
                        }}
                      >
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
                              onClick={(event) => {
                                event.stopPropagation()
                                handleSelectProduct(item)
                              }}
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
                      <article
                        className="product-card"
                        key={item.id}
                        onClick={() => handleSelectProduct(item)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            handleSelectProduct(item)
                          }
                        }}
                      >
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
                              onClick={(event) => {
                                event.stopPropagation()
                                handleSelectProduct(item)
                              }}
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
                <div className="preview-media">
                  <button
                    className={`preview-main ${selectedProduct.tone}`}
                    type="button"
                    onClick={() => handleOpenGallery(0)}
                  >
                    <span>Ángulo {selectedAngle}</span>
                  </button>
                  <div className="preview-thumbs">
                    {galleryLabels.map((label, index) => (
                      <button
                        className={`preview-thumb ${selectedProduct.tone} ${
                          selectedAngle === label ? 'is-selected' : ''
                        }`}
                        key={label}
                        type="button"
                        onClick={() => {
                          setSelectedAngle(label)
                          handleOpenGallery(index)
                        }}
                      >
                        <span>Ángulo {label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3>{selectedProduct.name}</h3>
                  <p>{selectedProduct.desc}</p>
                  <p className="preview-price">{selectedProduct.price}</p>
                  {selectedProduct.category === 'playeras' ? (
                    <>
                      <div className="size-grid">
                        {sizes.map((size) => (
                          <button
                            className={`size-pill glass ${selectedSize === size ? 'is-selected' : ''}`}
                            type="button"
                            key={size}
                            onClick={() => setSelectedSize(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      <p className="size-note">Talla seleccionada: {selectedSize}</p>
                    </>
                  ) : (
                    <p className="size-note">{hatFitLabel}</p>
                  )}
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

          {cartNotice && <div className="cart-toast">{cartNotice}</div>}

          {galleryOpen && (
            <div className="gallery-overlay" role="dialog" aria-modal="true">
              <div className="gallery-panel glass">
                <button
                  className="gallery-close glass"
                  type="button"
                  onClick={() => setGalleryOpen(false)}
                  aria-label="Cerrar"
                >
                  ×
                </button>
                <button
                  className="gallery-nav gallery-prev glass"
                  type="button"
                  onClick={handlePrevGallery}
                  aria-label="Anterior"
                >
                  ‹
                </button>
                <div className={`gallery-stage ${selectedProduct.tone}`}>
                  <span>{selectedProduct.name} · Ángulo {galleryLabels[galleryIndex]}</span>
                </div>
                <button
                  className="gallery-nav gallery-next glass"
                  type="button"
                  onClick={handleNextGallery}
                  aria-label="Siguiente"
                >
                  ›
                </button>
                <div className="gallery-dots">
                  {galleryLabels.map((label, index) => (
                    <button
                      key={label}
                      type="button"
                      className={`gallery-dot ${galleryIndex === index ? 'is-active' : ''}`}
                      onClick={() => setGalleryIndex(index)}
                      aria-label={`Ir al ángulo ${label}`}
                    />
                  ))}
                </div>
              </div>
              <button
                className="gallery-backdrop"
                type="button"
                onClick={() => setGalleryOpen(false)}
                aria-label="Cerrar galería"
              />
            </div>
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
                      <span className="cart-size">{item.size}</span>
                      <span>{item.price}</span>
                      <button
                        className="cart-remove glass"
                        type="button"
                        onClick={() => handleRemoveFromCart(index)}
                      >
                        Quitar
                      </button>
                    </div>
                  ))}
                  <a className="hero-cta glass" href="#/pago">
                    Pagar
                  </a>
                  <div className="cart-total">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
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
                <div className="auth-avatar">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c1.8-3.5 5.2-5 8-5s6.2 1.5 8 5" />
                  </svg>
                </div>
                <h3>Acceso privado</h3>
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
                  Propuestas de outfits para elevar cada lanzamiento con
                  coherencia visual.
                </p>
                <a className="ghost-button glass" href="#/tienda">
                  Explorar la tienda
                </a>
              </div>
              <div className="story-card">
                <div className="image-panel image-aurora">
                  <span>Imagen IA</span>
                </div>
                <p>Capsulas estacionales • Edición limitada • Estilo nocturno</p>
                <a className="ghost-button glass" href="#/contacto">
                  Asesoría privada
                </a>
              </div>
              <div className="story-card">
                <div className="image-panel image-orbit">
                  <span>Imagen IA</span>
                </div>
                <p>Guías visuales para cada temporada.</p>
              </div>
            </section>
          )}

          {route === '/sobre' && (
            <section className="about-layout">
              <div className="about-hero glass">
                <div className="image-panel image-aurora">
                  <span>Imagen IA</span>
                </div>
                <h3>Laboratorio ICONS</h3>
                <p>
                  Siluetas nocturnas creadas con precisión, enfoque editorial y
                  acabados de atelier.
                </p>
              </div>
              <div className="about-grid">
                <div className="about-card glass">
                  <div className="image-panel image-vanta">
                    <span>Imagen IA</span>
                  </div>
                  <h3>Atelier preciso</h3>
                  <p>
                    Construcción impecable para siluetas que se mueven con
                    intención.
                  </p>
                </div>
                <div className="about-card glass">
                  <div className="image-panel image-mirror">
                    <span>Imagen IA</span>
                  </div>
                  <h3>Materiales hipnóticos</h3>
                  <p>
                    Texturas con brillo controlado y acabados dignos de pasarela.
                  </p>
                </div>
                <div className="about-card glass">
                  <div className="image-panel image-orbit">
                    <span>Imagen IA</span>
                  </div>
                  <h3>Experiencia privada</h3>
                  <p>Concierge de estilo y fittings en espacios reservados.</p>
                </div>
              </div>
            </section>
          )}

          {route === '/contacto' && (
            <section className="contact-card">
              <p>icons@gmail.com</p>
              <p>+52 2224338512</p>
              <a className="hero-cta glass" href="mailto:icons@gmail.com">
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
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="4" y="4" width="16" height="16" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17" cy="7" r="1.2" />
                </svg>
              </a>
              <a href="https://twitter.com" aria-label="X">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 4l6.5 8.1L6 20h3.3l4.6-5.7L18 20h3l-6.7-8.3L20 4h-3.2l-4.1 5.2L8.9 4H6z" />
                </svg>
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
