let intervalId = null;
let seconds = { work: 0, relax: 0 }; 
let nowIsWork = true;

// получаем сообщение (старт, стоп, сброс)
self.onmessage = (e) => {
    const { action, seconds: newSeconds, nowIsWork: isWork } = e.data;
    
    switch(action) {
        // если запущен таймер - уменьшаем время и с каждой операцией - возвращаем результат с updateTime
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
            clearInterval(intervalId);
            break;
        case 'reset':
            seconds = newSeconds;
            break;
    }
};
