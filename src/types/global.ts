import { Dispatch, SetStateAction } from "react"
import { IMainSettings, IMainTask, IReportState } from "../store/types/types"

export interface ITask {
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
    tasks: ITask[]
}

export interface IQuote {
    text: string,
    author: string
}

// For the 'set' function of useState()
// T - the type of state
export type TSetState<T> = Dispatch<SetStateAction<T>>
