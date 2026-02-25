import './App.css'
import { Routes, Route } from 'react-router-dom'
import { PATHS } from './constants/paths'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Routes>
        <Route path={PATHS.HOME} element={<Home />} />
      </Routes>
    </>
  )
}

export default App
