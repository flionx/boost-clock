export interface AudioTimer {
    start: (duration: number) => void,
    stop: VoidFunction,
    playSound: VoidFunction,
    getTimeLeft: () => number
}

export default function createAudioTimer(
    onTick: (timeLeft: number) => void,
    onDone: VoidFunction,
    getSoundEnabled: () => boolean,
    getSoundCountRepeat: () => number,
): AudioTimer {
    let audioContext: AudioContext | null = null;
    let workletNode: AudioWorkletNode | null = null;
    let endTime: number | null = null;
    let checkInterval: NodeJS.Timeout | null = null;
    let isActive = false;
    let soundTimeouts: NodeJS.Timeout[] = [];

    async function start(duration: number) {
        isActive = true;
        cleanSoundTimeouts();
        
        endTime = Date.now() + duration * 1000;
        localStorage.setItem('timer_end_time', endTime.toString());
        localStorage.setItem('timer_active', 'true');

        try {
            audioContext = new AudioContext();
            await audioContext.audioWorklet.addModule("/audio-timer-processor.js");
            workletNode = new AudioWorkletNode(audioContext, "audio-timer");

            workletNode.port.onmessage = () => {
                checkAndUpdate();
            };

            workletNode.connect(audioContext.destination);
        } catch (error) {
            console.error("AudioWorklet failed, falling back to interval:", error);
            startInterval();
        }

        startInterval();

        window.addEventListener('focus', checkAndUpdate);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        checkAndUpdate();
    }

    function startInterval() {
        if (checkInterval) clearInterval(checkInterval);
        checkInterval = setInterval(() => {
            checkAndUpdate();
        }, 1000);
    }

    function handleVisibilityChange() {
        if (!document.hidden) {
            checkAndUpdate();
        }
    }

    function checkAndUpdate() {
        if (!isActive || !endTime) return;

        const timeLeft = getTimeLeft();
        onTick(timeLeft);

        if (timeLeft <= 0) {
            complete();
        }
    }

    function complete() {
        isActive = false;
        localStorage.removeItem('timer_end_time');
        localStorage.removeItem('timer_active');
        
        if (getSoundEnabled()) {
            playSound();
        }
        stop();
        onDone();
    }
    
    function playSound() {
        if (!getSoundEnabled()) return;
        try {
            cleanSoundTimeouts()

            const totalSoundPlays = Math.min(getSoundCountRepeat(), 5);
            if (totalSoundPlays < 0) return;

            const audio = new Audio("/sounds/timeOut.mp3");
            audio.volume = 0.45;
            audio.currentTime = 0;
            
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Sound play failed:", error);
                    // showNotification();
                    cleanSoundTimeouts()
                });
            }
        
            for (let i = 1; i <= totalSoundPlays; i++) {
                const timeoutId: NodeJS.Timeout = setTimeout(() => {
                    audio.currentTime = 0;
                    audio.play();
                }, i * 2000); 
        
                soundTimeouts.push(timeoutId); 
            }
        } catch (error) {
            console.error("Sound creation failed:", error);
        }
    }

    function cleanSoundTimeouts() {
        soundTimeouts.forEach(clearTimeout);
        soundTimeouts = [];
    }
    // function showNotification() {
    //     if ("Notification" in window && Notification.permission === "granted") {
    //         new Notification("Pomodoro Timer", {
    //             body: "Time's up!",
    //             icon: "/icon.png",
    //             tag: "pomodoro-timer"
    //         });
    //     }
    // }

    function stop() {
        isActive = false;
        
        try {
            workletNode?.disconnect();
            audioContext?.close();
        } catch (error) {
            console.error("Cleanup error:", error);
        }

        if (checkInterval) {
            clearInterval(checkInterval);
            checkInterval = null;
        }

        window.removeEventListener('focus', checkAndUpdate);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        
        localStorage.removeItem('timer_end_time');
        localStorage.removeItem('timer_active');
    }

    function getTimeLeft(): number {
        if (!endTime) return 0;
        return Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
    }

    return { start, stop, playSound, getTimeLeft }
}