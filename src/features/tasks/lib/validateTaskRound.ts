import { Task } from "@/shared/types/tasks";

export const validateTaskRound = (round: Task['round']) => {
    if (round) {
        return round.max > 0 ? round : null;
    } else {
        return round;
    }
}