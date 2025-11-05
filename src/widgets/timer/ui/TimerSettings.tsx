const TimerSettings = () => {
  return (
    <div className="flex justify-center gap-10 mx-auto bg-accent pt-4 px-[clamp(11px,2vw,50px)] pb-8 max-w-112.5 rounded-lg">
      <div className="flex flex-col items-center">
        <h3 className="mb-3 text-2xl">Work</h3>
        <div className="flex items-center gap-1.5">
          <button className="size-8 bg-white rounded-xl text-black font-bold hover:bg-gray-200">-</button>
          <input
            className="w-16 h-8 rounded-xl bg-[#D9DBFF] dark:bg-[#4b4f6b] text-center appearance-none"
            type="number"
            name="work"
            id="work"
          />
          <button className="size-8 bg-white rounded-xl text-black font-bold hover:bg-gray-200">+</button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="mb-3 text-2xl">Break</h3>
        <div className="flex items-center gap-1.5">
          <button className="size-8 bg-white rounded-xl text-black font-bold hover:bg-gray-200">-</button>
          <input
            className="w-16 h-8 rounded-xl bg-[#D9DBFF] dark:bg-[#4b4f6b] text-center appearance-none"
            type="number"
            name="break"
            id="break"
          />
          <button className="size-8 bg-white rounded-xl text-black font-bold hover:bg-gray-200">+</button>
        </div>
      </div>
    </div>
  );
};

export default TimerSettings;
