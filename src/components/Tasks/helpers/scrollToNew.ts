export default function scrollToNew(elementRef: {current: HTMLElement}) {
    // плавное центрирование экрана к элементу
    elementRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
}