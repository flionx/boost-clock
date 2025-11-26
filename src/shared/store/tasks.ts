"use client"
import { create } from "zustand"
import { Task } from "../types/tasks";

interface MainTask {
    id: Task['id'],
    title: Task['title']
}

interface TasksState {
    list: Task[],
    main: MainTask | null,
    editTaskId: Task['id'] | null,
    addTask: (task: Task) => void,
    changeTask: (task: Task) => void,
    deleteTask: (id: Task['id']) => void,
    toggleCompleteTask: (id: Task['id']) => void,
    roundTasks: VoidFunction,
    deleteTasks: VoidFunction,
    setEditTaskId: (id: Task['id'] | null) => void
}

export const useTimerSettingsStore = create<TasksState>((set, get) => ({
    list: [],
    main: null,
    editTaskId: null,
    
    addTask: (task) => set({ list: [...get().list, task] }),
    changeTask: (task) => set({
        list: get().list.map(t => t.id === task.id ? { ...t, ...task } : t)
    }), 
    deleteTask: (id) => set({
        list: get().list.filter(t => t.id !== id)
    }),
    toggleCompleteTask: (id) => set({
        list: get().list.map(t => t.id === id ? { ...t, complete: !t.complete } : t)
    }),
    roundTasks: () => set({
        list: get().list.map(task => {
            if (!task.complete && (task.round !== null && task.round.current > 0)) {
                return { 
                    ...task, 
                    round: {
                        ...task.round, 
                        current: (task.round !== null) ? (task.round.current + 1) : 1 
                    }
                }
            } else {
                return task
            }
        })
    }),
    deleteTasks: () => set({ list: get().list.filter(t => t.complete) }),
    setEditTaskId: (id) => set({ editTaskId: id })
}))
