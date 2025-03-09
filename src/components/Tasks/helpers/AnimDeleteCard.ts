function AnimDeleteCard(element: {current: HTMLElement}, type = 'basic') {
    const current = element.current;
    
    const height = current.getBoundingClientRect().height;
    current.style.maxHeight = `${height}px`;
    if (type === 'completed') {
        current.classList.remove("anim-delete-completed");      
        current.classList.add("anim-delete-completed");
    } else {
        current.classList.remove("anim-delete");   
        current.classList.add("anim-delete"); //
    }
    
    // сброс после анимации с небольшой задержкой (анимация 500мс)
    setTimeout(() => {
        if (!current) return;
        if (type === 'completed') {
            current.classList.remove("anim-delete-completed");  
        } else {
            current.classList.remove("anim-delete");  
        }
        current.style.maxHeight = ``; 
    }, 600)

}

export default AnimDeleteCard;