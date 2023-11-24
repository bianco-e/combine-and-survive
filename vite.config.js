import path from 'path'
const folderName = `${path.basename(process.cwd())}/`

export default {
  root: 'src',
  base: '/',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    assetsDir: './'
  }
}
