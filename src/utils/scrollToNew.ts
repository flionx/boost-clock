export default function scrollToNew(elementRef: React.RefObject<HTMLElement>) {
    const element = elementRef.current as HTMLElement;
    // плавное центрирование экрана к элементу
    element.scrollIntoView({ behavior: "smooth", block: "center" });
}