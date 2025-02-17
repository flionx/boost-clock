import { createSlice } from "@reduxjs/toolkit";

const getInitialTasks = () => {
  const storage = localStorage.getItem("tasks"); 
  return storage ? JSON.parse(storage) : [];
};

const tasksSlice = createSlice({
  name: "tasks",
  editTaskId: null,
  initialState: {
    tasks: getInitialTasks(),
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleCompleteTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.complete = !task.complete;
    },
    moveTask: (state, action) => {
      const {taskId, direction} = action.payload;
      const tasks = state.tasks;
  
      const activeTasks = tasks.filter(task => !task.complete);
      const activeIndex = activeTasks.findIndex(task => task.id === taskId);
  
      const targetIndex = direction === "up" ? activeIndex - 1 : activeIndex + 1;
  
      if (targetIndex < 0 || targetIndex >= activeTasks.length) return;
  
      const targetTaskId = activeTasks[targetIndex].id;
  
      const originalIndex = tasks.findIndex(task => task.id === taskId);
      const targetOriginalIndex = tasks.findIndex(task => task.id === targetTaskId);
  
      [tasks[originalIndex], tasks[targetOriginalIndex]] = [tasks[targetOriginalIndex], tasks[originalIndex]];
    },
    changeTask: (state, action) => {
      state.tasks = state.tasks.map(task =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
    },
    setEditTaskId: (state, action) => {
      state.editTaskId = action.payload
    },
    setDeadlineTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) task.deadline = action.payload.deadline;
    },
    setRoundTasks: (state) => {
      
      state.tasks = state.tasks.map(task => 
        !task.complete && task.deadline > 0 ? { ...task, round: task.round + 1 } : task
      );
    }, 
    deleteAllTasks: (state) => {
      state.tasks = state.tasks.filter(task => task.complete);
    },

  },
});

export const { 
  addTask, removeTask, toggleCompleteTask, 
  moveTask, setEditTaskId, 
  changeTask, setDeadlineTask,
  setRoundTasks, deleteAllTasks
} = tasksSlice.actions;

export default tasksSlice.reducer;
