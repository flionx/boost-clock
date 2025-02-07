function AnimDeleteCard(element) {
    const height = element.current.getBoundingClientRect().height; // Узнаем высоту
    element.current.style.maxHeight = `${height}px`; // Устанавливаем max-height
    element.current.classList.add("anim-delete"); // класс с анимацией удаления
    
    setTimeout(() => {
        if (!element.current) return;
        element.current.classList.remove("anim-delete");        
        element.current.style.maxHeight = ``; 
    }, 500)

}

export default AnimDeleteCard;