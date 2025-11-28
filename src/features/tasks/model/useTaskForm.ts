"use client"
import { initTask } from '@/shared/lib/initTask'
import { parseNumberInput } from '@/shared/lib/parseNumberInput'
import { useTasksStore } from '@/shared/store/tasks'
import { Task } from '@/shared/types/tasks'
import { useCallback, useState } from 'react'
interface TaskFormHookProps {
    task?: Task,
}
type EditTask = Omit<Task, 'id'>

const useTaskForm = ({task}: TaskFormHookProps) => {
    const [editTask, setEditTask] = useState<EditTask | Task>(task ? task : initTask());
    const callSetEditTask = useCallback((value: React.SetStateAction<EditTask | Task>) => setEditTask(value), []);
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

    const handleAddTask = () => {
        if (!editTask.title) return;
        addTask({
            ...editTask,
            id: crypto.randomUUID()
        })
        setEditTask(initTask());
        switchFormTask(false)
    }

    const addProperty = (prop: "description" | "deadline") => {
        if (prop === "description") {
            setEditTask(c => ({...c, description: ''}))
        } else {
            setEditTask(c => ({...c, round: {current: 0, max: 0}}))
        }
    }

    const handleCancel = () => {
        setEditTask(initTask());
        switchFormTask(false)
    }

    return {
        editTask, setEditTask: callSetEditTask,
        change, changeRound, handleAddTask,
        changeRoundByType, addProperty, handleCancel
    }
}

export default useTaskForm