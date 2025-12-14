export interface WorkerMessage {
    type: "stop" | "done"
}
export interface WorkerMessageDuration {
    type: "start" | "tick",
    duration: number
}