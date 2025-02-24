import useStopPageScroll from '../../hooks/useStopPageScroll';

function ModalMenu({children, title, callbackReset}) {
    
    useStopPageScroll();

    function hideReport() {

    }

    return (
        <div
        onClick={hideReport}
        className="modal-menu__bg">

        <section 
        onClick={(e) => e.stopPropagation()}
        className="modal-menu">
            <div 
            onClick={(e) => {
                e.stopPropagation();
                hideReport()
            }}
            className="modal-menu__close"></div>
            <h3 className="modal-menu__title">{title}</h3>
            
                {children}

            <div className="modal-menu__btns">
                <button onClick={callbackReset}>Reset</button>
                <button>Download</button>
            </div>
        </section>
        </div>
    )
}

export default ModalMenu;