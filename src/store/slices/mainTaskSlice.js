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
        const {tasks, taskId} = action.payload;
        const prevTasks = [...tasks];
        const nextTasks = prevTasks.filter(task => task.id !== taskId);

        if (nextTasks.length > 0) {       
            const lastTaskId = nextTasks[nextTasks.length - 1].id;                
            const lastTasktitle = nextTasks[nextTasks.length - 1].title;                            
            state.id = lastTaskId;
            state.title = lastTasktitle;
        } else {
            state.id = null;
            state.title = null;
        }
    },
  },
});


export const { setMainTask, changeMainTask } = mainTaskSlice.actions;

export default mainTaskSlice.reducer;
