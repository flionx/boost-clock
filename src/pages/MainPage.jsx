import React from 'react'
import MainContent from '../components/MainContent/MainContent'
import Quote from '../components/Quote/Quote'
import useAuth from '../hooks/useAuth'
import WaitModal from '../components/WaitModal/WaitModal'
import { useSelector } from 'react-redux'

const MainPage = () => {
  const {hasWait} = useSelector(state => state.settings.waitModal)

  useAuth();
  return (
    <>
        <MainContent />
        <Quote />
        {hasWait && <WaitModal />}
    </> 
  )
}

export default MainPage;
