import './ModalWarning.css'
import useStopPageScroll from '../../../../hooks/useStopPageScroll';

function ModalWarning({onClickTrue, onClickFalse}) {
    
    useStopPageScroll();

    return (
        <div className="modal-menu__bg" onClick={() => onClickFalse()}>
            <dialog className="modal-warning" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-warning__title">Warning!</h3>
                <p className="modal-warning__text">Are you sure you want to delete all tasks?</p>
                <div className="modal-warnin__btns">
                    <button 
                    onClick={() => onClickFalse()}
                    className="btn-modal-border">Cancel</button>
                    <button 
                    onClick={() => onClickTrue()}
                    className="btn-modal">Delete</button>

                </div>
            </dialog>
        </div>
    )
}

export default ModalWarning;