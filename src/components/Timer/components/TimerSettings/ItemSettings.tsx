import { FC } from "react";
import { IInfo, IMins } from "../../types/types";
import ChangeButton from "./ChangeButton"
import { ChangeSwitchType } from "./TimerSettings"

interface Props {
    type: 'relax' | 'work',
    mins: IMins,
    info: IInfo,
}

const ItemSettings: FC<Props> = ({mins, info, type}) => {
    const {minutes, setMinutes} = mins;
    const {timerInfo, setTimerInfo} = info;

    function changeTime(type: ChangeSwitchType, action: string) {
    if (!timerInfo.hasTimer) {
        setTimerInfo((c) => ({...c, canChangeMinutes: true}))
    }

    switch (type) {
        case 'work':{
        if (action === '+') {
            setMinutes((min) => ({
            ...min, 
            work: min.work + 1}))
        } else if (minutes.work > 1) {
            setMinutes((min) => ({
            ...min, 
            work: min.work - 1}))
        }
            break;
        }
        case 'relax':{
        if (action === '+') {
            setMinutes((min) => ({
            ...min, 
            relax: min.relax + 1}))

        } else if (minutes.relax > 1) {
            setMinutes((min) => ({
            ...min, 
            relax: min.relax - 1}))
        }
            break;
        }
        default:
            break;
    }
    }

  return (
    <div className="settings-main__item">
        <ChangeButton className="settings-main__change" 
            onClickHandler={changeTime}
            type={type}>-</ChangeButton>
        <div className="settings-main__value">{minutes[type]}</div>
        <ChangeButton className="settings-main__change" 
            onClickHandler={changeTime}
            type={type}>+</ChangeButton>
    </div>
  )
}

export default ItemSettings