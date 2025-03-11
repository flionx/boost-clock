import { FC, ReactNode } from "react"

interface Props {
    children: ReactNode,
    idName: string,
    onChange: VoidFunction,
    checked: boolean,
}

const SwitchRowSetting: FC<Props> = ({children, idName, onChange, checked}) => {
  return (
    <div className="column-modal-menu__row">
        <label className="column-settings__label" htmlFor={idName}>{children}</label>
        <label className="switch">
            <input type="checkbox" id={idName} name={idName} 
            onChange={onChange} checked={checked}/>
            <span className="slider round"></span>
        </label>
    </div>
  )
}

export default SwitchRowSetting