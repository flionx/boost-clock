import { useTasksStore } from '@/shared/store/tasks'
import { useMemo } from 'react';

const useCompletedTasks = () => {
    const list = useTasksStore(state => state.list);
    return useMemo(() => list.filter(t => t.complete), [list])
}
export default useCompletedTasks