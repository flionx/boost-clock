import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "../../types/global";
import { ITasksState } from "../types/types";

const getInitialTasks = (): TaskType[] => {
  const storage = localStorage.getItem("tasks"); 
  return storage ? JSON.parse(storage) : [];
};

type MoveTaskAction = {
  taskId: TaskType['id'],
  direction: 'up' | 'down'
}
type DeadlineTaskAction = {
  id: TaskType['id']
  deadline: TaskType['deadline']
}

const initialState: ITasksState = {
  editTaskId: null,
  tasks: getInitialTasks(),
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskType>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<TaskType['id']>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleCompleteTask: (state, action: PayloadAction<TaskType['id']>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.complete = !task.complete;
    },
    moveTask: (state, action: PayloadAction<MoveTaskAction>) => {
      const {taskId, direction} = action.payload;
      const tasks = state.tasks;
  
      const activeTasks = tasks.filter(task => !task.complete);
      const activeIndex = activeTasks.findIndex(task => task.id === taskId);
  
      const targetIndex = (direction === "up") ? activeIndex - 1 : activeIndex + 1;
  
      if (targetIndex < 0 || targetIndex >= activeTasks.length) return;
  
      const targetTaskId = activeTasks[targetIndex].id;
  
      const originalIndex = tasks.findIndex(task => task.id === taskId);
      const targetOriginalIndex = tasks.findIndex(task => task.id === targetTaskId);
  
      [tasks[originalIndex], tasks[targetOriginalIndex]] = [tasks[targetOriginalIndex], tasks[originalIndex]];
    },
    changeTask: (state, action: PayloadAction<TaskType>) => {
      state.tasks = state.tasks.map(task =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
    },
    setEditTaskId: (state, action: PayloadAction<TaskType['id']>) => {
      state.editTaskId = action.payload;      
    },
    setDeadlineTask: (state, action: PayloadAction<DeadlineTaskAction>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) task.deadline = action.payload.deadline;
    },
    setRoundTasks: (state) => {
      state.tasks = state.tasks.map(task => 
        !task.complete && (task.deadline !== null && task.deadline > 0) ? 
        { ...task, round: (task.round !== null) ? (task.round + 1) : 1 } : task
      );
    }, 
    deleteAllTasks: (state) => {
      state.tasks = state.tasks.filter(task => task.complete);
    },
    uploadTasks: (state, action: PayloadAction<TaskType[]>) => {
      state.tasks = action.payload;
      localStorage.setItem('tasks', JSON.stringify(state.tasks))      
    },
    resetTasks: (state) => {
      state.tasks = [];
    }

  },
});

export const { 
  addTask, removeTask, toggleCompleteTask, 
  moveTask, setEditTaskId, 
  changeTask, setDeadlineTask,
  setRoundTasks, deleteAllTasks, uploadTasks, resetTasks
} = tasksSlice.actions;

export default tasksSlice.reducer;
