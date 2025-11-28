"use client"
import { initTask } from '@/shared/lib/initTask'
import { useTasksStore } from '@/shared/store/tasks'
import { Task } from '@/shared/types/tasks'
import { useCallback, useEffect, useState } from 'react'
interface TaskFormHookProps {
    task?: Task,
    inputTitleRef: React.RefObject<HTMLInputElement | null>, 
    textareaRef: React.RefObject<HTMLTextAreaElement | null>,
    showForm: boolean
}
const useTaskForm = ({task, inputTitleRef, textareaRef, showForm}: TaskFormHookProps) => {
    const [editTask, setEditTask] = useState<Omit<Task, 'id'> | Task>(task ? task : initTask())
    const callSetEditTask = useCallback((value: React.SetStateAction<Omit<Task, 'id'> | Task>) => setEditTask(value), []);
    const {addTask, switchFormTask} = useTasksStore();

    useEffect(() => {
        if (editTask.description) {
            textareaRef.current?.focus();
            textareaRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'})
        } else {            
            inputTitleRef.current?.focus()
            inputTitleRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'})
        }
    }, [showForm])

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setEditTask(c => ({...c, title: e.target.value}))
    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => setEditTask(c => ({...c, description: e.target.value}))
    const handleChangeRound = (e: React.ChangeEvent<HTMLInputElement>) => setEditTask(c => (
        {...c, round: {current: Number(c.round?.current), max: Number(e.target.value)}
    }))

    const handleAddTask = () => {
        if (!editTask.title) return;
        addTask({
            ...editTask,
            id: crypto.randomUUID()
        })
        setEditTask(initTask());
        switchFormTask(false)
    }

    return {
        editTask, 
        setEditTask: callSetEditTask,
        handleChangeTitle, 
        handleChangeDescription,
        handleChangeRound,
        handleAddTask
    }
}

export default useTaskForm