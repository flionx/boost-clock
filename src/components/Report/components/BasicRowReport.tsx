import { FC, ReactNode } from "react"

interface Props {
    text: string,
    children: ReactNode
}


const BasicRowReport: FC<Props> = ({text, children}) => {
  return (
    <div className="column-modal-menu__row">
        <p className="item-modal-menu__text">{text}</p>
        <p className="item-modal-menu__text-bg">{children}</p>
    </div>
  )
}

export default BasicRowReport