import { useEffect, useRef, useState } from 'react'
import './App.css'

/* ---------------------------------------------------------------
 * Journal entries — add a new object at the TOP of this list each
 * month. Keep bodies to ~3 short paragraphs. That's the whole job.
 * -------------------------------------------------------------*/

const JOURNAL = [
  {
    no: '001',
    title: 'Three free ways to get seen this month',
    body: (
      <>
        <p>
          One: claim and finish your Google Business Profile. Photos, hours,
          a real description, and answers to the questions people already
          ask. It is the highest-return hour in local marketing and most
          businesses leave it half done.
        </p>
        <p>
          Two: pick one channel and post twice a week for a month. Not four
          channels once. The algorithm rewards consistency and so do humans;
          a thin presence everywhere reads as no presence at all.
        </p>
        <p>
          Three: put a face on it. Founder-posted content outperforms
          brand-posted content almost everywhere, because people notice
          people. You are the cheapest differentiator you own.
        </p>
      </>
    ),
  },
  {
    no: '002',
    title: "Your website isn't ugly, it's unclear",
    body: (
      <>
        <p>
          Most sites fail a five-second test: a stranger lands, and five
          seconds later cannot say what you do, who it's for, or what to
          click. Beauty doesn't fix that. Clarity does.
        </p>
        <p>
          The repair is unglamorous. One headline that says what you do in
          plain words. One action per page. Proof near the promise: a
          number, a name, a screenshot. Cut everything that exists because
          it felt professional to include.
        </p>
        <p>Run the test on your own site tonight. Ask someone who owes you nothing.</p>
      </>
    ),
  },
  {
    no: '003',
    title: 'Confidence is trained, not found',
    body: (
      <>
        <p>
          Being seen is a skill with a body attached. The reason exposure
          works, in CBT and in life, is that anxiety falls when you stay in
          the moment you wanted to escape, and your brain quietly files the
          evidence.
        </p>
        <p>
          The method is gradual: three seconds of eye contact before a
          conversation, a conversation before an ask. Rate how you feel
          before and after and the numbers do the convincing.
        </p>
        <p>
          We turned this into a product. It's called{' '}
          <a href="https://seynsei.seyn.co.uk" target="_blank" rel="noopener noreferrer">
            Seynsei
          </a>
          , and the first tier is free.
        </p>
      </>
    ),
  },
]

const SERVICES = [
  {
    idx: 'S.01',
    name: 'Marketing & attention',
    blurb:
      'Campaigns, content and positioning that earn notice instead of renting it. For brands tired of shouting into the feed.',
    tag: 'brands',
  },
  {
    idx: 'S.02',
    name: 'Social tools',
    blurb:
      'Being seen starts with being able to stand it. We build tools for the human side of visibility: confidence, connection, showing up. Seynsei is the first.',
    tag: 'people',
  },
  {
    idx: 'S.03',
    name: 'B2B growth & consulting',
    blurb:
      'Straight answers on how your business gets in front of the people it needs. Strategy you can act on the same week.',
    tag: 'business',
  },
]

const FORMSPREE_ID = 'xojoybar'

/* ---------------------------------------------------------------
 * Pieces
 * -------------------------------------------------------------*/

