import { useRef, useState, useEffect } from "react";
import ModalWarning from "../ModalWarning/ModalWarning";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllTasks } from "../../../../store/slices/tasksSlice";
import AnimDeleteCard from "../../helpers/AnimDeleteCard";
import { resetMainTask } from "../../../../store/slices/mainTaskSlice";

function TaskListHeader() {

    const [hasModal, setHasModal] = useState(false);

    const dispatch = useDispatch();
    const allTasks = useSelector(state => state.tasks.tasks)
    const tasks = allTasks.filter(task => !task.complete)
        
    const tasksListRef = useRef(null);

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
        if (tasks.length > 0) {
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
                />
            )}
        </div>
    )
}

export default TaskListHeader;

