import { createSlice } from "@reduxjs/toolkit";

function userTheme() {
  const storage = localStorage.getItem("theme");  
  return storage ? storage : 'light';
}

const getInitialSettings = () => {
    const storage = localStorage.getItem("settings");
    return storage ? JSON.parse(storage) : {
      showSettings: false,
      hasLongBreak: false,
      roundsToBreak: 0,
      mainSettings: {
        autoToWork: false,
        autoToRelax: false,
        basicBreak: 5,
        longBreak: 15,
        longBreakInterval: 4,
        soundOn: true,
        repeatSound: 0,
        colorTheme: userTheme(),
      }
    };
  };

const settingSlice = createSlice({
  name: "settings",
  initialState: getInitialSettings(),
  reducers: {
    setShowSettings: (state, action) => {      
      state.showSettings = action.payload;
    },
    setHasLongBreak: (state, action) => {
      state.hasLongBreak = action.payload;
    },
    setAutoToWork: (state) => {
        state.mainSettings.autoToWork = !state.mainSettings.autoToWork;
    },
    setAutoToRelax: (state) => {
        state.mainSettings.autoToRelax = !state.mainSettings.autoToRelax;
    },
    setLongBreak: (state, action) => {
        state.mainSettings.longBreak = action.payload;
    },
    setLongBreakInterval: (state, action) => {
        state.mainSettings.longBreakInterval = action.payload;
    },
    addRoundToBreak: (state) => {
      state.roundsToBreak = state.roundsToBreak + 1;
    },
    removeRoundsToBreak: (state) => {
        state.roundsToBreak = 0;
    },
    setSoundOn: (state) => {
        state.mainSettings.soundOn = !state.mainSettings.soundOn;
    },
    setRepeatSound: (state, action) => {
        state.mainSettings.repeatSound = action.payload;
    },
    setColorTheme: (state, action) => {
      state.mainSettings.colorTheme = action.payload;
      localStorage.setItem('settings', JSON.stringify(state));
    },
    uploadSettings: (state, action) => {
      state.hasLongBreak = action.payload.hasLongBreak;
      state.roundsToBreak = action.payload.roundsToBreak;
      state.mainSettings = action.payload.mainSettings;
    },
    resetSettings: (state) => {
      state.mainSettings = {
        autoToWork: false,
        autoToRelax: false,
        basicBreak: 5,
        longBreak: 15,
        longBreakInterval: 4,
        soundOn: true,
        repeatSound: 0,
        colorTheme: userTheme(),
      }
    }
  },
});

export const { 
setShowSettings, setAutoToWork, 
setAutoToRelax, setLongBreak, 
setLongBreakInterval, setSoundOn, 
setRepeatSound, setColorTheme,
setHasLongBreak, addRoundToBreak,
removeRoundsToBreak, resetSettings, uploadSettings } = settingSlice.actions;

export default settingSlice.reducer;
