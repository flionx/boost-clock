import { createSlice } from "@reduxjs/toolkit";
import achievsArray from '../../components/Achievements/achievementsList.js'

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
    },
    setCompleteAchiev: (state, action) => {
        const achievs = state.achievs.map(card => {
            return (card.title == action.payload) ? {...card, lock: false} : card
        });
        state.newAchievs += 1;
        state.achievs = achievs;
    },
    setNewAchievs: (state, action) => {
      if (action.payload === '+') {
        state.newAchievs = state.newAchievs + 1;
      }else if (action.payload === '-') {
        state.newAchievs = state.newAchievs - 1;
      } else if (action.payload === 'reset') {
        state.newAchievs = 0;
      }
    }
  },
});

export const { setShowAchiev, setStepAchiev, setCompleteAchiev, setNewAchievs } = achievementSlice.actions;

export default achievementSlice.reducer;
