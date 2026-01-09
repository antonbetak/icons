import { useEffect, useMemo, useState } from 'react'
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
        <p className="footer-note">© 2024 ICONS. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default App
