import { useAppSelector } from '../../hooks/useRedux';
import useUpdateStorage from '../../hooks/useUpdateStorage';
import useStopPageScroll from '../../hooks/useStopPageScroll';
import useManageSettings from '../../hooks/manage/useManageSettings';
import '../../css/modal-menu.css';
import './Settings.css';
import SwitchRowSetting from './components/SwitchRowSetting';
import NumbRowSetting from './components/NumbRowSetting';

const Settings = () => {
    const mainSettings = useAppSelector(state => state.settings.mainSettings);
    const {autoToWork, autoToRelax, longBreak, longBreakInterval, soundOn, 
    repeatSound, colorTheme } = useAppSelector(state => state.settings.mainSettings);

    useUpdateStorage('settings', mainSettings);
    useStopPageScroll();

    const {
        hideSettings, onChangeAutoToRelax, onChangeAutoToWork, onChangeBreak, onChangeBreakInterval, 
        onChangeSoundOn, onChangeRepeatSound, onChangeColorTheme, resetSettingsHandle
    } = useManageSettings();
    
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
                <SwitchRowSetting 
                    idName='autoSwithToWork' 
                    onChange={onChangeAutoToWork} 
                    checked={autoToWork}>Auto switching to work
                </SwitchRowSetting> 
                <SwitchRowSetting 
                    idName='autoSwithToRelax' 
                    onChange={onChangeAutoToRelax} 
                    checked={autoToRelax}>Auto switching to relax
                </SwitchRowSetting> 
                <NumbRowSetting 
                    value={longBreak} 
                    onChange={onChangeBreak}>Long break
                </NumbRowSetting>
                <NumbRowSetting 
                    value={longBreakInterval} 
                    onChange={onChangeBreakInterval}>Long Break interval
                </NumbRowSetting>
            </section>
            <section className="settings__column column-settings">
                <h4 className="column-modal-menu__title">Sounds</h4>
                <hr className='column-modal-menu-line'/>
                <SwitchRowSetting 
                    idName='soundOnOff' 
                    onChange={onChangeSoundOn} 
                    checked={soundOn}>Sound on
                </SwitchRowSetting> 
                <NumbRowSetting 
                    value={repeatSound} 
                    max={5} 
                    onChange={onChangeRepeatSound}>Repeat
                </NumbRowSetting>
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