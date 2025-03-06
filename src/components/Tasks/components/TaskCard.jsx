import { memo} from "react";
import OptionTaskButton from "./OptionTaskButton/OptionTaskButton.jsx";
import CreateTaskCard from "./CreateTaskCard.jsx";
import useManageTask from "../../../hooks/useManageTask.js";

const TaskCard = memo(({ task, taskIndex, hasCreateTask }) => {

    const {taskElement, taskTitle, setIsComplete, changeToMainTask, 
        isTaskCompleted, onClickEdit, isCardDelete, callSetIsCardDelete, editTaskId } = useManageTask({task, taskIndex});

    return (
    <>
        <li 
        ref={taskElement}
        className="tasks__item">
            <section className="tasks__task task">
                <div className="task__top">
                    <div className="task__top-left">
                        {/* чекбокс */}
                        <input 
                            onClick={() => setIsComplete(curr => !curr)}
                            value={task.complete}
                            className="task__check" type="checkbox" name="task"/>
                        <h4 ref={taskTitle}
                            onClick={changeToMainTask}
                        className="task__title">
                            {task.title}
                            {isTaskCompleted && (
                                <div className="task__title-completed"></div>
                            )}
                        </h4>
                    </div>
                <div className="task-top-right">

                    {task.deadline > 0 && (
                        <p className="task__deadline">{task.round ?? 0}/{task.deadline ?? 0}</p>
                        
                    )}
                    <OptionTaskButton 
                        isEdit={true}
                        onClickEdit={onClickEdit}
                        taskId={task.id}
                        taskIndex={taskIndex}
                        callSetIsCardDelete={callSetIsCardDelete}
                    />
                </div>

                </div>
                <div className="task__bottom">
                    {task.description 
                    ? <p className="task__describe">{task.description}</p>
                    : null}
                </div>
            </section>

        </li>
        {!hasCreateTask && editTaskId === task.id &&(
            <CreateTaskCard 
                isCardDelete={isCardDelete}
                isEdit={true}
                task={task}
            />
        )}
    </>
    );
});


export default TaskCard;