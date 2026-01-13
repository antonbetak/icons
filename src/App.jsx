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
    sizes: ['Unitalla'],
  },
  {
    id: 'gorra-lux',
    name: 'Gorra Lux',
    desc: 'Tejido compacto con brillo controlado.',
    price: '$135',
    tone: 'image-vanta',
    category: 'gorras',
    sizes: ['Unitalla'],
  },
  {
    id: 'gorra-nocturna',
    name: 'Gorra Nocturna',
    desc: 'Lona premium con brillo sutil en costuras.',
    price: '$145',
    tone: 'image-orbit',
    category: 'gorras',
    sizes: ['Unitalla'],
  },
  {
    id: 'gorra-aurora',
    name: 'Gorra Aurora',
    desc: 'Paneles suaves con textura de luz tenue.',
    price: '$150',
    tone: 'image-mirror',
    category: 'gorras',
    sizes: ['Unitalla'],
  },
  {
    id: 'playera-constelacion',
    name: 'Playera Constelación',
    desc: 'Algodón pesado con caída impecable.',
    price: '$180',
    tone: 'image-vanta',
    category: 'playeras',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'playera-noir',
    name: 'Playera Noir',
    desc: 'Algodón italiano con acabado mate.',
    price: '$195',
    tone: 'image-aurora',
    category: 'playeras',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'playera-orbita',
    name: 'Playera Órbita',
    desc: 'Tejido suave con destellos micro metálicos.',
    price: '$210',
    tone: 'image-mirror',
    category: 'playeras',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'playera-eclipse',
    name: 'Playera Eclipse',
    desc: 'Fibra premium con textura hipnótica.',
    price: '$220',
    tone: 'image-orbit',
    category: 'playeras',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
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

const configPage = {
  title: 'Configuración',
  description: 'Preferencias y datos guardados de tu cuenta.',
}

const sizes = ['S', 'M', 'L', 'XL', 'XXL']
const hatFitLabel = 'Ajuste trasero'
const adminUser = {
  email: 'erik@gmail.com',
  password: '1234',
  name: 'Erik Admin',
  role: 'admin',
  avatar: '',
  addresses: [],
  cards: [],
  defaultAddressId: null,
  defaultCardId: null,
}
const demoUser = {
  email: 'betakanton9@gmail.com',
  password: '1234',
  name: 'Beta Kantón',
  role: 'customer',
  avatar: '',
  addresses: [
    { id: 'addr-1', label: 'Casa · Calle Sierra 120, CDMX' },
    { id: 'addr-2', label: 'Studio · Av. Reforma 87, CDMX' },
  ],
  cards: [
    { id: 'card-1', label: 'Visa •••• 9021' },
    { id: 'card-2', label: 'Mastercard •••• 4480' },
  ],
  defaultAddressId: 'addr-1',
  defaultCardId: 'card-1',
}

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
  const [productList, setProductList] = useState(products)
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [interactions, setInteractions] = useState({})
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedAngle, setSelectedAngle] = useState('A')
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [paymentStep, setPaymentStep] = useState(1)
  const [shippingOption, setShippingOption] = useState('7')
  const [selectedAddressId, setSelectedAddressId] = useState(null)
  const [selectedCardId, setSelectedCardId] = useState(null)
  const [userProfile, setUserProfile] = useState(() => {
    if (typeof window === 'undefined') return null
    const stored = window.localStorage.getItem('icons_user_profile')
    if (!stored) return null
    try {
      const parsed = JSON.parse(stored)
      return {
        ...parsed,
        role: parsed.role ?? 'customer',
      }
    } catch (error) {
      return null
    }
  })
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [profileAvatar, setProfileAvatar] = useState('')
  const [newAddress, setNewAddress] = useState('')
  const [newCard, setNewCard] = useState('')
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === 'undefined') return []
    const stored = window.localStorage.getItem('icons_cart')
    if (!stored) return []
    try {
      return JSON.parse(stored)
    } catch (error) {
      return []
    }
  })
  const [adminNotice, setAdminNotice] = useState('')
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard')
  const [activeAdminCategory, setActiveAdminCategory] = useState('playeras')
  const [editingProductId, setEditingProductId] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    desc: '',
    price: '',
    category: 'playeras',
    tone: 'image-aurora',
    sizes: 'S, M, L',
  })
  const [adminDraft, setAdminDraft] = useState(null)
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

  useEffect(() => {
    if (!userProfile) return
    setSelectedAddressId(userProfile.defaultAddressId ?? userProfile.addresses[0]?.id ?? null)
    setSelectedCardId(userProfile.defaultCardId ?? userProfile.cards[0]?.id ?? null)
    setProfileAvatar(userProfile.avatar ?? '')
  }, [userProfile])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (userProfile) {
      window.localStorage.setItem(
        'icons_user_profile',
        JSON.stringify({
          ...userProfile,
          role: userProfile.role ?? 'customer',
        })
      )
    } else {
      window.localStorage.removeItem('icons_user_profile')
    }
  }, [userProfile])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('icons_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const navItems = useMemo(() => {
    const items = Object.entries(pages).map(([path, page]) => ({
      path,
      label: page.label,
    }))
    if (userProfile?.role === 'admin') {
      items.push({ path: '/admin', label: 'Admin' })
    }
    return items
  }, [userProfile?.role])

  const currentPage =
    pages[route] ??
    (route === '/configuracion'
      ? configPage
      : route === '/admin'
        ? {
            title: 'Panel administrador',
            description: 'Control total de inventario y métricas clave.',
          }
        : pages['/'])

  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    const fallbackSizes = product.category === 'gorras' ? [hatFitLabel] : sizes
    const nextSizes = product.sizes?.length ? product.sizes : fallbackSizes
    setSelectedSize(nextSizes[0])
    setSelectedAngle('A')
    setGalleryOpen(false)
    setInteractions((current) => ({
      ...current,
      [product.id]: {
        views: (current[product.id]?.views ?? 0) + 1,
        cartAdds: current[product.id]?.cartAdds ?? 0,
      },
    }))
    window.location.hash = '#/tallas'
  }

  const handleAddToCart = (product) => {
    const sizeLabel = selectedSize
    setCartItems((items) => [
      ...items,
      {
        ...product,
        size: sizeLabel,
      },
    ])
    setCartNotice(`Añadido: ${product.name} · ${sizeLabel}`)
    window.setTimeout(() => setCartNotice(''), 1800)
    setInteractions((current) => ({
      ...current,
      [product.id]: {
        views: current[product.id]?.views ?? 0,
        cartAdds: (current[product.id]?.cartAdds ?? 0) + 1,
      },
    }))
  }

  const handleBackToCatalog = () => {
    setGalleryOpen(false)
    window.location.hash = '#/tienda'
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

  const handleNextPaymentStep = () => {
    setPaymentStep((step) => Math.min(step + 1, 3))
  }

  const handlePrevPaymentStep = () => {
    setPaymentStep((step) => Math.max(step - 1, 1))
  }

  const handleLogin = () => {
    if (authEmail === adminUser.email && authPassword === adminUser.password) {
      setUserProfile(adminUser)
      setAuthError('')
      window.location.hash = '#/admin'
      return
    }
    if (authEmail === demoUser.email && authPassword === demoUser.password) {
      setUserProfile(demoUser)
      setAuthError('')
      window.location.hash = '#/configuracion'
      return
    }
    setAuthError('Credenciales inválidas.')
  }

  const handleRegister = () => {
    if (!authEmail || !authPassword) {
      setAuthError('Completa correo y contraseña.')
      return
    }
    setUserProfile({
      email: authEmail,
      password: authPassword,
      name: 'Nuevo usuario',
      role: 'customer',
      avatar: '',
      addresses: [],
      cards: [],
      defaultAddressId: null,
      defaultCardId: null,
    })
    setAuthError('')
    window.location.hash = '#/configuracion'
  }

  const handleAddAddress = () => {
    if (!newAddress.trim()) return
    const next = {
      id: `addr-${Date.now()}`,
      label: newAddress.trim(),
    }
    setUserProfile((profile) => {
      if (!profile) return profile
      const addresses = [...profile.addresses, next]
      return {
        ...profile,
        addresses,
        defaultAddressId: profile.defaultAddressId ?? next.id,
      }
    })
    setNewAddress('')
  }

  const handleAddCard = () => {
    if (!newCard.trim()) return
    const next = {
      id: `card-${Date.now()}`,
      label: newCard.trim(),
    }
    setUserProfile((profile) => {
      if (!profile) return profile
      const cards = [...profile.cards, next]
      return {
        ...profile,
        cards,
        defaultCardId: profile.defaultCardId ?? next.id,
      }
    })
    setNewCard('')
  }

  const handleSaveAvatar = () => {
    setUserProfile((profile) => (profile ? { ...profile, avatar: profileAvatar } : profile))
  }

  const handleAvatarFile = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      setProfileAvatar(result)
      setUserProfile((profile) => (profile ? { ...profile, avatar: result } : profile))
    }
    reader.readAsDataURL(file)
  }

  const handleLogout = () => {
    setUserProfile(null)
    setAuthEmail('')
    setAuthPassword('')
    setAuthError('')
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('icons_user_profile')
    }
    window.location.hash = '#/login'
  }

  const handleProductUpdate = (id, field, value) => {
    setProductList((items) =>
      items.map((item) => {
        if (item.id !== id) return item
        if (field === 'sizes') {
          const parsed = value
            .split(',')
            .map((size) => size.trim())
            .filter(Boolean)
          return { ...item, sizes: parsed }
        }
        return { ...item, [field]: value }
      })
    )
  }

  const handleEditProduct = (product) => {
    setEditingProductId(product.id)
    setAdminDraft({
      name: product.name,
      desc: product.desc,
      price: product.price,
      category: product.category,
      tone: product.tone,
      sizes: (product.sizes ?? []).join(', '),
    })
  }

  const handleCancelEdit = () => {
    setEditingProductId(null)
    setAdminDraft(null)
  }

  const handleSaveEdit = (id) => {
    if (!adminDraft) return
    handleProductUpdate(id, 'name', adminDraft.name)
    handleProductUpdate(id, 'desc', adminDraft.desc)
    handleProductUpdate(id, 'price', adminDraft.price)
    handleProductUpdate(id, 'category', adminDraft.category)
    handleProductUpdate(id, 'tone', adminDraft.tone)
    handleProductUpdate(id, 'sizes', adminDraft.sizes)
    setEditingProductId(null)
    setAdminDraft(null)
  }

  const handleAddProduct = () => {
    if (!newProduct.name.trim() || !newProduct.price.trim() || !newProduct.desc.trim()) {
      setAdminNotice('Completa nombre, descripción y precio.')
      return
    }
    const parsedSizes = newProduct.sizes
      .split(',')
      .map((size) => size.trim())
      .filter(Boolean)
    const nextProduct = {
      id: `producto-${Date.now()}`,
      name: newProduct.name.trim(),
      desc: newProduct.desc.trim(),
      price: newProduct.price.trim(),
      category: newProduct.category,
      tone: newProduct.tone,
      sizes: parsedSizes.length ? parsedSizes : newProduct.category === 'gorras' ? ['Unitalla'] : sizes,
    }
    setProductList((items) => [...items, nextProduct])
    setNewProduct({
      name: '',
      desc: '',
      price: '',
      category: 'playeras',
      tone: 'image-aurora',
      sizes: 'S, M, L',
    })
    setAdminNotice('Producto agregado.')
    window.setTimeout(() => setAdminNotice(''), 1800)
  }

  const handleRemoveProduct = (id) => {
    setProductList((items) => items.filter((item) => item.id !== id))
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  useEffect(() => {
    setSelectedProduct((current) => {
      const found = productList.find((item) => item.id === current?.id)
      return found ?? productList[0]
    })
  }, [productList])

  useEffect(() => {
    if (!selectedProduct) return
    const fallbackSizes = selectedProduct.category === 'gorras' ? [hatFitLabel] : sizes
    const nextSizes = selectedProduct.sizes?.length ? selectedProduct.sizes : fallbackSizes
    if (!nextSizes.includes(selectedSize)) {
      setSelectedSize(nextSizes[0])
    }
  }, [selectedProduct, selectedSize])

  const adminStats = useMemo(() => {
    const metrics = productList.map((product) => ({
      ...product,
      views: interactions[product.id]?.views ?? 0,
      cartAdds: interactions[product.id]?.cartAdds ?? 0,
    }))
    const totalViews = metrics.reduce((sum, item) => sum + item.views, 0)
    const totalCartAdds = metrics.reduce((sum, item) => sum + item.cartAdds, 0)
    const avgViews = metrics.length ? totalViews / metrics.length : 0
    const avgCartAdds = metrics.length ? totalCartAdds / metrics.length : 0
    const conversionRate = totalViews ? (totalCartAdds / totalViews) * 100 : 0
    const topViewed = [...metrics].sort((a, b) => b.views - a.views)[0]
    const topCart = [...metrics].sort((a, b) => b.cartAdds - a.cartAdds)[0]
    const lowEngagement = metrics.filter((item) => item.views === 0 && item.cartAdds === 0)
    return {
      totalViews,
      totalCartAdds,
      totalProducts: productList.length,
      avgViews,
      avgCartAdds,
      conversionRate,
      topViewed,
      topCart,
      lowEngagement,
    }
  }, [interactions, productList])

  const adminCatalog = useMemo(
    () => ({
      gorras: productList.filter((item) => item.category === 'gorras'),
      playeras: productList.filter((item) => item.category === 'playeras'),
    }),
    [productList]
  )

  return (
    <div
      className={`page ${route === '/' ? 'page-home' : ''} ${activeTheme === 'light' ? 'theme-light' : ''}`}
    >
      <div className="cosmic-background" aria-hidden="true" />
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
          <a
            className="nav-icon glass"
            href={
              userProfile ? (userProfile.role === 'admin' ? '#/admin' : '#/configuracion') : '#/login'
            }
            aria-label={userProfile ? 'Configuración' : 'Log in'}
          >
            {userProfile ? (
              <span className="nav-avatar">
                {userProfile.avatar ? (
                  <img src={userProfile.avatar} alt="Avatar" />
                ) : (
                  userProfile.email.charAt(0).toUpperCase()
                )}
              </span>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c1.8-3.5 5.2-5 8-5s6.2 1.5 8 5" />
              </svg>
            )}
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
            <section className="shop section-reveal">
              <div className="shop-group">
                <h3>Gorras</h3>
                <div className="carousel">
                  {productList
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
                  {productList
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
                <button className="preview-back ghost-button glass" type="button" onClick={handleBackToCatalog}>
                  Regresar a prendas
                </button>
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
                  <div className="size-grid">
                    {(selectedProduct.sizes?.length ? selectedProduct.sizes : sizes).map((size) => (
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
                  <p className="size-note">
                    {selectedProduct.category === 'gorras' ? 'Ajuste' : 'Talla'} seleccionada: {selectedSize}
                  </p>
                  <div className="preview-actions">
                    <button className="ghost-button glass" type="button" onClick={handleBackToCatalog}>
                      Regresar a prendas
                    </button>
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
            <section className="cart section-reveal">
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
            <section className="payment section-reveal">
              <div className="payment-card">
                {!userProfile ? (
                  <div className="payment-section">
                    <h3>Inicia sesión o regístrate</h3>
                    <p>Accede para cargar tus datos predeterminados.</p>
                    <div className="payment-grid">
                      <input
                        type="email"
                        placeholder="Correo"
                        value={authEmail}
                        onChange={(event) => setAuthEmail(event.target.value)}
                      />
                      <input
                        type="password"
                        placeholder="Contraseña"
                        value={authPassword}
                        onChange={(event) => setAuthPassword(event.target.value)}
                      />
                    </div>
                    {authError && <p className="form-error">{authError}</p>}
                    <div className="payment-actions">
                      <button className="ghost-button glass" type="button" onClick={handleRegister}>
                        Registrarme
                      </button>
                      <button className="hero-cta glass" type="button" onClick={handleLogin}>
                        Ingresar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="payment-steps">
                      <span className={paymentStep >= 1 ? 'is-active' : ''}>Dirección</span>
                      <span className={paymentStep >= 2 ? 'is-active' : ''}>Entrega</span>
                      <span className={paymentStep >= 3 ? 'is-active' : ''}>Pago</span>
                    </div>

                    {paymentStep === 1 && (
                      <div className="payment-section">
                        <h3>Dirección de entrega</h3>
                        <p>Elige una dirección guardada o agrega una nueva.</p>
                        {userProfile.addresses.length > 0 ? (
                          <div className="payment-options">
                            {userProfile.addresses.map((address) => (
                              <button
                                key={address.id}
                                className={`ghost-button glass ${
                                  selectedAddressId === address.id ? 'is-selected' : ''
                                }`}
                                type="button"
                                onClick={() => setSelectedAddressId(address.id)}
                              >
                                {address.label}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="muted-text">Sin direcciones guardadas.</p>
                        )}
                        <div className="payment-grid">
                          <input
                            type="text"
                            placeholder="Agregar nueva dirección"
                            value={newAddress}
                            onChange={(event) => setNewAddress(event.target.value)}
                          />
                          <button className="ghost-button glass" type="button" onClick={handleAddAddress}>
                            Guardar dirección
                          </button>
                        </div>
                      </div>
                    )}

                    {paymentStep === 2 && (
                      <div className="payment-section">
                        <h3>Día de entrega</h3>
                        <p>Selecciona el tiempo estimado de entrega.</p>
                        <div className="payment-options">
                          <button
                            className={`ghost-button glass ${
                              shippingOption === '7' ? 'is-selected' : ''
                            }`}
                            type="button"
                            onClick={() => setShippingOption('7')}
                          >
                            7 días hábiles
                          </button>
                          <button
                            className={`ghost-button glass ${
                              shippingOption === '10' ? 'is-selected' : ''
                            }`}
                            type="button"
                            onClick={() => setShippingOption('10')}
                          >
                            10 días hábiles
                          </button>
                        </div>
                      </div>
                    )}

                    {paymentStep === 3 && (
                      <div className="payment-section">
                        <h3>Datos de tarjeta</h3>
                        <p>Completa los datos para finalizar el pago.</p>
                        {userProfile.cards.length > 0 && (
                          <div className="payment-options">
                            {userProfile.cards.map((card) => (
                              <button
                                key={card.id}
                                className={`ghost-button glass ${
                                  selectedCardId === card.id ? 'is-selected' : ''
                                }`}
                                type="button"
                                onClick={() => setSelectedCardId(card.id)}
                              >
                                {card.label}
                              </button>
                            ))}
                          </div>
                        )}
                        <div className="payment-grid">
                          <input type="text" placeholder="Nombre en la tarjeta" />
                          <input type="text" placeholder="Número de tarjeta" />
                          <input type="text" placeholder="MM/AA" />
                          <input type="text" placeholder="CVC" />
                          <input
                            type="text"
                            placeholder="Guardar tarjeta como predeterminada"
                            value={newCard}
                            onChange={(event) => setNewCard(event.target.value)}
                          />
                          <button className="ghost-button glass" type="button" onClick={handleAddCard}>
                            Guardar tarjeta
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="payment-actions">
                      <button
                        className="ghost-button glass"
                        type="button"
                        onClick={handlePrevPaymentStep}
                        disabled={paymentStep === 1}
                      >
                        Volver
                      </button>
                      {paymentStep < 3 ? (
                        <button className="hero-cta glass" type="button" onClick={handleNextPaymentStep}>
                          Continuar
                        </button>
                      ) : (
                        <button className="hero-cta glass" type="button">
                          Confirmar
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </section>
          )}

          {route === '/login' && (
            <section className="auth section-reveal">
              <div className="auth-card">
                <div className="auth-avatar">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c1.8-3.5 5.2-5 8-5s6.2 1.5 8 5" />
                  </svg>
                </div>
                <h3>Acceso privado</h3>
                <p>Ingresa o regístrate para guardar tus datos.</p>
                <div className="payment-grid">
                  <input
                    type="email"
                    placeholder="Correo"
                    value={authEmail}
                    onChange={(event) => setAuthEmail(event.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={authPassword}
                    onChange={(event) => setAuthPassword(event.target.value)}
                  />
                </div>
                {authError && <p className="form-error">{authError}</p>}
                <div className="payment-actions">
                  <button className="ghost-button glass" type="button" onClick={handleRegister}>
                    Registrarme
                  </button>
                  <button className="hero-cta glass" type="button" onClick={handleLogin}>
                    Entrar
                  </button>
                </div>
              </div>
            </section>
          )}

          {route === '/configuracion' && (
            <section className="account section-reveal">
              <div className="account-card">
                <h3>Configuración de usuario</h3>
                <p>Administra tus datos predeterminados y perfil.</p>

                <div className="account-grid">
                  <div className="account-panel glass">
                    <h4>Foto de perfil</h4>
                    <div className="account-avatar">
                      {profileAvatar ? (
                        <img src={profileAvatar} alt="Avatar" />
                      ) : (
                        <span>{(userProfile?.email?.charAt(0) ?? 'U').toUpperCase()}</span>
                      )}
                    </div>
                    <div className="payment-grid">
                      <input
                        type="text"
                        placeholder="URL de la foto"
                        value={profileAvatar}
                        onChange={(event) => setProfileAvatar(event.target.value)}
                      />
                      <div className="account-upload">
                        <label className="file-label glass" htmlFor="avatar-upload">
                          Cargar desde galería
                        </label>
                        <input
                          id="avatar-upload"
                          className="file-input"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarFile}
                        />
                      </div>
                      <button className="ghost-button glass" type="button" onClick={handleSaveAvatar}>
                        Modificar
                      </button>
                    </div>
                    <p className="form-hint">Usa una URL o sube una imagen cuadrada.</p>
                  </div>

                  <div className="account-panel glass">
                    <h4>Direcciones predeterminadas</h4>
                    <div className="account-list">
                      {(userProfile?.addresses ?? []).map((address) => (
                        <button
                          key={address.id}
                          type="button"
                          className={`ghost-button glass ${
                            userProfile?.defaultAddressId === address.id ? 'is-selected' : ''
                          }`}
                          onClick={() =>
                            setUserProfile((profile) =>
                              profile ? { ...profile, defaultAddressId: address.id } : profile
                            )
                          }
                        >
                          {address.label}
                        </button>
                      ))}
                      {!(userProfile?.addresses?.length) && (
                        <p className="muted-text">Sin direcciones registradas.</p>
                      )}
                    </div>
                    <div className="payment-grid">
                      <input
                        type="text"
                        placeholder="Agregar dirección"
                        value={newAddress}
                        onChange={(event) => setNewAddress(event.target.value)}
                      />
                      <button className="ghost-button glass" type="button" onClick={handleAddAddress}>
                        Añadir
                      </button>
                    </div>
                  </div>

                  <div className="account-panel glass">
                    <h4>Tarjetas predeterminadas</h4>
                    <div className="account-list">
                      {(userProfile?.cards ?? []).map((card) => (
                        <button
                          key={card.id}
                          type="button"
                          className={`ghost-button glass ${
                            userProfile?.defaultCardId === card.id ? 'is-selected' : ''
                          }`}
                          onClick={() =>
                            setUserProfile((profile) =>
                              profile ? { ...profile, defaultCardId: card.id } : profile
                            )
                          }
                        >
                          {card.label}
                        </button>
                      ))}
                      {!(userProfile?.cards?.length) && (
                        <p className="muted-text">Sin tarjetas guardadas.</p>
                      )}
                    </div>
                    <div className="payment-grid">
                      <input
                        type="text"
                        placeholder="Agregar tarjeta"
                        value={newCard}
                        onChange={(event) => setNewCard(event.target.value)}
                      />
                      <button className="ghost-button glass" type="button" onClick={handleAddCard}>
                        Añadir
                      </button>
                    </div>
                  </div>

                  <div className="account-panel glass account-actions">
                    <h4>Sesión</h4>
                    <p className="muted-text">Cierra sesión para proteger tu cuenta.</p>
                    <button className="hero-cta glass" type="button" onClick={handleLogout}>
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {route === '/admin' && (
            <section className="admin">
              {userProfile?.role !== 'admin' ? (
                <div className="admin-card glass">
                  <h3>Acceso restringido</h3>
                  <p>Este panel es exclusivo para administradores.</p>
                </div>
              ) : (
                <>
                  <div className="admin-header">
                    <div>
                      <h3>Dashboard ejecutivo</h3>
                      <p className="muted-text">Resumen de desempeño e inventario activo.</p>
                    </div>
                    <button className="ghost-button glass" type="button" onClick={handleLogout}>
                      Cerrar sesión admin
                    </button>
                  </div>
                  <div className="admin-main-tabs">
                    <button
                      className={`ghost-button glass ${activeAdminTab === 'dashboard' ? 'is-selected' : ''}`}
                      type="button"
                      onClick={() => setActiveAdminTab('dashboard')}
                    >
                      Dashboard
                    </button>
                    <button
                      className={`ghost-button glass ${activeAdminTab === 'inventory' ? 'is-selected' : ''}`}
                      type="button"
                      onClick={() => setActiveAdminTab('inventory')}
                    >
                      Actualizaciones &amp; productos
                    </button>
                  </div>

                  {activeAdminTab === 'dashboard' ? (
                    <>
                      <div className="admin-grid">
                        <div className="admin-card glass">
                          <h4>Indicadores clave</h4>
                          <div className="admin-stats">
                            <div className="admin-stat">
                              <span>Total productos</span>
                              <strong>{adminStats.totalProducts}</strong>
                            </div>
                            <div className="admin-stat">
                              <span>Vistas registradas</span>
                              <strong>{adminStats.totalViews}</strong>
                            </div>
                            <div className="admin-stat">
                              <span>Añadidos al carrito</span>
                              <strong>{adminStats.totalCartAdds}</strong>
                            </div>
                            <div className="admin-stat">
                              <span>Conversión a carrito</span>
                              <strong>{adminStats.conversionRate.toFixed(1)}%</strong>
                            </div>
                          </div>
                        </div>
                        <div className="admin-card glass">
                          <h4>Rendimiento promedio</h4>
                          <div className="admin-stats">
                            <div className="admin-stat">
                              <span>Vistas por producto</span>
                              <strong>{adminStats.avgViews.toFixed(1)}</strong>
                            </div>
                            <div className="admin-stat">
                              <span>Carrito por producto</span>
                              <strong>{adminStats.avgCartAdds.toFixed(1)}</strong>
                            </div>
                            <div className="admin-stat">
                              <span>Productos sin interacción</span>
                              <strong>{adminStats.lowEngagement.length}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="admin-card glass">
                        <h4>Más interacción</h4>
                        <div className="admin-highlight">
                          <div>
                            <p className="muted-text">Producto con más vistas</p>
                            <strong>{adminStats.topViewed?.name ?? 'Sin datos'}</strong>
                            <span>{adminStats.topViewed?.views ?? 0} vistas</span>
                          </div>
                          <div>
                            <p className="muted-text">Producto con más carrito</p>
                            <strong>{adminStats.topCart?.name ?? 'Sin datos'}</strong>
                            <span>{adminStats.topCart?.cartAdds ?? 0} acciones</span>
                          </div>
                          <div>
                            <p className="muted-text">Baja interacción</p>
                            <strong>
                              {adminStats.lowEngagement[0]?.name ?? 'Sin alertas'}
                            </strong>
                            <span>
                              {adminStats.lowEngagement.length
                                ? `${adminStats.lowEngagement.length} piezas sin movimiento`
                                : 'Todo el catálogo tiene actividad'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="admin-card glass admin-form">
                        <div className="admin-form-header">
                          <div>
                            <h4>Agregar nuevo producto</h4>
                            <p className="muted-text">Añade piezas exclusivas sin saturar el inventario.</p>
                          </div>
                          <button className="ghost-button glass" type="button" onClick={handleAddProduct}>
                            Agregar producto
                          </button>
                        </div>
                        <div className="admin-form-grid">
                          <input
                            type="text"
                            placeholder="Nombre"
                            value={newProduct.name}
                            onChange={(event) => setNewProduct((current) => ({ ...current, name: event.target.value }))}
                          />
                          <input
                            type="text"
                            placeholder="Precio (ej. $190)"
                            value={newProduct.price}
                            onChange={(event) =>
                              setNewProduct((current) => ({ ...current, price: event.target.value }))
                            }
                          />
                          <input
                            type="text"
                            placeholder="Descripción"
                            value={newProduct.desc}
                            onChange={(event) => setNewProduct((current) => ({ ...current, desc: event.target.value }))}
                          />
                          <select
                            value={newProduct.category}
                            onChange={(event) =>
                              setNewProduct((current) => ({ ...current, category: event.target.value }))
                            }
                          >
                            <option value="playeras">Playeras</option>
                            <option value="gorras">Gorras</option>
                          </select>
                          <select
                            value={newProduct.tone}
                            onChange={(event) => setNewProduct((current) => ({ ...current, tone: event.target.value }))}
                          >
                            <option value="image-aurora">Aurora</option>
                            <option value="image-vanta">Vanta</option>
                            <option value="image-orbit">Orbit</option>
                            <option value="image-mirror">Mirror</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Tallas (separadas por coma)"
                            value={newProduct.sizes}
                            onChange={(event) => setNewProduct((current) => ({ ...current, sizes: event.target.value }))}
                          />
                        </div>
                        {adminNotice && <p className="form-hint">{adminNotice}</p>}
                      </div>

                      <div className="admin-card glass">
                        <div className="admin-list-header">
                          <div>
                            <h4>Inventario editable</h4>
                            <p className="muted-text">Gestiona piezas por categoría sin perder claridad.</p>
                          </div>
                          <div className="admin-tabs">
                            <button
                              className={`ghost-button glass ${activeAdminCategory === 'playeras' ? 'is-selected' : ''}`}
                              type="button"
                              onClick={() => setActiveAdminCategory('playeras')}
                            >
                              Playeras
                            </button>
                            <button
                              className={`ghost-button glass ${activeAdminCategory === 'gorras' ? 'is-selected' : ''}`}
                              type="button"
                              onClick={() => setActiveAdminCategory('gorras')}
                            >
                              Gorras
                            </button>
                          </div>
                        </div>
                        <div className="admin-list">
                          {adminCatalog[activeAdminCategory].map((item) => (
                            <div className="admin-item" key={item.id}>
                              <div className="admin-item-info">
                                <div>
                                  <h5>{item.name}</h5>
                                  <p className="muted-text">{item.desc}</p>
                                </div>
                                <div className="admin-item-meta">
                                  <span>{item.price}</span>
                                  <span>{item.category === 'gorras' ? 'Gorra' : 'Playera'}</span>
                                  <span>{(item.sizes ?? []).join(', ')}</span>
                                </div>
                              </div>
                              <div className="admin-item-actions">
                                <button
                                  className="ghost-button glass"
                                  type="button"
                                  onClick={() => handleEditProduct(item)}
                                >
                                  Editar
                                </button>
                                <button
                                  className="ghost-button glass admin-remove"
                                  type="button"
                                  onClick={() => handleRemoveProduct(item.id)}
                                >
                                  Eliminar
                                </button>
                              </div>
                              {editingProductId === item.id && adminDraft && (
                                <div className="admin-editor">
                                  <div className="admin-form-grid">
                                    <input
                                      type="text"
                                      value={adminDraft.name}
                                      onChange={(event) =>
                                        setAdminDraft((current) => ({ ...current, name: event.target.value }))
                                      }
                                    />
                                    <input
                                      type="text"
                                      value={adminDraft.price}
                                      onChange={(event) =>
                                        setAdminDraft((current) => ({ ...current, price: event.target.value }))
                                      }
                                    />
                                    <input
                                      type="text"
                                      value={adminDraft.desc}
                                      onChange={(event) =>
                                        setAdminDraft((current) => ({ ...current, desc: event.target.value }))
                                      }
                                    />
                                    <select
                                      value={adminDraft.category}
                                      onChange={(event) =>
                                        setAdminDraft((current) => ({ ...current, category: event.target.value }))
                                      }
                                    >
                                      <option value="playeras">Playeras</option>
                                      <option value="gorras">Gorras</option>
                                    </select>
                                    <select
                                      value={adminDraft.tone}
                                      onChange={(event) =>
                                        setAdminDraft((current) => ({ ...current, tone: event.target.value }))
                                      }
                                    >
                                      <option value="image-aurora">Aurora</option>
                                      <option value="image-vanta">Vanta</option>
                                      <option value="image-orbit">Orbit</option>
                                      <option value="image-mirror">Mirror</option>
                                    </select>
                                    <input
                                      type="text"
                                      value={adminDraft.sizes}
                                      onChange={(event) =>
                                        setAdminDraft((current) => ({ ...current, sizes: event.target.value }))
                                      }
                                    />
                                  </div>
                                  <div className="admin-editor-actions">
                                    <button className="ghost-button glass" type="button" onClick={handleCancelEdit}>
                                      Cancelar
                                    </button>
                                    <button
                                      className="hero-cta glass"
                                      type="button"
                                      onClick={() => handleSaveEdit(item.id)}
                                    >
                                      Guardar cambios
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </section>
          )}

          {route === '/guia' && (
            <section className="story section-reveal">
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
            <section className="about-layout section-reveal">
              <div className="about-intro glass">
                <div>
                  <h3>Laboratorio ICONS</h3>
                  <p>
                    Siluetas nocturnas creadas con precisión, enfoque editorial y
                    acabados de atelier.
                  </p>
                </div>
                <div className="image-panel image-aurora">
                  <span>Imagen IA</span>
                </div>
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
            <section className="contact-card section-reveal">
              <p>icons@gmail.com</p>
              <p>+52 2224338512</p>
              <a className="hero-cta glass" href="mailto:icons@gmail.com">
                Agendar cita
              </a>
            </section>
          )}
        </main>
      )}

      <button
        className="theme-fab glass"
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
