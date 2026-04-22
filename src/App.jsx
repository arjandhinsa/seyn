import { useState, useEffect } from 'react'
import './App.css'

/* ---------------------------------------------------------------
 * Product data
 * -------------------------------------------------------------*/

const products = [
  {
    name: 'Seynse',
    tagline: 'Social confidence coach',
    description:
      'CBT-based graduated exposure therapy with AI coaching. Build confidence through 27 challenges across social, professional, and romantic categories.',
    status: 'live',
    url: 'https://seynse.seyn.co.uk',
    icon: 'brain',
    accent: '#8E76B3', // deep plum highlighter
    rotation: -1.4,
  },
  {
    name: 'Seynario',
    tagline: 'Dress for the scenario',
    description:
      'AI wardrobe scanner meets outfit engine. Photograph your clothes, pick your scenario, and get styled. Mix what you own with what you need.',
    status: 'live',
    url: 'https://seynario.seyn.co.uk',
    icon: 'shirt',
    accent: '#BF9644', // antique mustard / ochre highlighter
    rotation: 1.2,
  },
  {
    name: 'Be Seyn',
    tagline: 'Identity marketing platform',
    description:
      "Discover and communicate what makes you, you. For individuals and businesses alike.",
    status: 'soon',
    icon: 'spark',
    accent: '#A25D6F', // oxblood / dusty rose highlighter
    rotation: -0.9,
  },
  {
    name: 'Screyn',
    tagline: 'Screen health optimiser',
    description:
      'Computer vision eye strain and mood detection. Your desktop ally for healthier screen time, and more productive days.',
    status: 'live',
    url: 'https://screyn.seyn.co.uk',
    icon: 'eye',
    accent: '#5E7FA6', // slate / midnight-blue highlighter
    rotation: 1.6,
  },
]

/* ---------------------------------------------------------------
 * Decorative SVG components
 * -------------------------------------------------------------*/

function PaperTexture() {
  // Subtle paper grain overlay using SVG noise
  return (
    <svg className="paper-texture" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <filter id="paperNoise">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.1
                  0 0 0 0 0.08
                  0 0 0 0 0.05
                  0 0 0 0.6 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#paperNoise)" />
    </svg>
  )
}

