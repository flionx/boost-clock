interface ButtonSubmitProps {
  children: React.ReactNode,
  onClick: VoidFunction
}
const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-secondary p-3 text-center rounded-md text-white mt-2.5 mb-6 transition-all duration-200  
        hover:bg-action-secondary-active shadow-card active:translate-y-px active:shadow-card-active"
    >
      {children}
    </button>
  )
}

export default ButtonSubmit