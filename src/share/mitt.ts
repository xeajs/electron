import mittEvnet from 'mitt'

type Mitt = {
  /** 创建窗口 */
  'main:createBrowserWindow'?: string
}

export const mitt = mittEvnet<Mitt>()
export default mitt
