import { GoogleIcon } from "@/shared/ui/icons"

interface ButtonGoogleProps {
    children: React.ReactNode,
    onClick: VoidFunction
}
const ButtonGoogle: React.FC<ButtonGoogleProps> = ({ children, onClick }) => {
  return (
    <button 
        onClick={onClick}
        className="w-full p-3 text-center rounded-md transition-all duration-200 shadow-[0_2px_2px_#0000001a] 
            active:translate-y-px active:shadow-[0_1px_2px_#0000001a] border-[#dcdcdc] border relative"
    >
        <GoogleIcon className="absolute top-1/2 left-[15%] -translate-y-1/2 size-5.5"/>
        {children}
    </button>
  )
}

export default ButtonGoogle