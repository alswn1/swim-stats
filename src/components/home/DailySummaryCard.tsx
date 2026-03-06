import { ChevronRight } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Waves, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/paths";

const DailySummaryCard = () => {
  const { user } = useAuth();
  const nav = useNavigate();

  return (
    <div className="w-1/3 min-w-96 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-lg p-5 text-white">
      {
        user?.user_metadata.hasLoggedToday ? (
          <div>
            <div className="text-3xl text-center mb-5">{user.user_metadata.lastLogDate}</div>
            <div className="flex justify-center gap-14">
              <div className="text-2xl text-center">
                <Waves className="m-auto mb-2" />
                <div>{user.user_metadata.todayTotalDistance.toLocaleString()}m</div>
              </div>
              <div className="text-3xl">/</div>
              <div className="text-2xl text-center">
                <Timer className="m-auto mb-2" />
                <div>{user.user_metadata.todayTotalTime}분</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-around gap-14 cursor-pointer" onClick={() => nav(PATHS.NEW)}>
            <div className="text-2xl text-center">
              오늘 수영은 어떠셨나요? 🏊<br />
              기록을 남겨보세요!
            </div>
            <ChevronRight className="w-14 h-14" />
          </div>
        )
      }

    </div >
  )
}

export default DailySummaryCard