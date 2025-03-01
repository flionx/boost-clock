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

      // Удаляем текущую задачу, если она была главной
      const updatedTasks = tasks.filter(task => task.id !== taskId);

      // Проверяем, есть ли активные задачи
      const activeTasks = updatedTasks.filter(task => !task.complete);
      
      if (activeTasks.length > 0) {       
          state.id = activeTasks[0].id; // Берем **первую** невыполненную
          state.title = activeTasks[0].title;
      } else {
          // Если задач нет — обнуляем
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
    }
  },
});


export const { setMainTask, changeMainTask, resetMainTask, uploadMainTask } = mainTaskSlice.actions;

export default mainTaskSlice.reducer;
