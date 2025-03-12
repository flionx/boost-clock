import { FC } from "react"
import { ITask } from "../../../../types/global"
interface Props {
    task: ITask,
    inputRef: React.RefObject<HTMLTextAreaElement>,
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>,
    onClick: VoidFunction,
}

const CreateTaskDescription: FC<Props> = ({task, inputRef, onChange, onClick}) => {
  return (
    <div className="create-task__col">
        {typeof task.description === 'string' ? (
            <>
            <h4 className="task__title create-task__title">Description</h4>
            <textarea 
                value={task.description} 
                onChange={onChange}
                ref={inputRef}
                className="create-task__input" placeholder="more detailed task description" 
            />
            </>
        ) : (
            <button 
            onClick={onClick}
            className="btn-with-plus btn-ui m15">Add a description</button>
        )}
    </div>
  )
}

export default CreateTaskDescription