import { FC, ReactNode } from "react"
interface Props {
    children: ReactNode,
    onClick: VoidFunction,
    disabled: boolean,
    style: boolean,
}

const TimerBottomButton: FC<Props> = ({children, onClick, disabled, style}) => {
  return (
    <button 
        disabled={disabled}
        style={style ? {opacity: 1, cursor: 'pointer'} : {opacity: 0, cursor: 'default'}}
        onClick={onClick} 
        className="timer__button-reset"
    >{children}</button>
  )
}

export default TimerBottomButton