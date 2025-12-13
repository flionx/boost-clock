"use client"
import { create } from "zustand"
import { Task } from "../types"
import { addCompleteTaskToReport } from "../lib/addCompleteTaskToReport"
import { createJSONStorage, persist } from "zustand/middleware"

interface TasksState {
    list: Task[],
    showForm: boolean,
    showCompletedTasks: boolean,
    editTaskId: Task['id'] | null,
    addTask: (task: Task) => void,
    changeTask: (task: Task) => void,
    deleteTask: (id: Task['id']) => void,
    toggleCompleteTask: (id: Task['id']) => void,
    roundTasks: VoidFunction,
    deleteTasks: VoidFunction,
    switchFormTask: (showForm: boolean) => void,
    toggleShowCompletedTasks: VoidFunction,
    setEditTaskId: (id: Task['id'] | null) => void,
    reorderTasks: (active: string, over: string) => void
}

export const useTasksStore = create<TasksState>()(
    persist(
        (set, get) => ({
            list: [],
            showForm: false,
            editTaskId: null,
            showCompletedTasks: true,
            addTask: (task) => set({ list: [...get().list, task] }),
            changeTask: (task) => set({
                list: get().list.map(t => t.id === task.id ? { ...t, ...task } : t)
            }), 
            deleteTask: (id) => set({
                list: get().list.filter(t => t.id !== id)
            }),
            toggleCompleteTask: (id) => set({ 
                list: get().list.map(t => {
                    if (t.id !== id) return t;
                    const isComplete = !t.complete;
                    addCompleteTaskToReport(isComplete, t.round);
                    return { ...t, complete: isComplete }
                })
            }),
            roundTasks: () => set({
                list: get().list.map(task => {            
                    if (!task.complete && (task.round !== null && task.round.max > 0)) {                
                        return { 
                            ...task, 
                            round: {
                                ...task.round, 
                                current: task.round.current + 1
                            }
                        }
                    } else {
                        return task
                    }
                })
            }),
            deleteTasks: () => set({ list: get().list.filter(t => t.complete) }),
            switchFormTask: (showForm) => set({showForm}),
            toggleShowCompletedTasks: () => set({ showCompletedTasks: !get().showCompletedTasks }),
            setEditTaskId: (id) => set({ editTaskId: id }),
            reorderTasks: (activeId, overId) => set({
                list: (() => {
                    const list = [...get().list];
                    const oldIndex = list.findIndex(t => t.id === activeId);
                    const newIndex = list.findIndex(t => t.id === overId);
    
                    const [item] = list.splice(oldIndex, 1);
                    list.splice(newIndex, 0, item);
                    return list;
                })()
            })
        }),
        {
            name: "tasks-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                list: state.list,
                showCompletedTasks: state.showCompletedTasks
            }),
        }
    )
)