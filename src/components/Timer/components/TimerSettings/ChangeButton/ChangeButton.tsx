import { FC } from "react";

interface Props {
    className: string,
    type: string,
    onClickHandler: (type: string, children: string) => void,
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