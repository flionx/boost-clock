import React from 'react'
import { Link } from 'react-router-dom';

const HeaderSecond = () => {
  return (
    <header className="header">
            <div className="container header__content-second">
                <Link to='/'>&#8592; home</Link>
                <h1 className="header__logo">BoostClock</h1>
            </div>
    </header>
  )
}

export default HeaderSecond;