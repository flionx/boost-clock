const getFilteredState = (state) => {
    return {
        tasks: state.tasks.tasks,
        settings: state.settings.mainSettings, 
        report: {
            tasks: state.report.tasks,
            timer: state.report.timer,
            today: state.report.today,
        },
        mainTask: state.mainTask, 
        achievement: state.achievement.achievs
    }
    
};

export default getFilteredState

// console.log(state.tasks.tasks);
// console.log(state.settings.mainSettings);
// console.log(state.report.tasks);
// console.log(state.report.timer);
// console.log(state.report.today);
// console.log(state.mainTask);
// console.log(state.achievement.achievs);
