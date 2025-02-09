export default function useMelody() {

    const melodyGoWork = document.querySelector('#melodyGoWork');
    melodyGoWork.volume = 0.45;

    const melodyGoRelax = document.querySelector('#melodyGoRelax');
    melodyGoRelax.volume = 0.3;

    return {melodyGoWork, melodyGoRelax}

}