import classNames from 'classnames'
import { Outlet } from 'react-router-dom'
import styles from './main.layout.module.less'

export default function () {
  return (
    <div className={styles.main}>
      <div className={classNames(styles.navigation, 'drag')}>{''}</div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
