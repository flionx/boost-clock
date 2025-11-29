import React from 'react'
interface ButtonWithIconProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>,
  label: string,
  onClick: VoidFunction
}
const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  icon: Icon, 
  label,
  onClick
}) => {
  return (
    <button 
      onClick={onClick}
      className="flex justify-between items-center w-full py-1 px-2.5 hover:bg-[#c8ceeb] text-black"
    >
      {label}
      <Icon className="fill-black size-4.5" />
    </button>
  )
}

export default ButtonWithIcon