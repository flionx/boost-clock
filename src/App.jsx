import './css/null.css';
import './css/fonts.css';
import './css/media.css';
import './css/index.css';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import MainPage from './pages/MainPage.jsx';
import InfoPage from './pages/infoPage.jsx';
import { SecondLayout } from './layouts/SecondLayout.jsx';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<MainPage />} />
      </Route>
      <Route element={<SecondLayout />}>
        <Route path='info' element={<InfoPage />}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
