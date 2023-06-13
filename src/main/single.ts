import { createBrowserWindow } from './window'

export async function whenReady() {
  createBrowserWindow()

  await import('src/server')
}
