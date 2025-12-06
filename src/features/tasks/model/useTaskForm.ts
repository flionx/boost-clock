"use client"
import { useState } from 'react'
import { useTasksStore } from '@/features/tasks/store/tasks'
import { parseNumberInput } from '@/shared/lib/parseNumberInput'
import { validateTaskRound } from '../lib/validateTaskRound'
import { initTask } from '../lib/initTask'
import { Task } from '../types'

type EditTask = Omit<Task, 'id'>

const useTaskForm = ({task}: { task?: Task }) => {
    const [editTask, setEditTask] = useState<Task>(task ? task : initTask());
    const addTask = useTasksStore(state => state.addTask);
    const setEditTaskId = useTasksStore(state => state.setEditTaskId);
    const switchFormTask = useTasksStore(state => state.switchFormTask);
    const changeTask = useTasksStore(state => state.changeTask);

    const change = <K extends keyof EditTask>(key: K, value: EditTask[K]) => {
        setEditTask(t => ({ ...t, [key]: value }))
    }

    const changeRound = (e: React.ChangeEvent<HTMLInputElement>) => {
        const max = parseNumberInput(e.target.value, 0)
        change("round", { 
            current: editTask.round?.current ?? 0, 
            max: Math.min(max, 99) 
        })
    }

    const changeRoundByType = (type: "+" | "-") => {
        const current = editTask.round?.current ?? 0
        const max = editTask.round?.max ?? 0
        change("round", { 
            current, 
            max: Math.min(type === "+" ? max + 1 : Math.max(max - 1, 0), 99) 
        })
    }

    const addProperty = (prop: "description" | "deadline") => {
        if (prop === "description") {
            setEditTask(c => ({...c, description: ''}))
        } else {
            setEditTask(c => ({...c, round: {current: 0, max: 0}}))
        }
    }

    const handleSubmit = () => {
        if (!editTask.title) return;
        const task = {
            ...editTask,
            id: editTask.id || crypto.randomUUID(),
            description: editTask.description?.trim() ?? null,
            round: validateTaskRound(editTask.round)
        }
        editTask.id ? changeTask(task) : addTask(task);
        clearForm()
    }

    const clearForm = () => {
        switchFormTask(false)
        setTimeout(() => {
            setEditTask(initTask())
            setEditTaskId(null)
        }, 500)
    }
    
    return {
        editTask, change, changeRound, changeRoundByType, 
        addProperty, handleCancel: clearForm, handleSubmit
    }
}

export default useTaskForm