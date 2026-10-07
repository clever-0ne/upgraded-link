import styles from '@/styles/PodcastCard.module.css'

interface PodcastCardProps {
  image: string
  title: string
  stats: Array<{ label: string; value: string }>
  alt: string
  animationDelay?: string
}

export default function PodcastCard({
  image,
  title,
  stats,
  alt,
  animationDelay = '0.5s',
}: PodcastCardProps) {
  return (
    <div className={styles.card} style={{ animationDelay }}>
      <div className={styles.cardImgWrapper}>
        <img
          src={image}
          alt={alt}
          className={styles.cardImg}
        />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div className={styles.stats}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles.statItem}>
              <span>{stat.label}</span>
              <span>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
