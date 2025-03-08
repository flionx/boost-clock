import { IMainSettings, IMainTask, IReportState } from "../store/types/types"

export type TaskType = {
    id: number,
    title: string,
    description: string | null,
    complete: boolean,
    deadline: number | null,
    round: number | null,
}

export interface IAchiev {
    img: string,
    title: string,
    text: string,
    step: number,
    max: number,
    lock: boolean
}

export interface IUploadData {
    achievement: IAchiev[],
    mainTask: IMainTask,
    report: Pick<IReportState, 'tasks'|'timer'|'today'>
    settings: IMainSettings,
    tasks: TaskType[]
}

export interface IQuote {
    text: string,
    author: string
}