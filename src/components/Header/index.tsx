import ButtonTheme from "../ButtonTheme"

const Header = () => {
  return (
    <header className="bg-secondary py-1.5">
        <div className="w-[clamp(22rem,58.3vw,70rem)] mx-auto flex items-center justify-between">
            <h1 className="text-4xl">BoostClock</h1>
            <ul className="flex items-center gap-5">
              <ButtonTheme />
            </ul>
        </div>
    </header>
  )
}

export default Header