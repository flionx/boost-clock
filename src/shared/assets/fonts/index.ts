import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local"

export const itim = localFont({
  src: [{
    path: './itim.otf',
    weight: '400',
    style: 'normal'
  }],
  variable: '--font-itim',
  display: 'swap'
})

export const literal = localFont({
  src: [{
    path: './literal.woff2',
    weight: '400',
    style: 'normal'
  }],
  variable: '--font-literal',
  display: 'swap'
})

export const jetbrains_mono = JetBrains_Mono({
  variable: '--font-jetbrains',
  style: "normal",
  weight: '400'
})
