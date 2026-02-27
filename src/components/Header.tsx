import { NavLink } from 'react-router-dom';
import { PATHS } from '../constants/paths';

const Header = () => {
  const active = 'text-blue-600';
  const inactive = 'text-gray-500';

  return (
    <div className='black-han flex sub-bg flex-col mb-8'>
      <div className='flex justify-center items-center h-16 text-3xl'>
        <NavLink
          to={PATHS.HOME}>
          Swim Stats
        </NavLink>
      </div>
      <div className='do-hyeon flex justify-center gap-5 h-8 text-base'>
        <NavLink
          to={PATHS.HOME}
          className={({ isActive }) => isActive ? `${active}` : `${inactive}`}>
          홈
        </NavLink>
        <NavLink
          to={PATHS.LOG}
          className={({ isActive }) => isActive ? `${active}` : `${inactive}`}>
          기록
        </NavLink>
        <NavLink
          to={PATHS.MAP}
          className={({ isActive }) => isActive ? `${active}` : `${inactive}`}>
          지도
        </NavLink>
        <NavLink
          to={PATHS.MYPAGE}
          className={({ isActive }) => isActive ? `${active}` : `${inactive}`}>
          마이페이지
        </NavLink>
      </div>
    </div>
  )
}

export default Header