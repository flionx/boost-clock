function AnimDeleteCard(element, type = 'basic') {
    
    const height = element.current.getBoundingClientRect().height; // Узнаем высоту
    element.current.style.maxHeight = `${height}px`; // Устанавливаем max-height
    if (type === 'completed') {
        element.current.classList.remove("anim-delete-completed"); // для надежности :)       
        element.current.classList.add("anim-delete-completed"); // класс с анимацией удаления
    } else {
        element.current.classList.remove("anim-delete"); // для надежности :)       
        element.current.classList.add("anim-delete"); // класс с анимацией удаления

    }
    
    setTimeout(() => {
        if (!element.current) return;
        if (type === 'completed') {
            element.current.classList.remove("anim-delete-completed");  
        } else {
            element.current.classList.remove("anim-delete");  
        }
              
        element.current.style.maxHeight = ``; 
    }, 600)

}

export default AnimDeleteCard;