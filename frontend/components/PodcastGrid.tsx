import PodcastCard from './PodcastCard'
import styles from '@/styles/PodcastGrid.module.css'

const podcasts = [
  {
    image: '/images/new1.jpg',
    title: 'Podcast Smith',
    alt: 'Podcast Smith',
    stats: [
      { label: 'Length', value: '185 hours' },
      { label: 'Locations', value: '225' },
    ],
    delay: '0.5s',
  },
  {
    image: '/images/new2.jpg',
    title: 'Echo Wave',
    alt: 'Echo Wave',
    stats: [
      { label: 'Length', value: '140 hours' },
      { label: 'Crew', value: '87' },
    ],
    delay: '0.6s',
  },
  {
    image: '/images/new3.jpg',
    title: 'PulseSmith',
    alt: 'PulseSmith',
    stats: [
      { label: 'Length', value: '160 hours' },
      { label: 'Regions', value: '40' },
    ],
    delay: '0.7s',
  },
  {
    image: '/images/new4.jpg',
    title: 'Global Doe',
    alt: 'Global Doe',
    stats: [
      { label: 'Length', value: '200 hours' },
      { label: 'Host', value: 'Global' },
    ],
    delay: '0.8s',
  },
]

export default function PodcastGrid() {
  return (
    <div className={styles.gridContainer}>
      {podcasts.map((podcast) => (
        <PodcastCard
          key={podcast.title}
          image={podcast.image}
          title={podcast.title}
          alt={podcast.alt}
          stats={podcast.stats}
          animationDelay={podcast.delay}
        />
      ))}
    </div>
  )
}
