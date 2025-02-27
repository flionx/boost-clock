import React from 'react';
import './secondPages.css'

const InfoPage = () => {
  return (
    <div className="container container-second">
        <h2>Info</h2>
        <p>This Pomodoro Timer is designed to increase your productivity, improve your concentration and manage your time effectively. It is based on the Pomodoro method, which breaks work into intervals with short breaks, helping you avoid burnout and maintain a high level of productivity.</p>
        <h3>How to use</h3>
        <ol>
            <li>Select a task - define what you want to work on.</li>
            <li>Start the timer - start a 25-minute work interval (default).</li>
            <li>Concentrate - work without distractions until the end of the interval is signaled.</li>
            <li>Take a short break - 5 minutes rest to recuperate.</li>
            <li>Repeat the cycle - after four work sessions, take a long break (15-30 minutes).</li>
        </ol>
        <h3>Why it works</h3>
        <ul>
            <li><span>Focus on one task</span> - helps you get rid of multi-tasking, which often reduces efficiency.</li>
            <li><span>Clear scheduling</span> - over time you will learn to estimate tasks in “tomatoes”, which will make time allocation easier.</li>
            <li><span>Scientifically proven effect</span> - short breaks between work intervals help you maintain concentration and prevent a decrease in productivity.</li>
        </ul>
        <h3>Bonus features</h3>
        <p>By using BoostClock, you will also get:</p>
        <ul>
            <li><span>Achievements</span> for meeting certain goals.</li>
            <li><span>Statistics</span> to track your productivity.</li>
            <li><span>Motivational quotes</span> every day to be inspired by great personalities.</li>
        </ul>
        <p>Apply the Pomodoro method with BoostClock and achieve more in less time!</p>
    </div>
  )
}

export default InfoPage;