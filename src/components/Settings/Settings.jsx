import { useSelector, useDispatch } from 'react-redux';
import { setAutoToRelax, setAutoToWork, setColorTheme, setLongBreak, setLongBreakInterval, setRepeatSound, setShowSettings, setSoundOn } from '../../store/slices/settingSlice';
import './Settings.css'
import useUpdateStorage from '../../hooks/useUpdateStorage';

function Settings() {
    
    const {showSettings, ...settings} = useSelector(state => state.settings);

    const {autoToWork, autoToRelax, longBreak, longBreakInterval, soundOn, 
    repeatSound, colorTheme } = useSelector(state => state.settings.mainSettings);

    useUpdateStorage('settings', settings);

    const dispatch = useDispatch();
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
    }
    
    return (
        <div
        onClick={hideSettings}
        className="settings-bg">

        <section 
        onClick={(e) => e.stopPropagation()}
        className="settings">
            <div 
            onClick={(e) => {
                e.stopPropagation();
                hideSettings();
            }}
            className="settings__btn-close"></div>
            <h3 className="settings__title">Settings</h3>
            <section className="settings__column column-settings">
                <h4 className="column-settings__title">Timer</h4>
                <hr className='column-settings__title-line'/>
                <div className="column-settings__row">
                    <label className="column-settings__label" htmlFor="autoSwithToWork">Auto switching to work</label>
                    <label className="switch">
                        <input type="checkbox" name="autoSwithToWork" 
                        onChange={onChangeAutoToWork} checked={autoToWork}/>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="column-settings__row">
                    <p>Auto switching to relax</p>
                    <label className="switch">
                        <input type="checkbox" name="autoSwithToRelax" 
                        onChange={onChangeAutoToRelax} checked={autoToRelax}/>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="column-settings__row">
                    <p>Long break</p>
                    <input type="number" min={0} 
                    value={longBreak} 
                    onChange={onChangeBreak} name="longBreak"/>
                </div>
                <div className="column-settings__row">
                    <p>Long Break interval</p>
                    <input type="number" min={0} 
                    value={longBreakInterval} 
                    onChange={onChangeBreakInterval} name="longBreakInterval"/>
                </div>

            </section>
            <section className="settings__column column-settings">
                <h4 className="column-settings__title">Sounds</h4>
                <hr className='column-settings__title-line'/>

                <div className="column-settings__row">
                    <p>Sound on</p>
                    <label className="switch">
                        <input type="checkbox" name="soundOnOff" 
                        onChange={onChangeSoundOn} checked={soundOn}/>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="column-settings__row">
                    <p>Repeat</p>
                    <input type="number" min={0} max={5}
                    value={repeatSound} 
                    onChange={onChangeRepeatSound} name="repeatSound"/>
                </div>

            </section>
            <section className="settings__column column-settings">
                <h4 className="column-settings__title">Theme</h4>
                <hr className='column-settings__title-line'/>

                <div className="column-settings__row">
                    <p>Color</p>
                    <select name="select" value={colorTheme} onChange={onChangeColorTheme}>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </select>
                </div>
            </section>
        </section>
        </div>
    )
}

export default Settings;