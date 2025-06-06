var intervalId = null;
var seconds = { work: 0, relax: 0 };
var nowIsWork = true;
self.onmessage = function (e) {
    var _a = e.data, action = _a.action, newSeconds = _a.seconds, isWork = _a.nowIsWork;
    switch (action) {
        case 'start':
            seconds = newSeconds;
            nowIsWork = isWork;
            intervalId = setInterval(function () {
                if (nowIsWork) {
                    seconds.work--;
                    self.postMessage({ action: 'updateTime', data: seconds.work });
                }
                else {
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
