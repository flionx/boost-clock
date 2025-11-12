import { WorkerMessage, WorkerMessageDuration } from "@/shared/types/worker";

let endTime = 0;
let timer: NodeJS.Timeout | null = null;

self.onmessage = (e: MessageEvent<WorkerMessage | WorkerMessageDuration>) => {
  const message = e.data;

  if (message.type === "start") {
    if (timer) clearInterval(timer);
    endTime = Date.now() + message.duration * 1000;

    const tick = () => {
      const remaining = Math.max(0, (endTime - Date.now()) / 1000);
      self.postMessage({ type: "tick", duration: remaining });

      if (remaining <= 0) {
        clearInterval(timer!);
        self.postMessage({ type: "done" });
      }
    };

    tick();
    timer = setInterval(tick, 1000);
  }

  if (message.type === "stop") {
    if (timer) clearInterval(timer);
    timer = null;
  }
};
