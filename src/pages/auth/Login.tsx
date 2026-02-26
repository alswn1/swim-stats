import './Login.css'
import { ICON_SVG } from '../../constants/assets';
import LoginForm from '../../components/LoginForm';
import Button from '../../components/Button';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../../constants/paths';

const Login = () => {
  return (
    <div className="Login">
      <div dangerouslySetInnerHTML={{ __html: ICON_SVG }} />
      <div className='black-han title_wrapper'>
        <div className='title'>Swim Stats</div><br />
        <div className='do-hyeon sub_title'>
          <span>가까운 수영장 정보부터<br />
            영법별 기록 분석까지 한곳에서</span>
        </div>
      </div>
      <LoginForm />
      <hr className='w-full border-t border-slate-200' />
      <Button text='회원가입' font='do-hyeon' type='REGISTER' loading={false} onClick={() => { <Navigate to={PATHS.REGISTER} /> }} />
    </div>
  )
}

export default Login;