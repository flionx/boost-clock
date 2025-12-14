import { TimerSettingsState } from "../store/timer-settings";

export type TimerMode = "work" | "break" | "longBreak";
export type TimerMinutesOperation = "+" | "-";
export type LongBreakChange = "add" | "reset";

export type TimerSettingsSnapshot = Pick<TimerSettingsState, | "workDuration" | "breakDuration" | "longBreakDuration" | "longBreakInterval" 
    | "autoSwitchTo" | "soundEnabled" | "soundCountRepeat">