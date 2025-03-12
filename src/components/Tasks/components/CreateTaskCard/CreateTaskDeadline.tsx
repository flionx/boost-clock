import { FC } from "react"
import { ITask } from "../../../../types/global"

interface Props {
    deadline: ITask['deadline'],
    changeDeadline: (type: "+" | "-") => void
}

const CreateTaskDeadline: FC<Props> = ({deadline, changeDeadline}) => {
  return (
    <div className="create-task__col">
            <h4 className="task__title create-task__title">Deadline</h4>
        <div className="create-task__deadline">
            <div className="create-task__deadline-value">{String(deadline) ?? 0}</div>
            <div className="create-task__deadline-btns">
                <button 
                onClick={() => changeDeadline('+')}
                className="btn-deadline btn-ui">+</button>
                <button 
                onClick={() => changeDeadline('-')}
                className="btn-deadline btn-ui">-</button>
            </div>
        </div>
    </div>
  )
}

export default CreateTaskDeadline