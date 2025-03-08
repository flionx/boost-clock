export default function useMelody() {
    const melodyGoWork = document.querySelector('#melodyGoWork') as HTMLAudioElement;
    melodyGoWork.volume = 0.45;

    const melodyGoRelax = document.querySelector('#melodyGoRelax') as HTMLAudioElement;
    melodyGoRelax.volume = 0.3;

    const melodyNotification = document.querySelector('#notification') as HTMLAudioElement;
    melodyNotification.volume = 0.6;

    return {melodyGoWork, melodyGoRelax, melodyNotification}
}