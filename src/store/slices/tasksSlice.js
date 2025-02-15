import { createSlice } from "@reduxjs/toolkit";

const getInitialTasks = () => {
  const storage = localStorage.getItem("tasks"); 
  return storage ? JSON.parse(storage) : [];
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: getInitialTasks(),
    editTask: {}
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleCompleteTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.complete = !task.complete;
    },
    moveUpTask: (state, action) => {
      const index = action.payload;
      [state.tasks[index], state.tasks[index - 1]] = [state.tasks[index - 1], state.tasks[index]];
    },
    moveDownTask: (state, action) => {
      const index = action.payload;
      [state.tasks[index], state.tasks[index + 1]] = [state.tasks[index + 1], state.tasks[index]];
    },
    setEditTask: (state, action) => {
      if (Object.keys(action.payload).length === 0) {
          state.editTask = {};
      } else {
          state.editTask = action.payload; 
      }
    }, 
    changeTask: (state, action) => {
      state.tasks = state.tasks.map(task =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
      if (state.editTask.id === action.payload.id) {
        state.editTask = { ...state.editTask, ...action.payload };
      }
    },
    
    setDeadlineTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) task.deadline = action.payload.deadline;
    },
    setRoundTasks: (state) => {
      state.tasks = state.tasks.map(task => 
        task.deadline > 0 ? { ...task, round: task.round + 1 } : task
      );
    }, 
    deleteAllTasks: (state) => {
      state.tasks = state.tasks.filter(task => task.complete);
    }
  },
});

export const { 
  addTask, removeTask, toggleCompleteTask, 
  moveUpTask, moveDownTask, setEditTask, 
  changeTask, setDeadlineTask,
  setRoundTasks, deleteAllTasks
} = tasksSlice.actions;

export default tasksSlice.reducer;
