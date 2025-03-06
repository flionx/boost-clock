export default function useMelody() {

    const melodyGoWork = document.querySelector('#melodyGoWork');
    melodyGoWork.volume = 0.45;

    const melodyGoRelax = document.querySelector('#melodyGoRelax');
    melodyGoRelax.volume = 0.3;

    const melodyNotification = document.querySelector('#notification');
    melodyNotification.volume = 0.6;

    return {melodyGoWork, melodyGoRelax, melodyNotification}

}