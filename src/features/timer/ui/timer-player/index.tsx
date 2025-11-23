"use client"
import { useTimerPlayerStore } from "@/shared/store/timer-player"
import useDocumentTitleSync from "../../model/useDocumentTItleSync"
import SwitchTimerButton from "./SwitchTimerButton"
import { formatTime } from "../../lib/formatTime"
import TextButton from "./TextButton"
import TimerInitializer from "./TimerInitializer"

const TimerPlayer = () => {
  const {mode, timeLeft, isRunning, toggle, reset, skip} = useTimerPlayerStore();
  useDocumentTitleSync();

  return (
    <>
      <TimerInitializer />
      <div className="mx-auto bg-accent pt-2.5 px-4 pb-10 max-w-112.5 rounded-lg mb-2.5 relative">
        <div className="flex items-center justify-center gap-5 mb-8.5">
          <SwitchTimerButton 
            type="work" 
            isActive={mode === "work"}
          />
          <span className="bg-white h-8.5 min-w-[3.2]" />
          <SwitchTimerButton 
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
            transition-all duration-200 hover:bg-[rgba(255,255,255,0.9)] hover:scale-102 active:bg-white active:scale-99
          " 
          translate="no"
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <div className={`flex gap-7.5 absolute bottom-0 left-1/2 -translate-1/2 duration-200 transition-opacity opacity-0 ${isRunning ? "opacity-100" : ""}`}>
          <TextButton label="Reset" onClick={reset}/>
          <TextButton label="Skip" onClick={skip}/>
        </div>
      </div>
    </>
  )
}

export default TimerPlayer