function Eye() {
  const eyeRef = useRef(null)
  const pupilRef = useRef(null)
  const glintRef = useRef(null)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = null
    const onMove = (e) => {
      if (raf || !eyeRef.current) return
      raf = requestAnimationFrame(() => {
        const r = eyeRef.current.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        const ang = Math.atan2(dy, dx)
        const dist = Math.min(14, Math.hypot(dx, dy) / 40)
        const px = 60 + Math.cos(ang) * dist
        const py = 33 + Math.sin(ang) * dist * 0.55
        pupilRef.current.setAttribute('cx', px)
        pupilRef.current.setAttribute('cy', py)
        glintRef.current.setAttribute('cx', px + 4)
        glintRef.current.setAttribute('cy', py - 4)
        raf = null
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="eye" aria-hidden="true" ref={eyeRef}>
      <svg viewBox="0 0 120 66">
        <g className="lid">
          <path
            d="M4 33 C 26 8, 94 8, 116 33 C 94 58, 26 58, 4 33 Z"
            fill="none"
            stroke="#1A1512"
            strokeWidth="2"
          />
          <circle ref={pupilRef} cx="60" cy="33" r="11" fill="#407373" />
          <circle ref={glintRef} cx="64" cy="29" r="3" fill="#F4F2EC" />
        </g>
      </svg>
    </div>
  )
}

function SeynseiMark() {
  return (
    <svg className="mark" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <path
        d="M50 15 A28 28 0 1 0 60 45"
        stroke="#6FA3A3"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="36" cy="36" r="7.5" fill="#6FA3A3" />
    </svg>
  )
}

function useReveals() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add('in')
            io.unobserve(x.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll('.rv').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function WorkBand() {
  const bandRef = useRef(null)
  useEffect(() => {
    const band = bandRef.current
    if (!band) return
    const onMove = (e) => {
      const r = band.getBoundingClientRect()
      band.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%')
      band.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%')
    }
    band.addEventListener('mousemove', onMove)
    return () => band.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="band section" id="work" ref={bandRef}>
      <div id="beam" />
      <div className="wrap">
        <div className="sec-head rv">
          <h2>Seen lately</h2>
          <span className="eyebrow">the proof</span>
        </div>
        <div className="cards rv">
          <a
            className="card"
            href="https://seynsei.seyn.co.uk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="status">
              <span className="dot" />
              Live
            </span>
            <SeynseiMark />
            <h3>Seynsei</h3>
            <div className="tagline">Social confidence coach</div>
            <p>
              Small real-world confidence challenges, graded from a moment of
              eye contact to the conversations you avoid. Rate the anxiety
              before and after, and talk it through with a calm CBT-informed
              coach.
            </p>
            <span className="go">Try it free →</span>
          </a>
          <div className="card card--reserved">
            <h3>This space is reserved.</h3>
            <p>
              The next thing we make seen could be yours. Bring us a brand, a
              product or a problem.
            </p>
            <a className="go" href="#enquire">
              Enquire below →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function EnquiryForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-done rv in">
        <p className="serif done-line">
          Consider yourself <em className="italic">seyn</em>.
        </p>
        <p className="side-note">
          Your enquiry is in. We reply within 48 hours, usually sooner.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="rv">
      <div className="two">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="need">What do you need?</label>
        <select id="need" name="need" defaultValue="Marketing and attention">
          <option>Marketing and attention</option>
          <option>Social tools</option>
          <option>Consulting</option>
          <option>Something else entirely</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Tell us about it</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="What are you building, and who needs to see it?"
          required
        />
      </div>
      <button className="btn btn--solid" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send it'}
      </button>
      {status === 'error' && (
        <p className="side-note form-error">
          That didn't send. Try again, or email{' '}
          <a href="mailto:hello@seyn.co.uk">hello@seyn.co.uk</a> directly.
        </p>
      )}
      <p className="side-note">
        Prefer email? <a href="mailto:hello@seyn.co.uk">hello@seyn.co.uk</a>
      </p>
    </form>
  )
}

/* ---------------------------------------------------------------
 * Page
 * -------------------------------------------------------------*/

export default function App() {
  useReveals()

  return (
    <>
      <nav>
        <div className="wrap nav-in">
          <a href="#top" className="wordmark" aria-label="SEYN home">
            <img className="wordmark-eye" src="/favicon.svg" alt="SEYN" />
          </a>
          <div className="nav-links">
            <a href="#journal">Journal</a>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a
              className="nav-ig"
              href="https://instagram.com/getseyn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SEYN on Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a className="btn" href="#enquire">
              Enquire
            </a>
          </div>
        </div>
      </nav>

      <header className="hero wrap" id="top">
        <div className="hero-meta eyebrow">
          <span>The SEYN journal · field notes on attention</span>
          <span>United Kingdom</span>
        </div>
        <h1>
          Notes on getting <span className="u">seyn</span>.
        </h1>
        <p className="sub">
          SEYN is an attention studio. This is the notebook we work from:
          honest, useful notes on how brands, products and people get noticed.
          Take the free help. Hire us when you want it done for you.
        </p>
        <div className="ctas">
          <a className="btn btn--solid" href="#journal">
            Read the notes
          </a>
          <a className="btn" href="#enquire">
            Start an enquiry
          </a>
        </div>
        <Eye />
      </header>

      <section className="section wrap" id="journal">
        <div className="sec-head rv">
          <h2>
            The <em className="serif italic">journal</em>
          </h2>
          <span className="eyebrow">free help, no email wall</span>
        </div>
        <div className="ledger rv">
          {JOURNAL.map((e) => (
            <details className="entry" key={e.no}>
              <summary>
                <span className="date">NO. {e.no}</span>
                <h3>{e.title}</h3>
                <span className="read">1 min →</span>
              </summary>
              <div className="body">{e.body}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="section wrap" id="services">
        <div className="sec-head rv">
          <h2>
            When you'd rather we <em className="serif italic">did it</em>
          </h2>
          <span className="eyebrow">the services behind the notes</span>
        </div>
        <div className="ledger rv">
          {SERVICES.map((s) => (
            <div className="row" key={s.idx}>
              <span className="idx">{s.idx}</span>
              <h3>{s.name}</h3>
              <p>{s.blurb}</p>
              <span className="tag">{s.tag}</span>
            </div>
          ))}
        </div>
      </section>

      <WorkBand />

      <section className="section wrap about" id="about">
        <span className="eyebrow rv">Why SEYN exists</span>
        <p className="rv big-line">
          Good things go unnoticed every day. Good businesses, good products,
          good people. We think that's a design problem, and{' '}
          <em>design problems can be solved.</em>
        </p>
        <div className="cols rv">
          <div>
            SEYN Ltd is a UK studio working across marketing, product and
            consulting. One team, one obsession: engineering the moment where
            the right people finally notice.
          </div>
          <div>
            We take on a small number of clients at a time and build our own
            products between engagements, so every promise we make to you has
            been tested on ourselves first.
          </div>
        </div>
      </section>

      <section className="section enquiry" id="enquire">
        <div className="wrap">
          <div className="sec-head rv">
            <h2>
              Be <em className="serif italic">seyn</em> next
            </h2>
            <span className="eyebrow">replies within 48 hours</span>
          </div>
          <EnquiryForm />
        </div>
      </section>

      <footer className="wrap">
        <div className="foot">
          <div className="rv">
            <img className="foot-logo" src="/favicon.svg" alt="" aria-hidden="true" />
            <div className="big">
              Get <em>seen.</em>
            </div>
          </div>
          <div className="foot-links rv">
            <a href="mailto:hello@seyn.co.uk">hello@seyn.co.uk</a>
            <br />
            <a href="https://instagram.com/getseyn" target="_blank" rel="noopener noreferrer">
              @getseyn
            </a>{' '}
            · SEYN on Instagram
            <br />
            <a href="https://instagram.com/seynseiapp" target="_blank" rel="noopener noreferrer">
              @seynseiapp
            </a>{' '}
            · Seynsei on Instagram
          </div>
        </div>
        <div className="legal">
          <span>© 2026 SEYN Ltd. Registered in England.</span>
          <span>
            <a href="https://seynsei.seyn.co.uk/privacy.html">Privacy</a>
          </span>
        </div>
      </footer>
    </>
  )
}
