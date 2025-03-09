import { IAchiev } from "../../types/global";
import { ITask } from "../../types/global";
// types for slices
export interface ITasksState {
    editTaskId: number | null,
    tasks: ITask[],
}
export interface IAchievementState {
    newAchievs: number,
    showAchiev: boolean,
    achievs: IAchiev[],
}

export interface ISettings {
    showSettings: boolean,
    hasLongBreak: boolean,
    roundsToBreak: number,
    waitModal: IWaitModal,
    mainSettings: IMainSettings,  
} 

export interface IMainSettings {
    autoToWork: boolean,
    autoToRelax: boolean,
    basicBreak: number, 
    longBreak: number,
    longBreakInterval: number,
    soundOn: boolean,
    repeatSound: number,
    colorTheme: 'light' | 'dark',
}
export interface IWaitModal {
    status: 'orange' | 'red' | 'green',
    hasWait: boolean,
    message: string, 
}

export interface IMainTask {
    id: number | null,
    title: string | null,
}


export interface IReportState {
    date: string,
    showReport: boolean,
    today: IReportToday,
    timer: IReportTimer,
    tasks: IReportTasks,
}
export interface IReportToday {
    workTime: number,
    relaxTime: number,
    tCompletedTasks: number,
}
export interface IReportTimer {
    totalWorkTime: number,
    totalRelaxTime: number,
    pomodoroRounds: number,
}
export interface IReportTasks {
    aCompletedTasks: number,
    onTime: number,
    outOfTime: number,
}