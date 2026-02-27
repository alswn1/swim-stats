import { ICON_SVG } from '../../constants/assets';
import LoginForm from '../../components/LoginForm';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/paths';

const Login = () => {
  const nav = useNavigate();

  return (
    <div className="w-1/2 card-bg flex flex-col gap-10 justify-center items-center m-auto mt-28 p-14 rounded-xl">
      <div dangerouslySetInnerHTML={{ __html: ICON_SVG }} />
      <div className='black-han flex flex-col text-center'>
        <div className='text-4xl'>Swim Stats</div><br />
        <div className='do-hyeon text-xl'>
          <span>가까운 수영장 정보부터<br />
            영법별 기록 분석까지 한곳에서</span>
        </div>
      </div>
      <LoginForm />
      <hr className='w-full border-t border-slate-200' />
      <Button text='회원가입' font='do-hyeon' type='REGISTER' onClick={() => { nav(PATHS.REGISTER) }} />
    </div>
  )
}

export default Login;