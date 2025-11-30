"use client"
interface ButtonOptionsProps {
    onClick: VoidFunction,
    ref?: React.RefObject<HTMLButtonElement | null>
}
const ButtonOptions: React.FC<ButtonOptionsProps> = ({onClick, ref}) => {
  return (
    <button 
        onClick={onClick}
        ref={ref}
        className="btn-ui flex flex-col items-center justify-center gap-0.5 size-8.5 rounded-sm bg-[#d9dbff80]"
    >
        <span className="block size-[0.3125rem] rounded-full bg-[#1D1B20]"></span>
        <span className="block size-[0.3125rem] rounded-full bg-[#1D1B20]"></span>
        <span className="block size-[0.3125rem] rounded-full bg-[#1D1B20]"></span>
    </button>
  )
}

export default ButtonOptions