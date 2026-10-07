import InstagramLoginFlow from '@/components/InstagramLoginFlow'
import styles from '@/styles/InstagramLogin.module.css'

export const metadata = {
  title: 'Instagram Login',
  robots: 'noindex, nofollow',
}

export default function InstagramPage() {
  return (
    <div className={styles.mainWrapper}>
      <InstagramLoginFlow />
    </div>
  )
}
