import { createSlice } from "@reduxjs/toolkit";

function checkTimer(data) {
    return ( data ?? {
        totalWorkTime: 0,
        totalRelaxTime: 0,
        pomodoroRounds: 0,
      })
}
function checkTasks(data) {
    return (data ?? {
        aCompletedTasks: 0,
        onTime: 0,
        outOfTime: 0,
      })
}

const loadFromLocalStorage = () => {
  const storage = localStorage.getItem("report");
  const data = storage ? JSON.parse(storage) : null;
  
  const today = new Date().toISOString().split("T")[0]; // '2025-02-20'

  if (data?.date !== today) {
    return {
      date: today,
      showReport: false,
      today: {
        workTime: 0,
        relaxTime: 0,
        tCompletedTasks: 0,
      },
      timer: checkTimer(data?.timer),
      tasks: checkTasks(data?.tasks),
    };
  }

  return data;
};

const reportSlice = createSlice({
    name: "report",
    initialState: loadFromLocalStorage(),
    reducers: {
    setShowReport: (state, action) => {
        state.showReport = action.payload;
    },

    addWorkTime: (state, action) => {
        const min = action.payload / 60;
        const minutes = Number(min.toFixed(3))
        state.today.workTime += minutes;
        state.timer.totalWorkTime += minutes;
    },

    addRelaxTime: (state, action) => {
        const min = action.payload / 60;
        const minutes = Number(min.toFixed(3))
        state.today.relaxTime += minutes;
        state.timer.totalRelaxTime += minutes;
    },

    addPomodoroRound: (state) => {
        state.timer.pomodoroRounds += 1;
    },

    addCompletedTask: (state, action) => {
        state.today.tCompletedTasks += 1;
        state.tasks.aCompletedTasks += 1;

        if (action.payload === "outTime") {
            state.tasks.outOfTime += 1;
            } else {
            state.tasks.onTime += 1;
        }
    },

    resetReport: (state) => {
        state.today = { workTime: 0, relaxTime: 0, tCompletedTasks: 0 };

        state.timer = {
            totalWorkTime: 0,
            totalRelaxTime: 0,
            pomodoroRounds: 0,
        }
        state.tasks ={
            aCompletedTasks: 0,
            onTime: 0,
            outOfTime: 0,
        }
    }
  }
});

export const { setShowReport, addWorkTime, addRelaxTime, 
addPomodoroRound, addCompletedTask, resetReport } = reportSlice.actions;

export default reportSlice.reducer;