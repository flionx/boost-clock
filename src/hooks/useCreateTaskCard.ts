import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import scrollToNew from "../utils/scrollToNew";
import { addTask, changeTask, setEditTaskId } from "../store/slices/tasksSlice";
import { setCompleteAchiev, setStepAchiev } from "../store/slices/achievementSlice";
import { ITask } from "../types/global";
import AnimDeleteCard from "../utils/AnimDeleteCard";
import { CreateTaskCardProps } from "../components/Tasks/components/CreateTaskCard";

const useCreateTaskCard = ({isEdit, task, isCardDelete, hasCreateTask, callSetHasCreateTask}: CreateTaskCardProps) => {
    const dispatch = useAppDispatch()
    const resetTask: ITask = {
        id: Date.now(), 
        title: '', 
        description: null, 
        complete: false, 
        deadline: null, 
        round: null
    };
    const [currentTask, setCurrentTask] = useState(() => isEdit ? (task as ITask) : resetTask);

    const secondAchiev = useAppSelector(state => state.achievement.achievs[1])

    const createNewTaskRef = useRef<HTMLLIElement>(null);
    const inputTitleRef = useRef<HTMLInputElement>(null);
    const inputDescriptionRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEdit && task) {
            const cleanTask = {
                ...task,
                description: task.description?.trim() || null,
            };
            setCurrentTask(cleanTask);
        }
    }, [task]);

    useEffect(() => {
        if (isCardDelete) {
            cancelNewTask()
        }
    }, [isCardDelete])

    useEffect(() => {
        scrollToNew(createNewTaskRef);
        if (currentTask && typeof currentTask.description === 'string') {
            focusDescriptionInput();
        } else {
            const input = inputTitleRef.current as HTMLInputElement;
            input.focus();
        }
    }, []);

    function focusDescriptionInput() {
        if (!inputDescriptionRef.current) return;
        const textarea = inputDescriptionRef.current;
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }

    const changeTitleHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
        setCurrentTask(curr=> ({...curr, title: e.target.value}))  
    }
    const changeDescriptionHandle: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setCurrentTask(curr=> ({...curr, description: e.target.value}))  
    }
    function addDescriptionHandle() {
        setCurrentTask(curr=> ({...curr, description: ''}))
        setTimeout(focusDescriptionInput, 150)
    }
    function addDeadlineHandle() {
        setCurrentTask(curr=> ({...curr, deadline: 0}))  
    }
    function changeDeadlineHandle(type: '+' | '-') {
        if (type === '+') {
            setCurrentTask(curr=> ({...curr, deadline: curr.deadline ? curr.deadline + 1 : 1}))  
        } else if (type === '-' && currentTask.deadline && currentTask.deadline > 0) {
            setCurrentTask(curr=> ({...curr, deadline: curr.deadline ? curr.deadline - 1 : 0}))  
        }
    }

    function cancelNewTask() {
        AnimDeleteCard(createNewTaskRef)
        setTimeout(() => {
            dispatch(setEditTaskId(null))
            setCurrentTask(resetTask)
            if (hasCreateTask) {
                callSetHasCreateTask && callSetHasCreateTask(false)
                dispatch(setEditTaskId(null))
            }
        }, 500)
    }
    function saveTask() {
        if (currentTask.title.trim() !== '') {
            dispatch(changeTask(currentTask))
            callSetHasCreateTask && callSetHasCreateTask(false)
            dispatch(setEditTaskId(null))
        }
    }

    function createNewTask() {
        if (currentTask.title.trim() !== '') {
            dispatch(addTask(currentTask))
            if (hasCreateTask) {
                callSetHasCreateTask && callSetHasCreateTask(false)
                dispatch(setEditTaskId(null))
            }
            // достижение 2
            if (secondAchiev.step < secondAchiev.max) {                
                dispatch(setStepAchiev("Planner"))
                dispatch(setCompleteAchiev("Planner"))
            }
        }
    }

    return {currentTask, createNewTaskRef, inputTitleRef, inputDescriptionRef, changeTitleHandle, 
        changeDescriptionHandle, addDescriptionHandle, changeDeadlineHandle, 
        addDeadlineHandle, cancelNewTask, saveTask, createNewTask
    }
}

export default useCreateTaskCard