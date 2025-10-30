import { ThemeToggleButton } from "@/features/theme-toggle"
import MenuButton from "./MenuButton"
import { ReportIcon } from "@/shared/ui/icons"

const Header = () => {
  return (
    <header className="bg-secondary py-1.5">
        <div className="w-[clamp(22rem,58.3vw,70rem)] mx-auto flex items-center justify-between">
            <h1 className="text-4xl">BoostClock</h1>
            <ul className="flex items-center gap-5">
              <ThemeToggleButton />
              <MenuButton icon={ReportIcon}>Report</MenuButton>
            </ul>
        </div>
    </header>
  )
}

export default Header