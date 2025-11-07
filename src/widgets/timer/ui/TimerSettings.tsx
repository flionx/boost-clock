import SquareButton from "./SquareButton";

// "use client"
const TimerSettings = () => {
  return (
    <div className="flex justify-around mx-auto bg-accent pt-2.5 px-[clamp(11px,2vw,50px)] pb-6 max-w-112.5 rounded-lg">
      <div className="flex flex-col items-center">
        <h3 className="mb-5 text-2xl">Work</h3>
        <div className="flex items-center gap-1.5">
          <SquareButton>-</SquareButton>
          <input
            className="w-20.5 h-7.5 rounded-lg bg-[#D9DBFF] dark:bg-[#4b4f6b] text-center text-[22px] appearance-none"
            type="number"
            name="work"
            id="work"
            defaultValue={25}
            />
          <SquareButton>+</SquareButton>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="mb-5 text-2xl">Break</h3>
        <div className="flex items-center gap-1.5">
          <SquareButton>-</SquareButton>
          <input
            className="w-20.5 h-7.5 rounded-lg bg-[#D9DBFF] dark:bg-[#4b4f6b] text-center text-[22px] appearance-none"
            type="number"
            name="break"
            id="break"
            defaultValue={5}
          />
          <SquareButton>+</SquareButton>
        </div>
      </div>
    </div>
  );
};

export default TimerSettings;
