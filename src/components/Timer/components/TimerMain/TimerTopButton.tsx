import { FC, ReactNode } from "react"
interface Props {
    children: ReactNode,
    onClick: VoidFunction,
    conditionClass: boolean
}

const TimerTopButton: FC<Props> = ({children, onClick, conditionClass}) => {
  return (
    <button 
        onClick={onClick}
        className={conditionClass ? "timer__top-btn top-btn--active" : "timer__top-btn"}
    >{children}</button>
  )
}

export default TimerTopButton