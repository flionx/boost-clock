const TimerPlayer = () => {
  return (
    <div className="mx-auto bg-accent pt-2.5 px-27.5 pb-10 max-w-112.5 rounded-lg">
      <div className="flex items-center justify-center gap-5 mb-8.5">
        <button className="text-2xl text-white py-1.25 px-2.5 hover:bg-[rgba(0,0,0,0.05)] rounded-sm transition-colors duration-200">Work</button>
        <span className="bg-white h-8.5 w-[3.2]" />
        <button className="text-2xl text-white py-1.25 px-2.5 hover:bg-[rgba(0,0,0,0.05)] rounded-sm transition-colors duration-200">Break</button>
      </div>
    </div>
  )
}

export default TimerPlayer