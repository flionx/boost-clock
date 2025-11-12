import { TimerMessage } from "../types/worker";
let startTime = 0;
let interval: NodeJS.Timeout | null = null;

self.onmessage = (e: MessageEvent<TimerMessage>) => {
    const {type, duration} = e.data;
    if (type === "start") {
        startTime = Date.now();
        if (interval) clearInterval(interval);
        
        interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, duration * 1000 - elapsed);
            self.postMessage({type: "tick", remaining});

            if (remaining <= 0) {
                clearInterval(interval!);
                self.postMessage({type: "done"});
            }
        }, 1000)
    } else if (type === "stop") {
        if (interval) clearInterval(interval);
        interval = null;
    }
}