import React from 'react'
import MainContent from '../components/MainContent/MainContent'
import Quote from '../components/Quote/Quote'
import useAuth from '../hooks/useAuth'

const MainPage = () => {

  useAuth();
  return (
    <>
        <MainContent />
        <Quote />
    </> 
  )
}

export default MainPage;
