import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeMainTask, resetMainTask, setMainTask } from '../store/slices/mainTaskSlice';
import AnimDeleteCard from '../components/Tasks/helpers/AnimDeleteCard';
import { setEditTaskId, toggleCompleteTask } from '../store/slices/tasksSlice';
import { setCompleteAchiev, setStepAchiev } from '../store/slices/achievementSlice';
import { addCompletedTask } from '../store/slices/reportSlice';

const useManageTask = ({task, taskIndex}) => {
    const [isCardDelete, setIsCardDelete] = useState(false);
    const [isTaskCompleted, setIsComplete] = useState(false);
    
    const mainTask = useSelector(state => state.mainTask);
    const tasks = useSelector(state => state.tasks.tasks);
    const editTaskId = useSelector(state => state.tasks.editTaskId);
    const fourthAchiev = useSelector(state => state.achievement.achievs[3])
    
    const dispatch = useDispatch();
    
    const taskElement = useRef(null);
    useEffect(() => {
        if (isCardDelete) {
            AnimDeleteCard(taskElement);
            
            if (mainTask.id === task.id) {
                setTimeout(()=> {
                    dispatch(changeMainTask({tasks: tasks, taskId: task.id}))    
                }, 500)
            }
        }
    }, [isCardDelete, dispatch]);

    const taskTitle = useRef(null);
    const timeoutId = useRef(null);
    useEffect(() => {
        if (isTaskCompleted) {
            taskTitle.current.className = 'task__title anim-title-complete';
            timeoutId.current = setTimeout(()=> {                    
                deleteTask();
                addInfoToReport();
            }, 1000)
        } else {
            taskTitle.current.className = 'task__title';
            if (timeoutId.current) {
                clearTimeout(timeoutId.current)
            }
        }
    }, [isTaskCompleted])

    const addInfoToReport = useCallback(() =>{
        if (task.round > task.deadline) {
            dispatch(addCompletedTask('outTime'))
        } else {
            dispatch(addCompletedTask())
            // достижение 4
            if (fourthAchiev.step < fourthAchiev.max) {                
                if (fourthAchiev.step + 1 == fourthAchiev.max) {
                    dispatch(setCompleteAchiev("Responsible"))
                }
                dispatch(setStepAchiev("Responsible"))
            }
        }
    },[])  

    const deleteTask = useCallback(() =>{
        setIsCardDelete(true);
        setTimeout(() => {
            dispatch(toggleCompleteTask(task.id))
        }, 500)        
        const filteredTasks = [...tasks].filter((task, index) => !task.complete && taskIndex !== index)        
        if (filteredTasks.length == 0) {
            dispatch(resetMainTask());
        }
    },[])   

    const onClickEdit = useCallback(() => {
        dispatch(setEditTaskId(task.id))
    }, [])

    const changeToMainTask = useCallback(() =>{        
        dispatch(setMainTask({id: task.id, title: task.title}))        
    },[])  

    const callSetIsCardDelete = useCallback((value) => setIsCardDelete(value), []);

    return {taskElement, taskTitle, setIsComplete, changeToMainTask, 
        isTaskCompleted, onClickEdit, isCardDelete, callSetIsCardDelete, editTaskId}
}

export default useManageTask