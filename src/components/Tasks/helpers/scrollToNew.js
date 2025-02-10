export default function scrollToNew(elementRef) {
    // перемещение экрана так, чтобы переданный элемент был по центру
    elementRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    
}