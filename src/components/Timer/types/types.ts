import { TSetState } from "../../../types/global"

export type TypeTime = {
    work: number,
    relax: number,
}
export type TTimerInfo = {
    hasTimer: boolean,
    nowIsWork: boolean,
    canChangeMinutes: boolean,
}
export interface IMins {
    minutes: TypeTime,
    setMinutes: TSetState<TypeTime>
}
export interface IInfo {
    timerInfo: TTimerInfo,
    setTimerInfo: TSetState<TTimerInfo>
}