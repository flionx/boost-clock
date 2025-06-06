import { Route, Routes } from 'react-router-dom';
import { SecondLayout } from './layouts/SecondLayout';
import MainLayout from './layouts/MainLayout';
import MainPage from './pages/MainPage';
import InfoPage from './pages/InfoPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import PolicyPage from './pages/PolicyPage';
import useAutoSave from './hooks/useAutoSave';

function App() {
  useAutoSave();

  return (
    <>
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<MainPage />} />
      </Route>
      <Route element={<SecondLayout />}>
        <Route path='info' element={<InfoPage />}/>
        <Route path='terms-of-use' element={<TermsOfUsePage />}/>
        <Route path='privacy-policy' element={<PolicyPage />}/>
      </Route>
      <Route path='signup' element={<SignUpPage />} />
      <Route path='login' element={<SignInPage />} />
    </Routes>
    </>
  )
}

export default App;
