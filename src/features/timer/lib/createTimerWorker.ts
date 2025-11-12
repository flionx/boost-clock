import { WorkerMessage } from "@/shared/types/worker";

const createTimerWorker = (
    onMessage: (msg: WorkerMessage) => void
) => {
    let worker: Worker | null = null;

    if (typeof window !== "undefined") {
        worker = new Worker(
            new URL("../worker/index.ts", import.meta.url), 
            {type: "module"}
        )   
        worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
            onMessage(e.data)
        }
    }

    return worker;
}

export default createTimerWorker