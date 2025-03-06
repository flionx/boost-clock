import { createSlice } from "@reduxjs/toolkit";

const defaultMainSettings = {
  autoToWork: false,
  autoToRelax: false,
  basicBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  soundOn: true,
  repeatSound: 0,
  colorTheme: 'light',
}

const getInitialSettings = () => {
    const storage = localStorage.getItem("settings");
    return storage ? JSON.parse(storage) : defaultMainSettings;
  };

const settingSlice = createSlice({
  name: "settings",
  initialState: {
    showSettings: false,
    hasLongBreak: false,
    roundsToBreak: 0,
    waitModal: {
      status: '',
      hasWait: false,
      message: '',
    },
    mainSettings: getInitialSettings(),
  },
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
      localStorage.setItem('settings', JSON.stringify(state.mainSettings));
    },
    setWaitModal: (state, action) => {
      state.waitModal.status = action.payload.status;
      state.waitModal.hasWait = action.payload.hasWait;
      state.waitModal.message = action.payload.message;
    },
    uploadSettings: (state, action) => {
      state.mainSettings = action.payload;
      localStorage.setItem('settings', JSON.stringify(state.mainSettings));
    },
    resetSettings: (state) => {
      state.mainSettings = defaultMainSettings;
      localStorage.setItem('settings', JSON.stringify(state.mainSettings));
    }
  },
});

export const { 
setShowSettings, setAutoToWork, 
setAutoToRelax, setLongBreak, 
setLongBreakInterval, setSoundOn, 
setRepeatSound, setColorTheme,
setHasLongBreak, addRoundToBreak,
removeRoundsToBreak, resetSettings, 
uploadSettings, setWaitModal } = settingSlice.actions;

export default settingSlice.reducer;
