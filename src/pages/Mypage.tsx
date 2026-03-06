import Header from "../components/common/Header";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../constants/paths";
import { useAuth } from "../contexts/AuthContext";

const Mypage = () => {
  const nav = useNavigate();
  const { user } = useAuth();
  const username = user?.user_metadata.name;
  const maxDistance = user?.user_metadata.maxDistance || 0;
  const maxTime = user?.user_metadata.maxTime || 0;
  const userTitle =
    maxDistance < 25 ? '수린이' :
      maxDistance < 100 ? '수초딩' :
        maxDistance < 400 ? '수중딩' :
          maxDistance < 1000 ? '수고딩' :
            maxDistance < 3000 ? '수영왕' : '포세이돈';

  const handleLogout = async () => {
    // supabase 로그아웃 (로컬스토리지 세션 삭제)
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('로그아웃 중 에러 발생: ', error.message);
    } else {
      // 로그아웃 성공 후 로그인 페이지로 이동
      alert('로그아웃 되었습니다.');
      nav(PATHS.LOGIN);
    }
  }

  return (
    <div className="flex flex-col gap-8 do-hyeon">
      <Header />
      <div className="w-[600px] card-bg p-8 pl-10 pr-10 rounded-xl flex flex-col items-center justify-center m-auto gap-6">
        <div className="text-3xl">{userTitle} <span className="text-blue-600 text-4xl">{username}</span>님 반가워요!</div>
        <div className="text-2xl">개인 최고 기록</div>
        <div className="text-xl flex flex-row gap-10">
          <div>최장 수영 거리</div>
          <div>{maxDistance.toLocaleString()} m</div>
        </div>
        <div className="text-xl flex flex-row gap-10">
          <div>최장 수영 시간</div>
          <div>{maxTime} 분</div>
        </div>
      </div>
      <button onClick={handleLogout} className="text-lg">로그아웃</button>
    </div>
  )
}

export default Mypage;