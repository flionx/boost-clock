interface ISeconds {
    work: number,
    relax: number
}
interface IMessageData {
    action: 'start' | 'stop' | 'reset',
    seconds: ISeconds,
    nowIsWork: boolean,
}

let intervalId: NodeJS.Timeout | null = null;
let seconds: ISeconds = { work: 0, relax: 0 }; 
let nowIsWork = true;

self.onmessage = (e: {data: IMessageData}) => {
    const { action, seconds: newSeconds, nowIsWork: isWork } = e.data;
    
    switch(action) {
        case 'start':
            seconds = newSeconds;
            nowIsWork = isWork;
            intervalId = setInterval(() => {
                if (nowIsWork) {
                    seconds.work--;
                    self.postMessage({ action: 'updateTime', data: seconds.work });
                } else {
                    seconds.relax--;
                    self.postMessage({ action: 'updateTime', data: seconds.relax });
                }
            }, 1000);
            break;
        case 'stop':
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
            break;
        case 'reset':
            seconds = newSeconds;
            break;
    }
};
