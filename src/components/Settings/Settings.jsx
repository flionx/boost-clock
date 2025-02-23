import { useSelector, useDispatch } from 'react-redux';
import { resetSettings, setAutoToRelax, setAutoToWork, setColorTheme, setLongBreak, setLongBreakInterval, setRepeatSound, setShowSettings, setSoundOn } from '../../store/slices/settingSlice';
import './Settings.css'
import '../../css/modal-menu.css'
import useUpdateStorage from '../../hooks/useUpdateStorage';
import { useEffect } from 'react';
import useChangeTheme from '../../hooks/useChangeTheme';

function Settings() {
    
    const {showSettings, hasLongBreak, ...settings} = useSelector(state => state.settings);

    const {autoToWork, autoToRelax, longBreak, longBreakInterval, soundOn, 
    repeatSound, colorTheme } = useSelector(state => state.settings.mainSettings);

    useUpdateStorage('settings', settings);

    const dispatch = useDispatch();

    const {changeTheme} = useChangeTheme();

    useEffect(() => {
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "";
        }
    }, [])

    function hideSettings() {
        dispatch(setShowSettings(false));
    }
    function onChangeAutoToRelax(e) {
        dispatch(setAutoToRelax(e.target.value))
    }
    function onChangeAutoToWork(e) {
        dispatch(setAutoToWork(e.target.value))
    }
    function onChangeBreak(e) {
        dispatch(setLongBreak(e.target.value))
    }
    function onChangeBreakInterval(e) {
        dispatch(setLongBreakInterval(e.target.value))
    }
    function onChangeSoundOn(e) {
        dispatch(setSoundOn(e.target.value))
    }
    function onChangeRepeatSound(e) {
        dispatch(setRepeatSound(e.target.value))
    }
    function onChangeColorTheme(e) {
        dispatch(setColorTheme(e.target.value))
        changeTheme();
    }
    function resetSettingsHandle(e) {
        dispatch(resetSettings())
    }
    
    return (
        <div
        onClick={hideSettings}
        className="modal-menu__bg">

        <section 
        onClick={(e) => e.stopPropagation()}
        className="modal-menu">
            <div 
            onClick={(e) => {
                e.stopPropagation();
                hideSettings();
            }}
            className="modal-menu__close"></div>
            <h3 className="modal-menu__title">Settings</h3>
            <section className="modal-menu__column column-modal-menu">
                <h4 className="column-modal-menu__title">Timer</h4>
                <hr className='column-modal-menu-line'/>
                <div className="column-modal-menu__row">
                    <label className="column-settings__label" htmlFor="autoSwithToWork">Auto switching to work</label>
                    <label className="switch">
                        <input type="checkbox" id='autoSwithToWork' name="autoSwithToWork" 
                        onChange={onChangeAutoToWork} checked={autoToWork}/>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="column-modal-menu__row">
                    <label className="column-settings__label" htmlFor="autoSwithToRelax">Auto switching to relax</label>
                    <label className="switch">
                        <input type="checkbox" id='autoSwithToRelax' name="autoSwithToRelax" 
                        onChange={onChangeAutoToRelax} checked={autoToRelax}/>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="column-modal-menu__row">
                    <p>Long break</p>
                    <input type="number" min={0} 
                    value={longBreak} 
                    onChange={onChangeBreak} name="longBreak"/>
                </div>
                <div className="column-modal-menu__row">
                    <p>Long Break interval</p>
                    <input type="number" min={0} 
                    value={longBreakInterval} 
                    onChange={onChangeBreakInterval} name="longBreakInterval"/>
                </div>

            </section>
            <section className="settings__column column-settings">
                <h4 className="column-modal-menu__title">Sounds</h4>
                <hr className='column-modal-menu-line'/>

                <div className="column-modal-menu__row">
                    <label className="column-settings__label" htmlFor="soundOnOff">Sound on</label>
                    <label className="switch">
                        <input type="checkbox" id='soundOnOff' name="soundOnOff" 
                        onChange={onChangeSoundOn} checked={soundOn}/>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="column-modal-menu__row">
                    <p>Repeat</p>
                    <input type="number" min={0} max={5}
                    value={repeatSound} 
                    onChange={onChangeRepeatSound} name="repeatSound"/>
                </div>

            </section>
            <section className="settings__column column-settings">
                <h4 className="column-modal-menu__title">Theme</h4>
                <hr className='column-modal-menu-line'/>

                <div className="column-modal-menu__row">
                    <p>Color</p>
                    <select className='modal-menu__select' name="select" value={colorTheme} onChange={onChangeColorTheme}>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </select>
                </div>
            </section>
            <div className="modal-menu__btns">
                <button onClick={resetSettingsHandle}>Reset</button>
                {/* <button>Download</button> */}
            </div>
        </section>
        </div>
    )
}

export default Settings;