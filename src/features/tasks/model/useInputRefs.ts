import { useTasksStore } from '@/shared/store/tasks';
import { Task } from '@/shared/types/tasks';
import { useEffect, useRef } from 'react'

const useInputRefs = (description: Task['description']) => {
    const showForm = useTasksStore(state => state.showForm);
    const inputTitleRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const inputDeadlineRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!showForm) return;
        if (description) {
            textareaRef.current?.focus();
            textareaRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'})
        } else {            
            inputTitleRef.current?.focus()
            inputTitleRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'})
        }
    }, [showForm])

    return {inputTitleRef, textareaRef, inputDeadlineRef}
}

export default useInputRefs