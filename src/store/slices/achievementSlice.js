import { createSlice } from "@reduxjs/toolkit";
import achievsArray from '../../components/Achievements/achievementsList.js'

const getInitialState = () => {
    const storage = localStorage.getItem("achievs");
    return storage ? JSON.parse(storage) : achievsArray
};

const achievementSlice = createSlice({
  name: "achievement",
  initialState: {
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

        state.achievs = achievs;
    },
  },
});

export const { setShowAchiev, setStepAchiev, setCompleteAchiev } = achievementSlice.actions;

export default achievementSlice.reducer;
