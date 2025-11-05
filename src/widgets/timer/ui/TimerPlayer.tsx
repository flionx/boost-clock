import ToggleTimerButton from "./ToggleTimerButton"

const TimerPlayer = () => {
  return (
    <div className="mx-auto bg-accent pt-2.5 px-4 sm:px-27.5 pb-10 max-w-112.5 rounded-lg mb-2.5">
      <div className="flex items-center justify-center gap-5 mb-8.5">
        <ToggleTimerButton type="Work" />
        <span className="bg-white h-8.5 w-[3.2]" />
        <ToggleTimerButton type="Break"/>
      </div>
      <h2 className="text-[5.3125rem] text-center mb-12.5 text-white" translate="no">5:00</h2>
      <button 
        className="
          block py-2.5 px-10 bg-white text-black text-[2.5rem] rounded-md uppercase mx-auto
          transition-all duration-200 hover:bg-[rgba(255,255,255,0.9)] hover:scale-102 active:bg-white active:scale-100
        " 
        translate="no"
      >
        Start
      </button>
    </div>
  )
}

export default TimerPlayer