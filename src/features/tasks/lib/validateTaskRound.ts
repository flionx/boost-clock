import { Task } from "../types";

export const validateTaskRound = (round: Task['round']) => {
    if (round) {
        return round.max > 0 ? round : null;
    } else {
        return round;
    }
}