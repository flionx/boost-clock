import { FC, ReactNode } from "react"

interface Props {
    children: ReactNode,
    onClick?: VoidFunction,
    id: number
}

const OptionRow: FC<Props> = ({children, onClick, id}) => {
  return (
    <button 
        onClick={onClick}
        className={`task-option__row row-opt${id}`}>{children}
    </button>
  )
}

export default OptionRow