export interface Task {
    id: string,
    title: string,
    description: null | string,
    complete: boolean,
    round: {
        current: number,
        max: number
    } | null
}