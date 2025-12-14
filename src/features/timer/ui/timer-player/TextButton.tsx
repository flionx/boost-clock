"use client"
interface TextButtonProps {
    label: string,
    onClick: VoidFunction
}
const TextButton: React.FC<TextButtonProps> = ({label, onClick}) => {
  return (
    <button 
        className="hover:underline"
        onClick={onClick}
    >
        {label}
    </button>
  )
}

export default TextButton