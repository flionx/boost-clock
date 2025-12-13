interface ButtonSubmitProps {
    children: React.ReactNode,
    onClick: VoidFunction
}
const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ children, onClick }) => {
  return (
    <button 
        onClick={onClick}
        className="w-full bg-secondary p-3 text-center rounded-md text-white mt-2.5 mb-6 transition-all duration-200  
            hover:bg-modal-btn-ui-active shadow-[0_2px_2px_#0000001a] active:translate-y-px active:shadow-[0_1px_2px_#0000001a]"
    >
        {children}
    </button>
  )
}

export default ButtonSubmit