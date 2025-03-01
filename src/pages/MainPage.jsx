import React from 'react'
import MainContent from '../components/MainContent/MainContent'
import Quote from '../components/Quote/Quote'
import useAuth from '../hooks/useAuth'

const MainPage = () => {
  // function signOut() {
    
  // }
  useAuth();
  return (
    <>
        <MainContent />
        <Quote />
        {/* <button onClick={signOut}></button> */}
    </> 
  )
}

export default MainPage