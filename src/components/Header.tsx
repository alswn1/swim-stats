import { NavLink } from 'react-router-dom';
import { PATHS } from '../constants/paths';
import './Header.css';

const Header = () => {
  return (
    <div className='black-han Header'>
      <div className='header-title'>
        <NavLink
          to={PATHS.HOME}>
          Swim Stats
        </NavLink>
      </div>
      <div className='do-hyeon header-nav'>
        <NavLink
          to={PATHS.HOME}
          className={({ isActive }) => isActive ? 'active' : 'inactive'}>
          홈
        </NavLink>
        <NavLink
          to={PATHS.LOG}
          className={({ isActive }) => isActive ? 'active' : 'inactive'}>
          기록
        </NavLink>
        <NavLink
          to={PATHS.MAP}
          className={({ isActive }) => isActive ? 'active' : 'inactive'}>
          지도
        </NavLink>
        <NavLink
          to={PATHS.MYPAGE}
          className={({ isActive }) => isActive ? 'active' : 'inactive'}>
          마이페이지
        </NavLink>
      </div>
    </div>
  )
}

export default Header