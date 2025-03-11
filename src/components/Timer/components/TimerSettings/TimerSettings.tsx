import { FC, useEffect } from "react";
import { useAppSelector } from "../../../../hooks/useRedux";
import { IInfo, IMins } from "../../types/types";
import ItemSettings from "./ItemSettings";

interface Props {
  mins: IMins,
  info: IInfo,
}
export type ChangeSwitchType = 'work' | 'relax';

const TimerSettings: FC<Props> = ({mins, info}) => {
  const {setMinutes} = mins;
  const hasLongBreak = useAppSelector(state => state.settings.hasLongBreak);
  const {longBreak, basicBreak} = useAppSelector(state => state.settings.mainSettings);

  useEffect(() => {
    setMinutes((prev) => ({
      ...prev, 
      relax: hasLongBreak ? longBreak ?? 15 : basicBreak ?? 5
    }));
  }, [hasLongBreak]);

    return (
      <section className="main__settings settings-main">
        <div className="settings-main__top">
            <h3 className="settings-main__title">Work</h3>
            <h3 className="settings-main__title">Break</h3>
        </div>
        <div className="settings-main__row">
            <ItemSettings mins={mins} info={info} type={'work'}></ItemSettings>
            <ItemSettings mins={mins} info={info} type={'relax'}></ItemSettings>
        </div>
      </section>
    )
}

export default TimerSettings;
