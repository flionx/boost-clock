export default function scrollToNew(elementRef: {current: HTMLElement}) {
    // центрирование элемента по центру экрана
    elementRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
}