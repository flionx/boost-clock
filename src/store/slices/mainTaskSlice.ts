import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMainTask } from "../types/types";

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
    resetMainTask: (state) => {
      state.id = null;
      state.title = null;
      localStorage.setItem('mainTask', JSON.stringify(state));
    }
  },
});

export const { setMainTask, resetMainTask } = mainTaskSlice.actions;
export default mainTaskSlice.reducer;
