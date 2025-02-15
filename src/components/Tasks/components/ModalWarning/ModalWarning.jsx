import './ModalWarning.css'

function ModalWarning({onClickTrue, onClickFalse}) {
    
    return (
        <div className="modal-bg">
            <dialog className="modal-warning">
                <h3 className="modal-warning__title">Warning!</h3>
                <p className="modal-warning__text">Are you sure you want to delete all tasks?</p>
                <div className="modal-warnin__btns">
                    <button 
                    onClick={() => onClickFalse()}
                    className="btn-modal-border">Cancel</button>
                    <button 
                    onClick={() => onClickTrue()}
                    className="btn-modal btn-ui">Delete</button>

                </div>
            </dialog>
        </div>
    )
}

export default ModalWarning;