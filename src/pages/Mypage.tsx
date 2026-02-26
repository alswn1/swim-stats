import Header from "../components/Header";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../constants/paths";

const Mypage = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    // supabase 로그아웃 (로컬스토리지 세션 삭제)
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('로그아웃 중 에러 발생: ', error.message);
    } else {
      // 로그아웃 성공 후 로그인 페이지로 이동
      alert('로그아웃 되었습니다.');
      navigate(PATHS.LOGIN);
    }
  }

  return (
    <div>
      <Header />
      <button onClick={handleLogout} className="do-hyeon">로그아웃</button>
    </div>
  )
}

export default Mypage;