import './ModalWarning.css'
import useStopPageScroll from '../../hooks/useStopPageScroll';
import { FC } from 'react';
interface Props {
    onClickTrue: VoidFunction,
    onClickFalse: VoidFunction,
    text: string,
    btnTrueText: string,
}
const ModalWarning: FC<Props> = ({onClickTrue, onClickFalse, text, btnTrueText}) => {
    useStopPageScroll();
    return (
        <div className="modal-menu__bg" onClick={onClickFalse}>
            <dialog className="modal-warning" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-warning__title">Warning!</h3>
                <p className="modal-warning__text">{text}</p>
                <div className="modal-warnin__btns">
                    <button 
                    onClick={onClickFalse}
                    className="btn-modal-border">Cancel</button>
                    <button 
                    onClick={onClickTrue}
                    className="btn-modal">{btnTrueText}</button>
                </div>
            </dialog>
        </div>
    )
}

export default ModalWarning;