function CoffeeStain({ className, size = 140 }) {
  // Irregular coffee ring stain with a slightly darker rim
  return (
    <svg
      className={`coffee-stain ${className || ''}`}
      width={size}
      height={size}
      viewBox="0 0 140 140"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`cs-fill-${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8B5A2B" stopOpacity="0" />
          <stop offset="70%" stopColor="#8B5A2B" stopOpacity="0.08" />
          <stop offset="88%" stopColor="#6B3F1E" stopOpacity="0.22" />
          <stop offset="95%" stopColor="#5C3818" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#6B3F1E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M70 8 C 102 8, 132 32, 132 70 C 132 108, 102 132, 70 132 C 38 132, 8 108, 8 70 C 8 32, 38 8, 70 8 Z"
        fill={`url(#cs-fill-${size})`}
      />
      <path
        d="M70 14 C 98 14, 126 36, 126 70 C 126 104, 98 126, 70 126 C 42 126, 14 104, 14 70 C 14 36, 42 14, 70 14 Z"
        fill="none"
        stroke="#6B3F1E"
        strokeOpacity="0.12"
        strokeWidth="2.2"
        strokeDasharray="60 4 20 6 40 8"
      />
    </svg>
  )
}

function MarginDoodle({ kind = 'arrow', className, color = '#1A1A1A', size = 28 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 40 40',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: `margin-doodle ${className || ''}`,
    'aria-hidden': true,
  }

  if (kind === 'arrow') {
    return (
      <svg {...common}>
        <path d="M6 22 C 14 18, 22 22, 32 14" />
        <path d="M26 11 L 32 14 L 30 20" />
      </svg>
    )
  }
  if (kind === 'star') {
    return (
      <svg {...common}>
        <path d="M20 6 L 22 17 L 33 18 L 24 25 L 27 36 L 20 30 L 13 36 L 16 25 L 7 18 L 18 17 Z" />
      </svg>
    )
  }
  if (kind === 'squiggle') {
    return (
      <svg {...common}>
        <path d="M4 22 C 8 14, 12 30, 16 22 C 20 14, 24 30, 28 22 C 32 14, 36 24, 38 22" />
      </svg>
    )
  }
  if (kind === 'asterisk') {
    return (
      <svg {...common}>
        <path d="M20 8 L 20 32" />
        <path d="M9 14 L 31 26" />
        <path d="M9 26 L 31 14" />
      </svg>
    )
  }
  if (kind === 'tick') {
    return (
      <svg {...common}>
        <path d="M6 22 L 15 31 L 34 10" />
      </svg>
    )
  }
  if (kind === 'smiley') {
    return (
      <svg {...common}>
        <circle cx="20" cy="20" r="13" />
        <circle cx="15" cy="17" r="0.9" fill={color} />
        <circle cx="25" cy="17" r="0.9" fill={color} />
        <path d="M13 23 C 16 27, 24 27, 27 23" />
      </svg>
    )
  }
  if (kind === 'circle') {
    return (
      <svg {...common}>
        <path d="M20 7 C 30 7, 33 14, 33 20 C 33 28, 27 33, 19 33 C 10 33, 7 27, 8 19 C 9 11, 14 7, 20 7 Z" />
      </svg>
    )
  }
  return null
}

function TapedCorner({ color = '#E8DBB2' }) {
  // Small piece of sketched tape on the top-left corner of a post-it
  return (
    <svg
      className="taped-corner"
      width="62"
      height="26"
      viewBox="0 0 62 26"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tape-sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="50%" stopColor={color} stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path
        d="M2 8 L 60 3 L 58 22 L 4 20 Z"
        fill="url(#tape-sheen)"
        stroke="#2A2A2A"
        strokeOpacity="0.15"
        strokeWidth="0.6"
      />
      <path d="M10 8 L 10 21" stroke="#2A2A2A" strokeOpacity="0.08" strokeWidth="0.6" />
      <path d="M50 5 L 50 21" stroke="#2A2A2A" strokeOpacity="0.08" strokeWidth="0.6" />
    </svg>
  )
}

function WavyDivider({ color = '#1A1A1A', width = 220, strokeWidth = 1.6 }) {
  return (
    <svg
      className="wavy-divider"
      width={width}
      height="16"
      viewBox="0 0 220 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 8 C 12 2, 22 14, 34 8 C 46 2, 58 14, 72 8 C 86 2, 100 14, 114 8 C 128 2, 142 14, 156 8 C 170 2, 184 14, 198 8 C 208 4, 214 10, 218 8"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HandDrawnUnderline({ color = '#1A1A1A', width = 180 }) {
  return (
    <svg
      className="hand-underline"
      width={width}
      height="10"
      viewBox="0 0 180 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 6 C 25 3, 50 8, 75 5 C 100 2, 125 8, 150 5 C 165 3, 172 7, 177 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function HandDrawnButton({ children, color = '#1A1A1A', background = 'transparent' }) {
  // Wobbly rectangular border as SVG, rendered behind button text
  return (
    <span className="hd-button-wrap">
      <svg
        className="hd-button-border"
        viewBox="0 0 200 54"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M8 4 C 40 2, 90 6, 140 3 C 170 1, 192 5, 196 10
             C 198 20, 197 34, 195 48
             C 192 52, 150 51, 100 52 C 50 53, 14 51, 6 49
             C 3 40, 2 22, 4 10 C 5 6, 6 5, 8 4 Z"
          fill={background}
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="hd-button-label" style={{ color }}>
        {children}
      </span>
    </span>
  )
}

/* ---------------------------------------------------------------
 * Hand-drawn style product icons
 * -------------------------------------------------------------*/

function ProductIcon({ kind, color = '#1A1A1A' }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  if (kind === 'brain') {
    return (
      <svg {...common}>
        <path d="M12 6 C 8 6, 5 9, 6 13 C 4 15, 5 19, 8 20 C 8 23, 11 25, 14 24 L 14 8 C 13 7, 12 6, 12 6 Z" />
        <path d="M20 6 C 24 6, 27 9, 26 13 C 28 15, 27 19, 24 20 C 24 23, 21 25, 18 24 L 18 8 C 19 7, 20 6, 20 6 Z" />
        <path d="M10 13 C 12 12, 13 14, 14 13" />
        <path d="M18 13 C 19 14, 20 12, 22 13" />
      </svg>
    )
  }
  if (kind === 'shirt') {
    return (
      <svg {...common}>
        <path d="M6 10 L 11 5 L 16 8 L 21 5 L 26 10 L 23 14 L 22 14 L 22 27 L 10 27 L 10 14 L 9 14 Z" />
        <path d="M12 5 C 14 7, 18 7, 20 5" />
      </svg>
    )
  }
  if (kind === 'eye') {
    return (
      <svg {...common}>
        <path d="M4 16 C 8 10, 12 8, 16 8 C 20 8, 24 10, 28 16 C 24 22, 20 24, 16 24 C 12 24, 8 22, 4 16 Z" />
        <circle cx="16" cy="16" r="4" />
        <circle cx="14.5" cy="14.5" r="1" fill={color} />
      </svg>
    )
  }
  if (kind === 'spark') {
    return (
      <svg {...common}>
        <path d="M16 4 L 18 14 L 28 16 L 18 18 L 16 28 L 14 18 L 4 16 L 14 14 Z" />
      </svg>
    )
  }
  return null
}

function ArrowIcon({ hovered }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className="arrow-icon"
      style={{
        transform: hovered ? 'translate(3px, -3px) rotate(-4deg)' : 'translate(0, 0)',
      }}
    >
      <path
        d="M4 14 C 7 11, 10 8, 14 5 M 9 4 C 11 4.5, 13 5, 14 5 C 14 6, 14 8, 13.5 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ---------------------------------------------------------------
 * ProductCard as a post-it note
 * -------------------------------------------------------------*/

function ProductCard({ product, index, isLive }) {
  const [hovered, setHovered] = useState(false)

  const Wrapper = isLive ? 'a' : 'div'
  const wrapperProps = isLive
    ? { href: product.url, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  const rot = product.rotation ?? 0
  const hoverRot = hovered ? rot * 0.2 : rot

  return (
    <Wrapper
      {...wrapperProps}
      className={`product-card ${isLive ? 'product-card--live' : 'product-card--soon'} ${hovered ? 'is-hovered' : ''} fade-up`}
      style={{
        animationDelay: `${0.3 + index * 0.1}s`,
        transform: `rotate(${hoverRot}deg)`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="postit" style={{ background: product.accent }}>
        <div className="postit-tape">
          <TapedCorner />
        </div>

        <div className="card-header">
          <div className="card-icon-wrap">
            <ProductIcon kind={product.icon} color="#1A1A1A" />
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
        <p className="card-tagline">{product.tagline}</p>
        <p className="card-description">{product.description}</p>

        {isLive && (
          <div className="card-cta">
            Try it now
            <ArrowIcon hovered={hovered} />
          </div>
        )}
      </div>
    </Wrapper>
  )
}

/* ---------------------------------------------------------------
 * Page
 * -------------------------------------------------------------*/

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const liveProducts = products.filter((p) => p.status === 'live')

  return (
    <div className={`page ${loaded ? 'is-loaded' : ''}`}>
      {/* Background layers — fixed so they extend across the whole page */}
      <div className="ruled-lines" aria-hidden="true" />
      <div className="margin-line" aria-hidden="true" />
      <PaperTexture />

      {/* Occasional coffee stains, positioned in viewport */}
      <CoffeeStain className="coffee-stain--one" size={160} />
      <CoffeeStain className="coffee-stain--two" size={110} />

      <div className="content">
        {/* Nav */}
        <nav className="nav fade-down">
          <div className="nav-logo">
            <img src="/seyn-logo.svg" alt="SEYN" className="nav-logo-img" />
          </div>
          <div className="nav-links">
            {liveProducts.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <HandDrawnButton>{p.name}</HandDrawnButton>
              </a>
            ))}
          </div>
        </nav>

        {/* Hero */}
        <section className="hero fade-up">
          {/* Doodles floating around the hero */}
          <MarginDoodle kind="star" className="doodle doodle-hero-star" size={26} color="#1E2B5C" />
          <MarginDoodle kind="arrow" className="doodle doodle-hero-arrow" size={44} color="#1A1A1A" />
          <MarginDoodle kind="asterisk" className="doodle doodle-hero-asterisk" size={20} color="#1E2B5C" />

          <div className="hero-logo-wrap">
            <img src="/seyn-logo.svg" alt="SEYN" className="hero-logo" />
          </div>

          <p className="hero-subtitle">
            Tools for who you're destined to become.
          </p>

          <p className="hero-tags">
            Confidence <span className="hero-tag-dot">·</span> + <span className="hero-tag-dot">·</span> Connection
          </p>

          <div className="hero-divider">
            <WavyDivider color="#1A1A1A" width={240} />
          </div>
        </section>

        {/* Products */}
        <section className="products">
          <div className="section-heading-wrap">
            <h2 className="section-heading">the products</h2>
            <HandDrawnUnderline width={170} />
          </div>

          {/* Some margin scribbles near the products */}
          <MarginDoodle kind="squiggle" className="doodle doodle-products-squiggle" size={40} color="#1A1A1A" />
          <MarginDoodle kind="tick" className="doodle doodle-products-tick" size={26} color="#1E2B5C" />
          <MarginDoodle kind="circle" className="doodle doodle-products-circle" size={32} color="#1E2B5C" />

          <div className="products-grid">
            {products.map((p, i) => (
              <ProductCard
                key={p.name}
                product={p}
                index={i}
                isLive={p.status === 'live'}
              />
            ))}
          </div>

          <div className="products-note">
            <span className="products-note-text">pick one →</span>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer fade-up" style={{ animationDelay: '0.8s' }}>
          <div className="footer-divider">
            <WavyDivider color="#1A1A1A" width={220} strokeWidth={1.4} />
          </div>
          <div className="footer-logo">SEYN</div>
          <p className="footer-tagline">Designed for growth.</p>
          <MarginDoodle kind="star" className="doodle doodle-footer-star" size={18} color="#1E2B5C" />
        </footer>
      </div>
    </div>
  )
}
