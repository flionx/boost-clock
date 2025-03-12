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

        if (!timerInfo.hasTimer && !timerInfo.canChangeMinutes) {
            setTimerInfo((c) => ({ ...c, canChangeMinutes: true }));
        }

        setMinutes((prev) => {
            const diff = (action === '+') ? 1 : -1;
            
            if (type === 'work' && (action === '+' || prev.work > 1)) {
                return { ...prev, work: prev.work + diff };
            }
            if (type === 'relax' && (action === '+' || prev.relax > 1)) {
                return { ...prev, relax: prev.relax + diff };
            }
            return prev;
        });
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