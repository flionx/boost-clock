import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../../types/global";
import { IMainTask } from "../types/types";

interface IChangeAction {
  tasks: ITask[],
  taskId: number
}

const getInitialTask = (): IMainTask => {
  const storage = localStorage.getItem("mainTask");  
  return storage ? JSON.parse(storage) : {id: null, title: null};
};

const initialState: IMainTask = getInitialTask();

const mainTaskSlice = createSlice({
  name: "mainTask",
  initialState,
  reducers: {
    setMainTask: (state, action: PayloadAction<IMainTask>) => {      
      state.id = action.payload.id;
      state.title = action.payload.title;
    },
    changeMainTask: (state, action: PayloadAction<IChangeAction>) => {
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
    resetMainTask: (state) => {
      state.id = null;
      state.title = null;
      localStorage.setItem('mainTask', JSON.stringify(state));
    }
  },
});

export const { setMainTask, changeMainTask, resetMainTask } = mainTaskSlice.actions;
export default mainTaskSlice.reducer;
