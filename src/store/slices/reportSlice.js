import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  const storage = localStorage.getItem("report");
  const data = storage ? JSON.parse(storage) : null;
  
  const today = new Date().toISOString().split("T")[0]; // '2025-02-20'

  if (!data || data.date !== today) {
    return {
      date: today,
      showReport: false,
      today: {
        workTime: 0,
        relaxTime: 0,
        tCompletedTasks: 0,
      },
      timer: {
        totalWorkTime: 0,
        totalRelaxTime: 0,
        pomodoroRounds: 0,
      },
      tasks: {
        aCompletedTasks: 0,
        onTime: 0,
        outOfTime: 0,
      },
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
        const minutes = action.payload / 60;
        state.today.workTime += minutes;
        state.timer.totalWorkTime += minutes;
        // localStorage.setItem("report", JSON.stringify(state));
    },

    addRelaxTime: (state, action) => {
        const minutes = action.payload / 60;
        state.today.relaxTime += minutes;
        state.timer.totalRelaxTime += minutes;
        // localStorage.setItem("report", JSON.stringify(state));
    },

    addPomodoroRound: (state) => {
        state.timer.pomodoroRounds += 1;
        // localStorage.setItem("report", JSON.stringify(state));
    },

    addCompletedTask: (state, action) => {
        state.today.tCompletedTasks += 1;
        state.tasks.aCompletedTasks += 1;

        if (action.payload === "outTime") {
            state.tasks.outOfTime += 1;
            } else {
            state.tasks.onTime += 1;
        }

        // localStorage.setItem("report", JSON.stringify(state));
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

        // localStorage.setItem("report", JSON.stringify(state));
    }
  }
});

export const { setShowReport, addWorkTime, addRelaxTime, 
addPomodoroRound, addCompletedTask, resetReport } = reportSlice.actions;

export default reportSlice.reducer;
