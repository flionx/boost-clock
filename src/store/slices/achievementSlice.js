import { createSlice } from "@reduxjs/toolkit";
import achievsArray from '../../components/Achievements/achievementsList.js'

const saveToLocalStorage = (state) => {
  const stateToSave = state.achievs;
  localStorage.setItem("achievs", JSON.stringify(stateToSave));
};

const getInitialState = () => {
    const storage = localStorage.getItem("achievs");
    return storage ? JSON.parse(storage) : achievsArray
};

const achievementSlice = createSlice({
  name: "achievement",
  initialState: {
    newAchievs: 0,
    showAchiev: false,
    achievs: getInitialState(),
  },
  reducers: {
    setShowAchiev: (state, action) => {      
      state.showAchiev = action.payload;
    },
    setStepAchiev: (state, action) => {        
        const achievs = state.achievs.map(card => {
            return (card.title == action.payload) ? {...card, step: card.step + 1} : card
        });        
        state.achievs = achievs;
        saveToLocalStorage(state);
    },
    setCompleteAchiev: (state, action) => {
        const achievs = state.achievs.map(card => {
            return (card.title == action.payload) ? {...card, lock: false} : card
        });
          state.achievs = achievs;
          state.newAchievs += 1;
          saveToLocalStorage(state);
    },
    setNewAchievs: (state, action) => {
      if (action.payload === '+') {
        state.newAchievs = state.newAchievs + 1;
      } else if (action.payload === 'reset') {
        state.newAchievs = 0;
      }
    },
    uploadAchievs: (state, action) => {
      state.achievs = action.payload.achievs;
      state.newAchievs = action.payload.newAchievs;
      state.showAchiev = action.payload.showAchiev;
    },
    resetAchievs: (state) => {
      state = {
        newAchievs: 0,
        showAchiev: false,
        achievs: achievsArray,
      }
    }
  },
});

export const { 
  setShowAchiev, setStepAchiev, setCompleteAchiev, setNewAchievs,
  uploadAchievs, resetAchievs
} = achievementSlice.actions;

export default achievementSlice.reducer;
