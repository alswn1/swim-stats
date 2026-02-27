import './LoginForm.css'
import React, { useState } from 'react'
import { Mail, Lock } from 'lucide-react'
import { supabase } from '../lib/supabase'
import Button from './Button'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const triggerToast = (msg: string) => {
    setErrorMessage(msg);
    setShowToast(true);

    setTimeout(() => setShowToast(false), 1500);
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) triggerToast('로그인에 실패했습니다.');
    setLoading(false);
  };

  return (
    <div className='relative'>
      <form className='LoginForm' onSubmit={handleLogin}>
        <div className='drop-shadow-lg'>
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="email"
                required
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
          </div>
        </div>

        <Button text={loading ? '로그인 중...' : '로그인'} font='do-hyeon' type='LOGIN' loading={loading} />
      </form>
      {
        showToast && (
          <div className='absolute -top-80 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm animate-fade-in-up'>
            {errorMessage}
          </div>
        )
      }
    </div>
  )
}

export default LoginForm