import { Link } from 'react-router-dom'
import styles from './index.module.less'

export default function Home() {
  return (
    <div className={styles.home}>
      <header className='drag' />
      <main>
        home1
        <Link to='/login'>登录</Link>
      </main>
    </div>
  )
}
