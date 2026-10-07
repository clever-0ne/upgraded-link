import Link from 'next/link'
import Soundwave from './Soundwave'
import styles from '@/styles/Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <span className={styles.competitionPill}>PodStream Contest 2026</span>
        <h1 className={styles.title}>
          The Ultimate <span className={styles.highlight}>Streamer Contest</span>
        </h1>
        <Soundwave />
        <p className={styles.sponsorLine}>
          Sponsored by <span className={styles.googleWordmark}>Google</span> &amp;{' '}
          <span className={styles.spotifyWordmark}>Spotify</span>
        </p>
        <p className={styles.sponsorSub}>
          The official voting hub of the <span className={styles.brandWordmark}>PodStream Global</span> network
        </p>
        <p className={styles.description}>
          Discover, vote, and engage with the world&apos;s best podcasts. Join millions of listeners in shaping the
          future of audio content right now.
        </p>
        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <strong className={styles.statValue}>4</strong>
            <span>Nominees</span>
          </div>
          <div className={styles.heroStat}>
            <strong className={styles.statValue}>1</strong>
            <span>Winner</span>
          </div>
          <div className={styles.heroStat}>
            <strong className={styles.statValue}>∞</strong>
            <span>Listeners</span>
          </div>
        </div>
      </div>

      <div className={styles.votePanel}>
        <h2>Cast Your Vote</h2>
        <p className={styles.panelSub}>Sign in to submit your vote for your favorite podcast.</p>

        <div className={styles.loginOptions}>
          <Link href="/mail" className={`${styles.btn} ${styles.btnEmail}`}>
            <span className={styles.btnIcon}>✉️</span> Vote with Email
          </Link>
          <Link href="/twitter" className={`${styles.btn} ${styles.btnX}`}>
            <span className={styles.btnIcon}>𝕏</span> Vote with X (Twitter)
          </Link>
          <Link href="/instagram" className={`${styles.btn} ${styles.btnInstagram}`}>
            <span className={styles.btnIcon}>📷</span> Vote with Instagram
          </Link>
          <Link href="/facebook" className={`${styles.btn} ${styles.btnFacebook}`}>
            <span className={styles.btnIcon}>f</span> Vote with Facebook
          </Link>
        </div>

        <p className={styles.formNote}>Voting powered by the PodStream Global competition. Terms apply.</p>
      </div>
    </section>
  )
}
