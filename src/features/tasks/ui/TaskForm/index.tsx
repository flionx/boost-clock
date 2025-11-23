import ButtonAddProperty from "./ButtonAddProperty"
import TaskFormCol from "./TaskFormCol"

const TaskForm = () => {
  return (
    <form className="w-full py-5 px-[clamp(0.9375rem,2.5vw,4rem)] bg-accent rounded-xl mb-7.5">
        <TaskFormCol>
            <h4 className="text-[calc(20px+(25-20)*((100vw-375px)/(1440-375)))]">
                Title
            </h4>
            <input 
                className="
                    bg-white text-[#1C1C1C] py-1.5 px-5 rounded-lg
                "
                type="text" 
                placeholder="title for your task" 
            />
        </TaskFormCol>
        <TaskFormCol>
            <ButtonAddProperty label="Add a description"/>
        </TaskFormCol>
        <ButtonAddProperty label="Add a deadline"/>
    </form>
  )
}

export default TaskForm