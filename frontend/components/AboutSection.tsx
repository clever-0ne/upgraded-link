import Image from 'next/image'
import styles from '@/styles/AboutSection.module.css'

export default function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <Image
        src="/images/new.jpg"
        alt="About PodStream Global"
        width={600}
        height={400}
        className={styles.aboutImg}
      />
      <div className={styles.aboutContent}>
        <h2>The Collaborative Ecosystem</h2>
        <p>
          PodStream Global unites creators and listeners on a single audio-first platform across all Global
          countries. Combining a world-class streaming pipeline with cutting-edge tech infrastructure, this platform
          empowers creators, supports fair monetization, and aims to enrich the Global podcast ecosystem by delivering
          highly diverse and readily accessible content.
        </p>
      </div>
    </section>
  )
}
