import Button from './Button'
import LogItem from './LogItem'
import './LogList.css'

const LogList = () => {
  return (
    <div className="LogList">
      <Button text='새로운 수영 기록하기' font='black-han' type='NEW' onClick={() => { console.log('go to create new log page') }} />
      <div className='list_wrapper do-hyeon'>
        <div className='list_category'>
          <div>날짜</div>
          <div>수영장</div>
          <div>거리</div>
          <div>시간</div>
          <div>영법</div>
          <div></div>
        </div>
        <hr />
        <LogItem />
      </div>
    </div>
  )
}

export default LogList