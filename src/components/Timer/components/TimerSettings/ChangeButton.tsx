import { FC } from "react";
import { ChangeSwitchType } from "../TimerSettings";

interface Props {
    className: string,
    type: ChangeSwitchType,
    onClickHandler: (type: ChangeSwitchType, children: string) => void,
    children: string,
}

const ChangeButton: FC<Props> = ({className, onClickHandler, type, children}) => {
    return (
        <button className={className}
        onClick={() => {
            onClickHandler(type, children)
        }}>{children}</button>
    )
}

export default ChangeButton;