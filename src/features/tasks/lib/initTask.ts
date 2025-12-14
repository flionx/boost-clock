import { Task } from "../types";

export const initTask = (title?: Task['title']): Task => ({
    id: '',
    title: title ?? '',
    complete: false,
    description: null,
    round: null,
})