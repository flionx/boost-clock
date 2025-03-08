import { useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from './useRedux';
import { changeMainTask, resetMainTask, setMainTask } from '../store/slices/mainTaskSlice';
import AnimDeleteCard from '../components/Tasks/helpers/AnimDeleteCard';
import { setEditTaskId, toggleCompleteTask } from '../store/slices/tasksSlice';
import { setCompleteAchiev, setStepAchiev } from '../store/slices/achievementSlice';
import { addCompletedTask } from '../store/slices/reportSlice';
import { TaskType } from '../types/global';

const useManageTask = ({task, taskIndex}: {task: TaskType, taskIndex: number}) => {
    const [isCardDelete, setIsCardDelete] = useState(false);
    const [isTaskCompleted, setIsComplete] = useState(false);
    
    const mainTask = useAppSelector(state => state.mainTask);
    const tasks = useAppSelector(state => state.tasks.tasks);
    const editTaskId = useAppSelector(state => state.tasks.editTaskId);
    const fourthAchiev = useAppSelector(state => state.achievement.achievs[3])
    
    const dispatch = useAppDispatch();
    
    const taskElement = useRef(null);
    useEffect(() => {
        if (isCardDelete) {
            AnimDeleteCard(taskElement as unknown as {current: HTMLElement});
            
            if (mainTask.id === task.id) {
                setTimeout(()=> {
                    dispatch(changeMainTask({tasks: tasks, taskId: task.id}))    
                }, 500)
            }
        }
    }, [isCardDelete, dispatch]);

    const taskTitle = useRef<HTMLHeadingElement>(null);
    const timeoutId = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        if (isTaskCompleted) {
            if (taskTitle.current) {
                taskTitle.current.className = 'task__title anim-title-complete';
                timeoutId.current = setTimeout(()=> {                    
                    deleteTask();
                    addInfoToReport();
                }, 1000)
            }
        } else {
            if (taskTitle.current) {
                taskTitle.current.className = 'task__title';
                if (timeoutId.current) {
                    clearTimeout(timeoutId.current)
                }
            }
        }
    }, [isTaskCompleted])

    const addInfoToReport = useCallback(() =>{
        if (task.round && task.deadline && task.round > task.deadline) {
            dispatch(addCompletedTask('outTime'))
        } else {
            dispatch(addCompletedTask('onTime'))
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

    const callSetIsCardDelete = useCallback((value: boolean) => setIsCardDelete(value), []);

    return {taskElement, taskTitle, setIsComplete, changeToMainTask, 
        isTaskCompleted, onClickEdit, isCardDelete, callSetIsCardDelete, editTaskId}
}

export default useManageTask