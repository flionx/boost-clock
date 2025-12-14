"use client"
import { useTimerSettingsStore } from "@/features/timer/store/timer-settings";
import { useTimerPlayerStore } from "../../store/timer-player";
import SettingsCol from "./SettingsCol";

const TimerSettings = () => {
  const workDuration = useTimerSettingsStore(state => state.workDuration);
  const breakDuration = useTimerSettingsStore(state => state.breakDuration);
  const longBreakDuration = useTimerSettingsStore(state => state.longBreakDuration);
  const mode = useTimerPlayerStore(state => state.mode);

  return (
    <div className="flex justify-around mx-auto bg-accent pt-2.5 px-[clamp(11px,2vw,50px)] pb-6 max-w-112.5 rounded-lg">
      <SettingsCol minutes={workDuration} mode="work" />
      <SettingsCol 
        minutes={mode === "work" ? breakDuration : 
          mode === "break" ? breakDuration : longBreakDuration
        } 
        mode={mode === "work" ? "break" : 
          mode === "break" ? "break" : "longBreak"
        } 
      />
    </div>
  );
};

export default TimerSettings;
