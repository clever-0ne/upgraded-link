import styles from '@/styles/AboutSection.module.css'

export default function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <img
        src="/images/new.jpg"
        alt="About PodStream Global"
        className={styles.aboutImg}
      />
      <div className={styles.aboutContent}>
        <h2 className={styles.aboutHeading}>The Collaborative Ecosystem</h2>
        <p className={styles.aboutText}>
          PodStream Global unites creators and listeners on a single audio-first platform across all Global
          countries. Combining a world-class streaming pipeline with cutting-edge tech infrastructure, this platform
          empowers creators, supports fair monetization, and aims to enrich the Global podcast ecosystem by delivering
          highly diverse and readily accessible content.
        </p>
      </div>
    </section>
  )
}
