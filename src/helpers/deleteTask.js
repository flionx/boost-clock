function deleteTask(type = null, tasksForMove, taskIndex) {
    const {tasks, setTasks} = tasksForMove;

    const currTasks = [...tasks];
    const updatedTasks = currTasks.filter((_, i) => taskIndex !== i);
    setIsCardDelete(icd => icd = true);
    if (type === 'option') {
        hideOptions();
    }
    setTimeout(() => {
        setTasks(t => t = updatedTasks);
    }, 500)
}


export default deleteTask;