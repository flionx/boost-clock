import TaskCard from './TaskCard.jsx';
import { useRef, useState, useCallback } from 'react';
import CreateTaskCard from './CreateTaskCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setEditTask } from '../../../store/slices/tasksSlice.js';


function TaskList() {

    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks)
    const editTask = useSelector(state => state.tasks.editTask)
        
    return (
        <div className="container-for-task">
        <ul className="tasks__list">
            {tasks.map((task, index) => (
                <TaskCard 
                key={task.id} 
                taskIndex={index}
                task={task}
                />))}
        </ul>   
            {editTask.id === 'new' && (
                <CreateTaskCard/>
             )}

            <li className="tasks__item">
            <button 
            onClick={() => dispatch(setEditTask({id: 'new', title: ''}))}
            className="tasks__add">
                <div className="tasks__add-circle">+</div>
                Add new task</button>
            </li>
        
        </div>

    )    
}

export default TaskList;
