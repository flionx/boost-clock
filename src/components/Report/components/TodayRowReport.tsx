import { FC, ReactNode } from "react"

interface Props {
    text: string,
    children: ReactNode
}

const TodayRowReport: FC<Props> = ({text, children}) => {
  return (
    <div className="colum-modal-menu__item item-modal-menu">
        <p className="item-modal-menu__text">{text}</p>
        <p className="item-modal-menu__stat">{children}</p>
    </div>
  )
}

export default TodayRowReport