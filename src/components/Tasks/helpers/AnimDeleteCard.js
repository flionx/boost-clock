function AnimDeleteCard(element, type = 'basic') {
    const current = element.current;
    
    const height = current.getBoundingClientRect().height; // Узнаем высоту
    current.style.maxHeight = `${height}px`;
    if (type === 'completed') {
        current.classList.remove("anim-delete-completed"); // для надежности :)       
        current.classList.add("anim-delete-completed");
    } else {
        current.classList.remove("anim-delete"); // для надежности :)       
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