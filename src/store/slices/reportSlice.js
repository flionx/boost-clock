import { createSlice } from "@reduxjs/toolkit";

const saveToLocalStorage = (state) => {
  const stateToSave = {
      date: state.date,
      today: state.today,
      timer: state.timer,
      tasks: state.tasks,
      showReport: false
  };
  localStorage.setItem("report", JSON.stringify(stateToSave));
};

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
      timer: data?.timer || {
        totalWorkTime: 0,
        totalRelaxTime: 0,
        pomodoroRounds: 0,
      },
      tasks: data?.tasks || {
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
        const min = action.payload / 60;
        const minutes = Number(min.toFixed(3))
        state.today.workTime += minutes;
        state.timer.totalWorkTime += minutes;
        saveToLocalStorage(state);
    },

    addRelaxTime: (state, action) => {
        const min = action.payload / 60;
        const minutes = Number(min.toFixed(3))
        state.today.relaxTime += minutes;
        state.timer.totalRelaxTime += minutes;
        saveToLocalStorage(state);
    },

    addPomodoroRound: (state) => {
        state.timer.pomodoroRounds += 1;
        saveToLocalStorage(state);
    },

    addCompletedTask: (state, action) => {
        state.today.tCompletedTasks += 1;
        state.tasks.aCompletedTasks += 1;
        if (action.payload === "outTime") {
            state.tasks.outOfTime += 1;
            } else {
            state.tasks.onTime += 1;
        }
        saveToLocalStorage(state);
    },
    uploadReport: (state, action) => {
      state.today = action.payload.today;
      state.timer = action.payload.timer;
      state.tasks = action.payload.tasks;
      saveToLocalStorage(state);

    },
    resetReport: (state) => {
      state.today = { workTime: 0, relaxTime: 0, tCompletedTasks: 0 };
      state.timer = { totalWorkTime: 0, totalRelaxTime: 0, pomodoroRounds: 0}
      state.tasks ={ aCompletedTasks: 0, onTime: 0, outOfTime: 0}
      saveToLocalStorage(state);
    }
  }
});

export const { setShowReport, addWorkTime, addRelaxTime, 
addPomodoroRound, addCompletedTask, resetReport, uploadReport } = reportSlice.actions;

export default reportSlice.reducer;