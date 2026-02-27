import Button from './Button'
import LogItem from './LogItem'

const LogList = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <Button text='새로운 수영 기록하기' font='black-han' type='NEW' onClick={() => { console.log('go to create new log page') }} />
      <div className='do-hyeon w-1/2 min-w-96 min-h-96 card-bg rounded-xl p-5 flex flex-col gap-3'>
        <div className='flex justify-around items-center'>
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