"use client"
import { useTimerPlayerStore } from "@/shared/store/timer-player"
import { formatTime } from "../../lib/formatTime"
import ToggleTimerButton from "./ToggleTimerButton"
import useTimerRunning from "../../model/useTimerRunning"

const TimerPlayer = () => {
  const {mode, timeLeft, isRunning, toggle, tick} = useTimerPlayerStore();
  useTimerRunning(isRunning, tick)

  return (
    <div className="mx-auto bg-accent pt-2.5 px-4 pb-10 max-w-112.5 rounded-lg mb-2.5">
      <div className="flex items-center justify-center gap-5 mb-8.5">
        <ToggleTimerButton 
          type="work" 
          isActive={mode === "work"}
        />
        <span className="bg-white h-8.5 min-w-[3.2]" />
        <ToggleTimerButton 
          type="break" 
          isActive={mode === "break" || mode === "longBreak"}
        />
      </div>
      <h2 className="text-[5.3125rem] text-center mb-12.5 text-white" translate="no">
        {formatTime(timeLeft)}
      </h2>
      <button 
        onClick={toggle}
        className="
          block py-2.5 px-10 bg-white text-black text-[2.5rem] rounded-md uppercase mx-auto
          transition-all duration-200 hover:bg-[rgba(255,255,255,0.9)] hover:scale-102 active:bg-white active:scale-100
        " 
        translate="no"
      >
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  )
}

export default TimerPlayer