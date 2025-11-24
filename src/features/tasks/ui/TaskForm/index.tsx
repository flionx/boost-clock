import ButtonAddProperty from "./ButtonAddProperty"
import ButtonBox from "./ButtonBox"
import FormCol from "./FormCol"
import FormInput from "./FormInput"
import FormTitle from "./FormTitle"

const TaskForm = () => {
  return (
    <form className="w-full py-5 px-[clamp(0.9375rem,2.5vw,4rem)] bg-accent rounded-xl mb-7.5">
        <FormCol>
            <FormTitle>Title</FormTitle>
            <FormInput type="text" />
        </FormCol>
        <FormCol>
            <FormTitle>Description</FormTitle>
            <FormInput type="textarea" />
        </FormCol>
        <FormCol>
            <FormTitle>Deadline</FormTitle>
            <div className="flex items-center gap-4">
                <FormInput type="number" />
                <div className="flex items-center gap-2.5">
                    <ButtonBox label="-" />
                    <ButtonBox label="+" />
                </div>
            </div>
        </FormCol>
        <FormCol>
            <ButtonAddProperty label="Add a description"/>
        </FormCol>
        <ButtonAddProperty label="Add a deadline"/>
    </form>
  )
}

export default TaskForm