"use client"
import { useTasksStore } from '@/features/tasks/store/tasks'
import { useMemo } from 'react';

const useActiveTasks = () => {
    const list = useTasksStore(state => state.list);
    return useMemo(() => list.filter(t => !t.complete), [list])
}
export default useActiveTasks