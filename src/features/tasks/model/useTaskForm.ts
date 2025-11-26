"use client"
import { Task } from '@/shared/types/tasks'
import { useCallback, useState } from 'react'

const useTaskForm = (task?: Task) => {
    const [editTask, setEditTask] = useState<Omit<Task, 'id'> | Task>(task ? task : {
        title: '',
        description: null,
        round: null,
        complete: false
    })
    const callSetEditTask = useCallback((value: React.SetStateAction<Omit<Task, 'id'> | Task>) => setEditTask(value), [])

    return {
        editTask, 
        setEditTask: callSetEditTask
    }
}

export default useTaskForm