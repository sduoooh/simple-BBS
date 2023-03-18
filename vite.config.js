import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import path from 'node:path'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
import {presetTypography} from "unocss"
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
            UnoCSS({presets: [
              presetUno(),
              presetAttributify(),
              presetTypography(),
            ],}),],
  resolve: {
              alias: {
                '~/': `${path.resolve(__dirname, 'src')}/`
              }
            }
})
