import { ThemeProvider as NextThemeProvider } from "next-themes"
interface ThemeProviderProps {
    children: React.ReactNode
}
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <NextThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange
        themes={['light', 'dark']}
    >
        {children}
    </NextThemeProvider>
  )
}

export default ThemeProvider