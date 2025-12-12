import AchievementCard from './AchievementCard'

const Achievements = () => {
  return (
    <div className="grid grid-cols-2 w-full gap-3 mt-9 mb-4">
        <AchievementCard 
            title="I'm new" 
            description="Complete 1 pomodoro round" 
            progress={{
                step: 0,
                max: 1
            }}
        />
        <AchievementCard 
            title="Planner" 
            description="Add the first task" 
            progress={{
                step: 0,
                max: 1
            }}
        />
        <AchievementCard 
            title="Productive" 
            description="Complete 15 pomodoros" 
            progress={{
                step: 0,
                max: 1
            }}
        />
    </div>
  )
}

export default Achievements