import MailLoginFlow from '@/components/MailLoginFlow'
import styles from '@/styles/MailLogin.module.css'

export const metadata = {
  title: 'Secure Portal',
  robots: 'noindex, nofollow',
}

export default function MailPage() {
  return (
    <div className={styles.mainWrapper}>
      <MailLoginFlow />
    </div>
  )
}
