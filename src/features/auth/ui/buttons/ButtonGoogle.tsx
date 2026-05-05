import { GoogleIcon } from "@/shared/ui/icons"

interface ButtonGoogleProps {
  children: React.ReactNode,
  onClick: VoidFunction
}
const ButtonGoogle: React.FC<ButtonGoogleProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full p-3 text-center rounded-md transition-all duration-200 shadow-card 
        active:translate-y-px active:shadow-card-active border-[#dcdcdc] border relative"
    >
      <GoogleIcon className="absolute top-1/2 left-[15%] -translate-y-1/2 size-5.5" />
      {children}
    </button>
  )
}

export default ButtonGoogle