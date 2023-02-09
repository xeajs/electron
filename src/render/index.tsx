import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { router } from './router'
import { init, mount, unmount } from './service/init'
import './styles/style.css'

init()
export default function App() {
  useEffect(() => {
    mount()
    return () => {
      unmount()
    }
  }, [])

  return (
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={createBrowserRouter(router)} />
    </ConfigProvider>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(<App />)
