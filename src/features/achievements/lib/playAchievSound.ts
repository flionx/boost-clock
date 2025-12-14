const playAchievSound = () => {
    const audio = new Audio("/sounds/notification.mp3");
    audio.currentTime = 0;
    audio.volume = 0.6;
    audio.play();
}

export default playAchievSound