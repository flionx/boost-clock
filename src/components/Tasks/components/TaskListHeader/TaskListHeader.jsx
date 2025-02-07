import { useState } from "react";
import ModalWarning from "../ModalWarning/ModalWarning";

function TaskListHeader({ deleteAll, basicTasks }) {

    const {isDeleteAll, setIsDeleteAll} = deleteAll;
    const {tasks, setTasks} = basicTasks;

    const [hasModal, setHasModal] = useState(false);

    function deleteAllTasks() {
        setIsDeleteAll(prev => prev = true);
        closeModal();
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
                onClickTrue={deleteAllTasks}
                />
            )}
        </div>
    )
}

export default TaskListHeader;

