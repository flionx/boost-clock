class AudioTimerProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.lastTick = 0;
    }

    process(inputs, outputs, parameters) {
        const output = outputs[0];
        if (output.length > 0) {
            for (let channel of output) channel.fill(0);
        }

        const now = currentTime;

        if (now - this.lastTick >= 1.0) {
            this.lastTick = now - (now - this.lastTick - 1.0);
            this.port.postMessage("tick");
        }

        return true;
    }
}

registerProcessor("audio-timer", AudioTimerProcessor);