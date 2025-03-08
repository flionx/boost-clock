import { useAppSelector } from "../../../../hooks/useRedux";
import ChangeButton from "./ChangeButton/ChangeButton"
import { FC, useEffect } from "react";
import { IMinutes, ITimerInfo } from "../../Timer";

interface Props {
  mins: {
    minutes: IMinutes,
    setMinutes: (value: IMinutes | any) => void,
  },
  info: {
    timerInfo: ITimerInfo,
    setTimerInfo: (value: ITimerInfo | any) => void,
  }
}

const TimerSettings: FC<Props> = ({mins, info}) => {

  const {minutes, setMinutes} = mins;
  const {timerInfo, setTimerInfo} = info;

  const hasLongBreak = useAppSelector(state => state.settings.hasLongBreak);
  const {longBreak, basicBreak} = useAppSelector(state => state.settings.mainSettings);

  useEffect(() => {
    setMinutes((prev: IMinutes) => ({
      ...prev, 
      relax: hasLongBreak ? longBreak ?? 15 : basicBreak ?? 5
    }));
  }, [hasLongBreak]);
  
  function changeTime(type: string, action: string) {
    if (!timerInfo.hasTimer) {
      setTimerInfo((c: ITimerInfo) => ({...c, canChangeMinutes: true}))
    }

    switch (type) {
      case 'work':{
        if (action === '+') {
          setMinutes((min: IMinutes) => ({
            ...min, 
            work: min.work + 1}))
        } else if (minutes.work > 1) {
          setMinutes((min: IMinutes) => ({
            ...min, 
            work: min.work - 1}))
        }
        break;
      }
      case 'relax':{
        if (action === '+') {
          setMinutes((min: IMinutes) => ({
            ...min, 
            relax: min.relax + 1}))

        } else if (minutes.relax > 1) {
          setMinutes((min: IMinutes) => ({
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
    <section className="main__settings settings-main">

            <div className="settings-main__top">
                <h3 className="settings-main__title">Work</h3>
                <h3 className="settings-main__title">Break</h3>
            </div>

            <div className="settings-main__row">

                <div className="settings-main__item">
                    <ChangeButton className="settings-main__change" 
                        onClickHandler={changeTime}
                        type="work">-</ChangeButton>
                    <div className="settings-main__value">{minutes.work}</div>
                    <ChangeButton className="settings-main__change" 
                        onClickHandler={changeTime}
                        type="work">+</ChangeButton>
                </div>

                <div className="settings-main__item">
                    <ChangeButton className="settings-main__change" 
                        onClickHandler={changeTime}
                        type="relax">-</ChangeButton>
                    <div className="settings-main__value">{minutes.relax}</div>
                    <ChangeButton className="settings-main__change" 
                        onClickHandler={changeTime}
                        type="relax">+</ChangeButton>
                </div>

            </div>

        </section>
    )
}

export default TimerSettings;
