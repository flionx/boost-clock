function formatTime(seconds) {
    const mins = seconds / 60 |0;
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default formatTime;