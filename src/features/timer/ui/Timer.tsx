import TimerPlayer from './timer-player'
import TimerSettings from './timer-settings'

const Timer = () => {
  return (
    <section className="pt-12.5 mb-10">
      <TimerPlayer />
      <TimerSettings />
    </section>
  )
}

export default Timer