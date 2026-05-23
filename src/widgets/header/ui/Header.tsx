import { ThemeToggleButton } from "@/features/theme-toggle"
import DesktopMenu from "./DesktopMenu"
import MobileMenuButton from "./mobile/MobileMenuButton"

const Header = () => {
  return (
    <header className="bg-secondary py-1.5 relative">
      <div className="main-wrapper flex items-center justify-between">
        <h1 className="text-4xl">BoostClock</h1>
        <ul className="flex items-center gap-5">
          <ThemeToggleButton />
          <DesktopMenu />
          <MobileMenuButton />
        </ul>
      </div>
    </header>
  )
}

export default Header