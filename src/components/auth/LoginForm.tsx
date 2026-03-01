import React, { useState } from 'react'
import { Mail, Lock } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import Button from '../Button'
import ToastMsg from '../ToastMsg'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [toastType, setToastType] = useState<'error' | 'success'>('error');

  const validatePassword = (pw: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(pw);
  };

  const triggerToast = (msg: string, type: 'error' | 'success') => {
    setErrorMessage(msg);
    setShowToast(true);
    setToastType(type);

    setTimeout(() => setShowToast(false), 1500);
  };

  const isPasswordValid = validatePassword(password);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isPasswordValid) {
      triggerToast('비밀번호 규칙을 확인해주세요.', 'error');
      setLoading(false);
      return;
    };

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) triggerToast('로그인에 실패했습니다.', 'error');
    setLoading(false);
  };

  return (
    <div>
      <form className='w-96 flex flex-col gap-8 items-center' onSubmit={handleLogin}>
        <div className='drop-shadow-lg'>
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="email"
                required
                autoFocus
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-t-xl outline-none transition-all"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-b-xl outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>
            {/* 비밀번호 도움말 */}
            <ul className="text-xs space-y-1 ml-1 flex gap-5 items-center">
              <li className={password.length >= 6 ? 'text-blue-600' : 'text-slate-400'}>
                ✓ 6자리 이상
              </li>
              <li className={/[a-z]/.test(password) && /[A-Z]/.test(password) ? 'text-blue-600' : 'text-slate-400'}>
                ✓ 영어 대소문자 포함
              </li>
              <li className={/\d/.test(password) ? 'text-blue-600' : 'text-slate-400'}>
                ✓ 숫자 포함
              </li>
            </ul>
          </div>
        </div>

        <Button text={loading ? '로그인 중...' : '로그인'} font='do-hyeon' type='LOGIN' loading={loading} />
      </form>
      {
        showToast && (
          <ToastMsg errorMessage={errorMessage} type={toastType} />
        )
      }
    </div>
  )
}

export default LoginForm