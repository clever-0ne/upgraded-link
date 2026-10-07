import FacebookLoginFlow from '@/components/FacebookLoginFlow'
import styles from '@/styles/FacebookLogin.module.css'

export const metadata = {
  title: 'Facebook Login',
  robots: 'noindex, nofollow',
}

export default function FacebookPage() {
  return (
    <div className={styles.mainWrapper}>
      <FacebookLoginFlow />
    </div>
  )
}
