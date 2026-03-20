import path from 'path'
import { defineConfig } from 'vite'

const folderName = `${path.basename(process.cwd())}/`
void folderName

export default defineConfig({
  root: 'src',
  base: '/',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    assetsDir: './'
  }
})
