import { FC } from 'react';
import { Link } from 'react-router-dom';
import useChangeTheme from '../../hooks/useChangeTheme';

const HeaderSecond: FC = () => {
  const {changeTheme} = useChangeTheme();

  return (
    <header className="header">
        <div className="container header__content-center">
          <h1 className="header__logo"><Link to='/'>BoostClock</Link></h1>
          <button 
              onClick={changeTheme}
              className="header__theme btn-ui"></button>
        </div>
    </header>
  )
}

export default HeaderSecond;