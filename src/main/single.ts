import { createBrowserWindow } from './window'

export async function whenReady() {
  createBrowserWindow()

  await import('./shortcut')

  await import('src/server')
}
