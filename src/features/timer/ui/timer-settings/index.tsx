"use client"
import { useTimerSettingsStore } from "@/shared/store/timer-settings";
import SettingsCol from "./SettingsCol";

const TimerSettings = () => {
  const {workDuration, breakDuration} = useTimerSettingsStore(state => ({
    workDuration: state.workDuration,
    breakDuration: state.breakDuration
  }));
  return (
    <div className="flex justify-around mx-auto bg-accent pt-2.5 px-[clamp(11px,2vw,50px)] pb-6 max-w-112.5 rounded-lg">
      <SettingsCol minutes={workDuration} mode="work" />
      <SettingsCol minutes={breakDuration} mode="break" />
    </div>
  );
};

export default TimerSettings;
