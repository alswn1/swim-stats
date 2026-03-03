import { useNavigate } from 'react-router-dom'
import Button from './Button'
import LogItem from './LogItem'
import { PATHS } from '../constants/paths';

const LogList = () => {
  const nav = useNavigate();

  return (
    <div className="flex flex-col items-center gap-8">
      <Button text='새로운 수영 기록하기' font='black-han' type='NEW' onClick={() => { nav(PATHS.NEW) }} />
      <div className='do-hyeon w-4/5 min-w-96 min-h-96 card-bg rounded-xl p-5 flex flex-col gap-3'>
        <div className='flex items-center'>
          <div className='w-1/6'>날짜</div>
          <div className='w-1/6'>수영장</div>
          <div className='w-1/6'>거리</div>
          <div className='w-1/6'>시간</div>
          <div className='w-1/6'>영법</div>
          <div className='w-1/6'>action</div>
        </div>
        <hr />
        <LogItem />
      </div>
    </div>
  )
}

export default LogList