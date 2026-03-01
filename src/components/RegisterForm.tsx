import { useState } from "react"
import Button from "./Button";
import ToastMsg from "./ToastMsg";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../constants/paths";
import { supabase } from "../lib/supabase";

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [toastType, setToastType] = useState<'error' | 'success'>('error');
  const nav = useNavigate();

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isPasswordValid) {
      triggerToast('비밀번호 규칙을 확인해주세요.', 'error');
      setLoading(false);
      return;
    };

    if (password != passwordCheck) {
      triggerToast('비밀번호를 다시 한 번 확인해주세요.', 'error');
      setLoading(false);
      return;
    };

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
        }
      }
    });

    if (error) {
      triggerToast('회원가입에 실패했습니다.', 'error');
      setLoading(false);
      return;
    }

    if (data.user) {
      triggerToast('회원가입이 완료되었습니다.', 'success');
      setTimeout(() => {
        nav(PATHS.LOGIN);
      }, 1500);
    } else {
      triggerToast('회원가입에 실패했습니다.', 'error');
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="w-96 flex flex-col gap-8 items-center" onSubmit={handleRegister}>
        <div className="w-80">
          <div>
            이메일 주소
          </div>
          <input
            type="email"
            required
            autoFocus
            className="w-full px-3 py-3 bg-white border border-slate-200 rounded-xl outline-none transition-all"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-80">
          <div>
            비밀번호
          </div>
          <input
            type="password"
            required
            className="w-full px-3 py-3 bg-white border border-slate-200 rounded-xl outline-none transition-all"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 비밀번호 도움말 */}
          <ul className="text-xs space-y-2 ml-1 flex gap-5 items-center">
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
        <div className="w-80">
          <div>
            비밀번호 확인
          </div>
          <input
            type="password"
            required
            className="w-full px-3 py-3 bg-white border border-slate-200 rounded-xl outline-none transition-all"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />

          {/* 비밀번호 확인 도움말 */}
          <ul className="text-xs space-y-2 ml-1 flex gap-5 items-center">
            <li className={passwordCheck != '' && passwordCheck === password ? 'text-blue-600' : 'text-slate-400'}>
              ✓ 비밀번호가 일치합니다
            </li>
          </ul>
        </div >
        <div className="w-80">
          <div>
            이름
          </div>
          <input
            type="text"
            required
            className="w-full px-3 py-3 bg-white border border-slate-200 rounded-xl outline-none transition-all"
            placeholder="홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div >

        <div className="flex flex-row gap-5 text-lg">
          <Button text='취소하기' font="do-hyeon" type="CANCEL" loading={loading} onClick={() => nav(PATHS.LOGIN)} />
          <Button text={loading ? '가입하는 중...' : '가입하기'} font="do-hyeon" type="CONFIRM" loading={loading} />
        </div>
      </form >

      {
        showToast && (
          <ToastMsg errorMessage={errorMessage} type={toastType} />
        )
      }
    </div >
  )
}

export default RegisterForm