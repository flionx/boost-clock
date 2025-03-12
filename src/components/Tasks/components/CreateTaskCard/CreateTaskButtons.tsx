import { FC } from "react"
interface Props {
    isEdit: boolean,
    cancelNewTask: VoidFunction,
    saveTask: VoidFunction,
    createNewTask: VoidFunction,
}

const CreateTaskButtons: FC<Props> = ({isEdit, cancelNewTask, saveTask, createNewTask}) => {
  return (
    <div className="create-task__btns">
        <button 
        onClick={cancelNewTask}
        className="create-task__btn-cancel">Cancel</button>
        {isEdit ? ( <button 
            onClick={saveTask}
            className="create-task__btn-create btn-ui">Save</button>
        ) : (
        <button 
            onClick={createNewTask}
            className="create-task__btn-create btn-ui">Create</button>
        )}
    </div>
  )
}

export default CreateTaskButtons