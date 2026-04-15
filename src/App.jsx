import { useState, useEffect } from 'react'
import './App.css'

const products = [
  {
    name: 'Seynse',
    tagline: 'Social confidence coach',
    description:
      'CBT-based graduated exposure therapy with AI coaching. Build confidence through 27 challenges across social, professional, and romantic categories.',
    status: 'live',
    url: 'https://seynse.seyn.co.uk',
    icon: '🧠',
    accent: [123, 108, 246],
  },
  {
    name: 'Seynario',
    tagline: 'Dress for the scenario',
    description:
      'AI wardrobe scanner meets outfit engine. Photograph your clothes, pick your scenario, and get styled. Mix what you own with what you need.',
    status: 'live',
    url: 'https://seynario.seyn.co.uk',
    icon: '👔',
    accent: [232, 168, 56],
  },
  {
    name: 'In Seync',
    tagline: 'Find your tribe',
    description:
      'For finding and connecting with your people. We all deserve to belong"',
    status: 'soon',
    icon: '🤝',
    accent: [61, 191, 160],
  },
  {
    name: 'Be Seyn',
    tagline: 'Identity marketing platform',
    description:
      "Discover and communicate what makes you, you. For individuals and businesses alike.",
    status: 'soon',
    icon: '✨',
    accent: [232, 90, 113],
  },
  {
    name: 'Screyn',
    tagline: 'Screen health optimiser',
    description:
      'Computer vision eye strain and mood detection. Your desktop ally for healthier screen time, and more productive days.',
    status: 'soon',
    icon: '👁',
    accent: [74, 159, 232],
  },
]

function rgba(color, alpha) {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`
}

function rgb(color) {
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
}

function ArrowIcon({ hovered }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="arrow-icon"
      style={{
        transform: hovered ? 'translate(2px, -2px)' : 'translate(0, 0)',
      }}
    >
      <path
        d="M3.5 10.5L10.5 3.5M10.5 3.5H5M10.5 3.5V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProductCard({ product, index, isLive }) {
  const [hovered, setHovered] = useState(false)

  const Wrapper = isLive ? 'a' : 'div'
  const wrapperProps = isLive
    ? { href: product.url, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      className={`product-card ${isLive ? 'product-card--live' : 'product-card--soon'} ${hovered ? 'is-hovered' : ''} fade-up`}
      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="card-inner"
        style={
          isLive && hovered
            ? { borderColor: rgba(product.accent, 0.25) }
            : undefined
        }
      >
        <div
          className="card-glow"
          style={{
            background: `radial-gradient(circle at top right, ${rgba(product.accent, 0.06)}, transparent)`,
          }}
        />

        <div className="card-header">
          <div
            className="card-icon"
            style={{ background: rgba(product.accent, 0.1) }}
          >
            {product.icon}
          </div>
          {isLive ? (
            <div className="badge badge--live">
              <span className="badge-dot" />
              Live
            </div>
          ) : (
            <div className="badge badge--soon">Coming soon</div>
          )}
        </div>

        <h3 className="card-title">{product.name}</h3>
        <p className="card-tagline" style={{ color: rgb(product.accent) }}>
          {product.tagline}
        </p>
        <p className="card-description">{product.description}</p>

        {isLive && (
          <div className="card-cta" style={{ color: rgb(product.accent) }}>
            Try it now
            <ArrowIcon hovered={hovered} />
          </div>
        )}
      </div>
    </Wrapper>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const liveProducts = products.filter((p) => p.status === 'live')
  const soonProducts = products.filter((p) => p.status === 'soon')

  return (
    <div className={`page ${loaded ? 'is-loaded' : ''}`}>
      <div className="grid-bg" />
      <div className="hero-glow" />

      <div className="content">
        <nav className="nav fade-down">
          <div className="nav-logo">SEYN</div>
          <div className="nav-links">
            {liveProducts.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                {p.name}
              </a>
            ))}
          </div>
        </nav>

        <section className="hero fade-up">
          <h1 className="hero-title">SEYN</h1>
          <p className="hero-subtitle">
            Tools for the version of yourself you're destined to become.
          </p>
          <p className="hero-tags">Confidence · + · Connection</p>
        </section>

        <section className="products">
          <div className="products-live">
            {liveProducts.map((p, i) => (
              <ProductCard key={p.name} product={p} index={i} isLive />
            ))}
          </div>
          <div className="products-soon">
            {soonProducts.map((p, i) => (
              <ProductCard
                key={p.name}
                product={p}
                index={i + liveProducts.length}
                isLive={false}
              />
            ))}
          </div>
        </section>

        <footer className="footer fade-up" style={{ animationDelay: '0.8s' }}>
          <div className="footer-logo">SEYN</div>
          <p className="footer-tagline">
            Designed for growth.
          </p>
        </footer>
      </div>
    </div>
  )
}
