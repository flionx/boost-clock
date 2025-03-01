import React from 'react'
import MainContent from '../components/MainContent/MainContent'
import Quote from '../components/Quote/Quote'
import useAuth from '../hooks/useAuth'
import { auth } from '../firebase'

const MainPage = () => {
  async function signOut() {
    try {
      await auth.signOut();
    } catch {
      console.log(error);
    }
  }
  useAuth();
  return (
    <>
        <MainContent />
        <Quote />
        <button onClick={signOut}>Log Out</button>
    </> 
  )
}

export default MainPage;