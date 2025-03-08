import { FC } from 'react'
import HeaderSecond from '../components/HeaderSecond/HeaderSecond'
import { Link, Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import useChangeTheme from '../hooks/useChangeTheme'

export const SecondLayout: FC = () => {
  useChangeTheme();

  return (
    <> 
        <HeaderSecond />
        <Link to='/' className='btn-arrow-home'></Link>
        <Outlet />
        <Footer />
    </>
  )
}
