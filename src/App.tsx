import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PATHS } from './constants/paths'
import { supabase } from './lib/supabase'
import Home from './pages/Home'
import Log from './pages/Log'
import Map from './pages/Map'
import Mypage from './pages/Mypage'
import Login from './pages/auth/Login'

function App() {
  // 로그인 상태: null(확인중) -> false(로그아웃) -> true(로그인됨)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    // 처음 웹 로드될 때 이미 로그인된 사용자가 있는지 확인
    supabase.auth.getSession().then(({ data }) => {
      // session 있으면 true, 없으면 false
      setIsLoggedIn(!!data.session)
    })

    // 로그인, 로그아웃 시 자동 감지 리스너
    // 다른 탭에서도 실시간으로 반영
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session)
    })

    // 컴포넌트 제거될 때 리스너 정리
    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])  // 웹 실행될 때 딱 한 번 실행

  if (isLoggedIn === null) {
    return <div>로딩 중...</div>
  }

  return (
    <>
      <Routes>
        {isLoggedIn ? (
          // 로그인 됨
          <>
            <Route path={PATHS.HOME} element={<Home />} />
            <Route path={PATHS.LOG} element={<Log />} />
            <Route path={PATHS.MAP} element={<Map />} />
            <Route path={PATHS.MYPAGE} element={<Mypage />} />
            <Route path='*' element={<Navigate to={PATHS.HOME} />} />
          </>
        ) : (
          // 로그아웃 됨
          <>
            <Route path={PATHS.LOGIN} element={<Login />} />
            <Route path='*' element={<Navigate to={PATHS.LOGIN} />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default App
