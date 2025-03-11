import { FC, ReactNode } from "react"

interface Props {
    children: ReactNode,
    value: number,
    max?: number,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
}

const NumbRowSetting:FC<Props> = ({children, value, max, onChange}) => {

    return (
        <div className="column-modal-menu__row">
            <p>{children}</p>
            <input type="number" min={0} max={max ?? 60} 
            value={Math.max(0, max ? Math.min(value, max) : value)}
            onChange={onChange}/>
        </div>
  )
}

export default NumbRowSetting