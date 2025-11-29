import ButtonClearAll from './buttons/ButtonClearAll'

const TasksHeader = () => {
  return (
    <div className="flex justify-between items-center pr-2.5 pb-2.5 pl-12.5 border-b border-1.5 border-line mb-8.5">
        <h3 className="text-3xl">Tasks</h3>
        <ButtonClearAll />
    </div>
  )
}

export default TasksHeader