import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PodcastGrid from '@/components/PodcastGrid'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
import styles from '@/styles/page.module.css'

export default function Home() {
  return (
    <>
      <div className={styles.ambientBg}></div>
      <div className={styles.container}>
        <Header />
        <Hero />
        <h2 className={styles.sectionTitle}>Featured Spotlights</h2>
        <PodcastGrid />
        <AboutSection />
        <Footer />
      </div>
    </>
  )
}
