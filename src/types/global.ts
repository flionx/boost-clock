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