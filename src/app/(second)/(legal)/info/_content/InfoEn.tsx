import { TitleLegal, TextLegal, SubtitleLegal, ListLegal } from "@/shared/ui/Legal"

const InfoEn = () => {
  return (
    <>
      <TitleLegal>Info</TitleLegal>
      <TextLegal>This Pomodoro Timer is designed to increase your productivity, improve your concentration and manage your time effectively. It is based on the Pomodoro method, which breaks work into intervals with short breaks, helping you avoid burnout and maintain a high level of productivity.</TextLegal>
      <SubtitleLegal>How to use</SubtitleLegal>
      <ListLegal type="ordered">
        <li>Select a task - define what you want to work on.</li>
        <li>Start the timer - start a 25-minute work interval (default).</li>
        <li>Concentrate - work without distractions until the end of the interval is signaled.</li>
        <li>Take a short break - 5 minutes rest to recuperate.</li>
        <li>Repeat the cycle - after four work sessions, take a long break (15-30 minutes).</li>
      </ListLegal>
      <SubtitleLegal>Why it works</SubtitleLegal>
      <ListLegal type="unordered">
        <li>Short intervals prevent burnout and maintain focus.</li>
        <li>Regular breaks help your brain stay fresh and creative.</li>
        <li>Clear structure reduces procrastination and decision fatigue.</li>
        <li>Small wins build momentum and motivation.</li>
      </ListLegal>
      <SubtitleLegal>Bonus features</SubtitleLegal>
      <TextLegal>By using BoostClock, you will also get:</TextLegal>
      <ListLegal type="unordered">
        <li>Achievements for meeting certain goals.</li>
        <li>Statistics to track your productivity.</li>
        <li>Motivational quotes every day to be inspired by great personalities.</li>
      </ListLegal>
      <TextLegal>Apply the Pomodoro method with BoostClock and achieve more in less time!</TextLegal>
    </>
  )
}

export default InfoEn