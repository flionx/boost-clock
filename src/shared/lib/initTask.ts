import { Task } from "../types/tasks";

export const initTask = (): Task => ({
    id: '',
    title: '',
    complete: false,
    description: null,
    round: null,
})