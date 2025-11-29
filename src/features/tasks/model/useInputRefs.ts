import { useTasksStore } from '@/shared/store/tasks';
import { useEffect, useRef } from 'react'

const useInputRefs = () => {
    const showForm = useTasksStore(state => state.showForm);
    const inputTitleRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const inputDeadlineRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!showForm) return;          
        inputTitleRef.current?.focus()
        inputTitleRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'})
    }, [showForm])

    return {inputTitleRef, textareaRef, inputDeadlineRef}
}

export default useInputRefs