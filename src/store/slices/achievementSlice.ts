import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import achievsArray from '../../components/Achievements/achievementsList'
import { IAchiev } from "../../types/global";
import { IAchievementState } from "../types/types";

const saveToLocalStorage = (stateToSave: IAchiev[]) => {
  localStorage.setItem("achievs", JSON.stringify(stateToSave));
};

const getInitialState = (): IAchiev[]  => {
    const storage = localStorage.getItem("achievs");
    return storage ? JSON.parse(storage) : [...achievsArray]
};
const initialState: IAchievementState = {
  newAchievs: 0,
  showAchiev: false,
  achievs: getInitialState(),
}

const achievementSlice = createSlice({
  name: "achievement",
  initialState,
  reducers: {
    setShowAchiev: (state, action: PayloadAction<IAchievementState['showAchiev']>) => {      
      state.showAchiev = action.payload;
    },
    setStepAchiev: (state, action: PayloadAction<IAchiev['title']>) => {        
        const achievs = state.achievs.map(card => {
            return (card.title == action.payload) ? {...card, step: card.step + 1} : card
        });        
        state.achievs = achievs;
        saveToLocalStorage(state.achievs);
    },
    setCompleteAchiev: (state, action: PayloadAction<IAchiev['title']>) => {
        const achievs = state.achievs.map(card => {
            return (card.title == action.payload) ? {...card, lock: false} : card
        });
          state.achievs = achievs;
          state.newAchievs += 1;
          saveToLocalStorage(state.achievs);
    },
    setNewAchievs: (state, action: PayloadAction<'+' | 'reset'>) => {
      if (action.payload === '+') {
        state.newAchievs = state.newAchievs + 1;
      } else if (action.payload === 'reset') {
        state.newAchievs = 0;
      }
    },
    uploadAchievs: (state, action: PayloadAction<IAchiev[]>) => {
      state.achievs = action.payload;
      saveToLocalStorage(state.achievs);
    },
    resetAchievs: (state) => {
      state.newAchievs = 0,
      state.showAchiev = false,
      state.achievs = achievsArray,
      saveToLocalStorage(state.achievs);
    }
  },
});

export const { 
  setShowAchiev, setStepAchiev, setCompleteAchiev, setNewAchievs,
  uploadAchievs, resetAchievs
} = achievementSlice.actions;

export default achievementSlice.reducer;
