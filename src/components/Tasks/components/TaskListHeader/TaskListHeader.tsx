import { useRef, useState, useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useRedux";
import ModalWarning from "../../../ModalWarning/ModalWarning";
import { deleteAllTasks } from "../../../../store/slices/tasksSlice";
import AnimDeleteCard from "../../../../utils/AnimDeleteCard";
import { resetMainTask } from "../../../../store/slices/mainTaskSlice";

const TaskListHeader: FC = () => {
    const [hasModal, setHasModal] = useState(false);

    const dispatch = useAppDispatch();
    const allTasks = useAppSelector(state => state.tasks.tasks)
    const uncompletedTasks = allTasks.filter(task => !task.complete)
        
    const tasksListRef = useRef<HTMLElement | null>(null);
    useEffect(() => {     
        tasksListRef.current = document.querySelector('.tasks__list');
    }, []);    

    function removeAllTasks() {            
        AnimDeleteCard(tasksListRef);
        closeModal();
        setTimeout(() => {
            dispatch(deleteAllTasks())
            dispatch(resetMainTask())
        }, 500)
    }

    function openModal() {
        if (uncompletedTasks.length > 0) {
            setHasModal(true)
        }
    }

    function closeModal() {
        setHasModal(curr => curr = false);
    }

    return (
        <div className="tasks__header">
            <div className="tasks__header-row">
                <h3 className="tasks__title">Tasks</h3>
                <button 
                onClick={openModal}
                className="tasks__clear">Clear all</button>
            </div>
            <hr/>
            {hasModal && (
                <ModalWarning 
                onClickFalse={closeModal}
                onClickTrue={removeAllTasks}
                text={'Are you sure you want to delete all tasks?'}
                btnTrueText={'Delete'}
                />
            )}
        </div>
    )
}

export default TaskListHeader;

