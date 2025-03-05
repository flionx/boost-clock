import { createSlice } from "@reduxjs/toolkit";

const getInitialTask = () => {
  const storage = localStorage.getItem("mainTask");  
  return storage ? JSON.parse(storage) : {id: null, title: null};
};

const mainTaskSlice = createSlice({
  name: "mainTask",
  initialState: getInitialTask(),
  reducers: {
    setMainTask: (state, action) => {      
      state.id = action.payload.id;
      state.title = action.payload.title;
    },
    changeMainTask: (state, action) => {
      const { tasks, taskId } = action.payload;
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      const activeTasks = updatedTasks.filter(task => !task.complete);
      
      if (activeTasks.length > 0) {       
          state.id = activeTasks[0].id;
          state.title = activeTasks[0].title;
      } else {
          state.id = null;
          state.title = null;
      }
    },
    uploadMainTask: (state, action) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
    },
    resetMainTask: (state) => {
      state.id = null;
      state.title = null;
      localStorage.setItem('mainTask', JSON.stringify(state));
    }
  },
});

export const { setMainTask, changeMainTask, resetMainTask, uploadMainTask } = mainTaskSlice.actions;

export default mainTaskSlice.reducer;
