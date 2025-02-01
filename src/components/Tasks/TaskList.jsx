import TaskCard from './TaskCard.jsx';
import CreateTaskCard from './CreateTaskCard.jsx'

function TaskList() {
    return (
        <div className="container-for-task">
            <ul className="tasks__list">
                
                <TaskCard />

                <CreateTaskCard />


                <li className="tasks__item">
                <button className="tasks__add">
                    <div className="tasks__add-circle">+</div>
                    Add new task</button>
                </li>
            </ul>
        </div>

    )    
}

export default TaskList;

// при нажатии на кнопку:
// меняем состояние есть создание таск
// создать новый компонент(ввод)
// при вводе и нажатии создать:
// меняем состояние массива с тасками, добавляем новый {}
// проходимся по массиву, создаем новый таскКард,
// меняем состояние на Нет создания таск