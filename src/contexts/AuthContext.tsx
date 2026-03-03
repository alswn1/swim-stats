/* eslint-disable react-refresh/only-export-components */
import type { User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type AuthContextValue = {
  user: User | null;
  isLoggedIn: boolean | null;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoggedIn: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // 처음 로드될 때 로그인된 세션이 있는지 확인인
    supabase.auth.getSession().then(({ data }) => {
      const session = data.session;

      // 세션이 있으면 로그인된 상태
      setIsLoggedIn(!!session);
      setUser(session?.user ?? null);
    });

    // 로그인, 로그아웃, 토큰 변경이 일어날 때마다 자동으로 콜백 생성
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
        // 로그아웃 시에는 반드시 null로 비워줘야 다른 Context들도 정상적으로 리셋됩니다.
        setUser(session?.user ?? null);
      }
    );

    // 컴포넌트 언마운트 될 때 리스너 정리
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Context Provider로 user와 isLoggedIn을 하위 컴포넌트에 공급
  return (
    <AuthContext.Provider value={{ user, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);