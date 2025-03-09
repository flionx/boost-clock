import { FC, memo} from "react";
import OptionTaskButton from "./OptionTaskButton/OptionTaskButton";
import CreateTaskCard from "./CreateTaskCard";
import useManageTask from "../../../hooks/useManageTask";
import { ITask } from "../../../types/global";

interface Props {
    task: ITask,
    taskIndex: number,
    callSetHasCreateTask: (value: boolean) => void,
}

const TaskCard: FC<Props> = memo(({ task, taskIndex, callSetHasCreateTask }) => {

    const {taskElement, taskTitle, setIsComplete, changeToMainTask, isTaskCompleted, 
        onClickEdit, isCardDelete, callSetIsCardDelete, editTaskId } = useManageTask({task, callSetHasCreateTask});

    return (
    <>
        <li ref={taskElement} className="tasks__item">
            <section className="tasks__task task">
                <div className="task__top">
                    <div className="task__top-left">
                        <input 
                            onChange={() => setIsComplete(curr => !curr)}
                            type="checkbox" 
                            checked={isTaskCompleted}
                            className="task__check" 
                            name="task"
                        />
                        <h4 className="task__title"
                            ref={taskTitle}
                            onClick={changeToMainTask}
                        >                           
                            {task.title}
                            {isTaskCompleted && (
                                <div className="task__title-completed"></div>
                            )}
                        </h4>
                    </div>
                <div className="task-top-right">
                    {typeof task.deadline === 'number' && task.deadline > 0 && (
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
        {editTaskId === task.id && (
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