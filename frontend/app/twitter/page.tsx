import TwitterLoginFlow from '@/components/TwitterLoginFlow'
import styles from '@/styles/TwitterLogin.module.css'

export const metadata = {
  title: 'Log in / X',
}

export default function TwitterPage() {
  return (
    <div className={styles.loginShell}>
      <TwitterLoginFlow />
    </div>
  )
}
