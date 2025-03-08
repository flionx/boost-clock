import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMainSettings, ISettings, IWaitModal } from "../types/types";

const getInitialSettings = ():IMainSettings => {
  const storage = localStorage.getItem("settings");
  return storage ? JSON.parse(storage) : defaultMainSettings;
};

const defaultMainSettings: IMainSettings = {
  autoToWork: false,
  autoToRelax: false,
  basicBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  soundOn: true,
  repeatSound: 0,
  colorTheme: 'light',
}

const initialState: ISettings = {
  showSettings: false,
  hasLongBreak: false,
  roundsToBreak: 0,
  waitModal: {
    status: 'orange',
    hasWait: false,
    message: '',
  },
  mainSettings: getInitialSettings(),
}

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setShowSettings: (state, action: PayloadAction<boolean>) => {      
      state.showSettings = action.payload;
    },
    setHasLongBreak: (state, action: PayloadAction<boolean>) => {
      state.hasLongBreak = action.payload;
    },
    setAutoToWork: (state) => {
        state.mainSettings.autoToWork = !state.mainSettings.autoToWork;
    },
    setAutoToRelax: (state) => {
        state.mainSettings.autoToRelax = !state.mainSettings.autoToRelax;
    },
    setLongBreak: (state, action: PayloadAction<number>) => {
        state.mainSettings.longBreak = action.payload;
    },
    setLongBreakInterval: (state, action: PayloadAction<number>) => {
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
    setRepeatSound: (state, action: PayloadAction<number>) => {
        state.mainSettings.repeatSound = action.payload;
    },
    setColorTheme: (state, action: PayloadAction<IMainSettings['colorTheme']>) => {
      state.mainSettings.colorTheme = action.payload;
      localStorage.setItem('settings', JSON.stringify(state.mainSettings));
    },
    setWaitModal: (state, action: PayloadAction<IWaitModal>) => {
      state.waitModal.status = action.payload.status;
      state.waitModal.hasWait = action.payload.hasWait;
      state.waitModal.message = action.payload.message;
    },
    uploadSettings: (state, action: PayloadAction<IMainSettings>) => {
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
