import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { setWaitModal } from '../../store/slices/settingSlice';
import './WaitModal.css'

const WaitModal: FC = () => {
    const dispatch = useAppDispatch();
    const {status, message} = useAppSelector(state => state.settings.waitModal)
    
    function closeWaitModal() {
        dispatch(setWaitModal({status: 'orange', hasWait: false, message: ''}))
    }
    return (
        <div className='wait-modal'>
            <div className={`wait-modal__status ${status || 'orange'}`}></div>
            <div className="wait-modal__message">{message || 'Something went wrong'}</div>
            <button className='wait-modal__btn' onClick={closeWaitModal}></button>
        </div>
    )
}

export default WaitModal