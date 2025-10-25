import { Itim, JetBrains_Mono, Poppins } from "next/font/google";
import localFont from "next/font/local"

export const itim = Itim({
    variable: '--font-itim',
    weight: ['400']
})

export const literal = localFont({
    src: [{ 
        path: './Literal-Regular.woff2',
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

export const poppins = Poppins({
    variable: '--font-poppins',
    style: "normal",
    weight: '400'
})