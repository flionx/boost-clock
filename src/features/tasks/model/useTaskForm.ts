"use client"
import { initTask } from '@/shared/lib/initTask'
import { parseNumberInput } from '@/shared/lib/parseNumberInput'
import { useTasksStore } from '@/shared/store/tasks'
import { Task } from '@/shared/types/tasks'
import { useCallback, useState } from 'react'
import { validateTaskRound } from '../lib/validateTaskRound'
interface TaskFormHookProps {
    task?: Task,
}
type EditTask = Omit<Task, 'id'>

const useTaskForm = ({task}: TaskFormHookProps) => {
    const [editTask, setEditTask] = useState<Task>(task ? task : initTask());
    const callSetEditTask = useCallback((value: React.SetStateAction<Task>) => setEditTask(value), []);
    const {addTask, switchFormTask} = useTasksStore();

    const change = <K extends keyof EditTask>(key: K, value: EditTask[K]) => {
        setEditTask(t => ({ ...t, [key]: value }))
    }

    const changeRound = (e: React.ChangeEvent<HTMLInputElement>) => {
        const max = parseNumberInput(e.target.value, 0)
        change("round", { current: editTask.round?.current ?? 0, max })
    }

    const changeRoundByType = (type: "+" | "-") => {
        const current = editTask.round?.current ?? 0
        const max = editTask.round?.max ?? 0
        change("round", { current, max: type === "+" ? max + 1 : Math.max(max - 1, 0) })
    }

    const handleSubmitTask = () => {
        if (!editTask.title) return;
        addTask({
            ...editTask,
            id: editTask.id || crypto.randomUUID(),
            description: editTask.description?.trim() ?? null,
            round: validateTaskRound(editTask.round)
        })
        switchFormTask(false)
        setTimeout(() => {
            setEditTask(initTask())
        }, 500)
    }

    const addProperty = (prop: "description" | "deadline") => {
        if (prop === "description") {
            setEditTask(c => ({...c, description: ''}))
        } else {
            setEditTask(c => ({...c, round: {current: 0, max: 0}}))
        }
    }

    const handleCancel = (e: React.MouseEvent) => {
        e.preventDefault();
        setTimeout(() => setEditTask(initTask()), 500)
        switchFormTask(false)
    }

    return {
        editTask, setEditTask: callSetEditTask,
        change, changeRound, handleSubmitTask,
        changeRoundByType, addProperty, handleCancel
    }
}

export default useTaskForm