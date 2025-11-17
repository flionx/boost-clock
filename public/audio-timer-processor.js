class AudioTimerProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.lastTime = currentTime;
    }

    process() {
        const now = currentTime;

        if (now - this.lastTime >= 1) {
            this.lastTime = now;
            this.port.postMessage("tick")
        }

        return true;
    }
}

registerProcessor("audio-timer", AudioTimerProcessor);