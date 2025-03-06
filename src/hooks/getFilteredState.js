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