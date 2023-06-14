import { Spin } from 'antd'
import styles from './index.module.less'

export default function () {
  return (
    <div className={styles.spin}>
      <Spin />
    </div>
  )
}
