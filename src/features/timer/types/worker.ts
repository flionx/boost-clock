export interface TimerMessage {
    type: "start" | "stop",
    duration: number
}
export interface WorkerMessage {
    type: "tick" | "done",
}