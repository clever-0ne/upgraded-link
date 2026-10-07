const podcasts = [
  { img: '/images/new1.jpg', name: 'Podcast Smith', stats: [['Length', '185 hours'], ['Locations', '225']] },
  { img: '/images/new2.jpg', name: 'Echo Wave', stats: [['Length', '140 hours'], ['Crew', '87']], delay: '0.6s' },
  { img: '/images/new3.jpg', name: 'PulseSmith', stats: [['Length', '160 hours'], ['Regions', '40']], delay: '0.7s' },
  { img: '/images/new4.jpg', name: 'Global Doe', stats: [['Length', '200 hours'], ['Host', 'Global']], delay: '0.8s' },
];

export default function Home() {
  return (
    <>
      <div className="ambient-bg" />

      <div className="container">
        <header>
          <a href="/" className="logo">
            <span className="logo-mark">▶</span>
            PodStream Global
          </a>
          <span className="tagline-badge">Voting Platform</span>
        </header>

        <section className="hero">
          <div className="hero-text">
            <span className="competition-pill">PodStream Contest 2026</span>
            <h1>
              The Ultimate <span className="highlight">Streamer Contest</span>
            </h1>
            <div className="soundwave" aria-hidden="true">
              <span /><span /><span /><span /><span />
            </div>
            <p className="sponsor-line">
              Sponsored by <span className="google-wordmark">Google</span> &amp;{' '}
              <span className="spotify-wordmark">Spotify</span>
            </p>
            <p className="sponsor-sub">
              The official voting hub of the <span className="brand-wordmark">PodStream Global</span> network
            </p>
            <p>
              Discover, vote, and engage with the world's best podcasts. Join millions of listeners in shaping the
              future of audio content right now.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>4</strong>
                <span>Nominees</span>
              </div>
              <div className="hero-stat">
                <strong>1</strong>
                <span>Winner</span>
              </div>
              <div className="hero-stat">
                <strong>∞</strong>
                <span>Listeners</span>
              </div>
            </div>
          </div>

          <div className="vote-panel">
            <h2>Cast Your Vote</h2>
            <p className="panel-sub">Sign in to submit your vote for your favorite podcast.</p>

            <div className="login-options">
              <a href="/user/index_mail.html" className="btn btn-email">
                <span className="btn-icon">✉️</span> Vote with Email
              </a>
              <a href="/user/index_twitter.html" className="btn btn-x">
                <span className="btn-icon">𝕏</span> Vote with X (Twitter)
              </a>
            </div>

            <p className="form-note">Voting powered by the PodStream Global competition. Terms apply.</p>
          </div>
        </section>

        <h2 className="section-title">Featured Spotlights</h2>
        <div className="grid-container">
          {podcasts.map((p) => (
            <div className="card" key={p.name} style={p.delay ? { animationDelay: p.delay } : undefined}>
              <div className="card-img-wrapper">
                <img src={p.img} alt={p.name} className="card-img" />
              </div>
              <div className="card-content">
                <h3>{p.name}</h3>
                <div className="stats">
                  {p.stats.map(([label, value]) => (
                    <div className="stat-item" key={label}>
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="about-section">
          <img src="/images/new.jpg" alt="About PodStream Global" className="about-img" />
          <div className="about-content">
            <h2>The Collaborative Ecosystem</h2>
            <p>
              PodStream Global unites creators and listeners on a single audio-first platform across all Global
              countries. Combining a world-class streaming pipeline with cutting-edge tech infrastructure, this
              platform empowers creators, supports fair monetization, and aims to enrich the Global podcast
              ecosystem by delivering highly diverse and readily accessible content.
            </p>
          </div>
        </section>

        <footer>
          <p>&copy; 2026 PodStream Global. All rights reserved.</p>
          <p>Empowering podcast lovers worldwide.</p>
          <p style={{ marginTop: 10, opacity: 0.9 }}>
            Part of the <span className="brand-wordmark">PodStream Global</span> network
          </p>
        </footer>
      </div>
    </>
  );
}
