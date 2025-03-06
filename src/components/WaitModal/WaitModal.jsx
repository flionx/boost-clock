import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setWaitModal } from '../../store/slices/settingSlice';
import './WaitModal.css'

const WaitModal = () => {

    const dispatch = useDispatch();
    const {status, message} = useSelector(state => state.settings.waitModal)
    
    function closeWaitModal() {
        dispatch(setWaitModal({status: null, hasWait: false, message: ''}))
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