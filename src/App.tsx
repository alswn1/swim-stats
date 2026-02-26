import './App.css'
import { Routes, Route } from 'react-router-dom'
import { PATHS } from './constants/paths'
import Home from './pages/Home'
import Log from './pages/Log'
import Map from './pages/Map'
import Mypage from './pages/Mypage'

function App() {
  return (
    <>
      <Routes>
        <Route path={PATHS.HOME} element={<Home />} />
        <Route path={PATHS.LOG} element={<Log />} />
        <Route path={PATHS.MAP} element={<Map />} />
        <Route path={PATHS.MYPAGE} element={<Mypage />} />
      </Routes>
    </>
  )
}

export default App
