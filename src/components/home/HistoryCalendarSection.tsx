import { useState } from "react";
import { useUserLogs } from "../../contexts/UserLogContext"
import { format, isAfter, isSameDay, parseISO } from "date-fns";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/paths";

const HistoryCalendarSection = () => {
  const defaultClassNames = getDefaultClassNames();
  const { state } = useUserLogs();
  const { logs, loading, error } = state;
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const nav = useNavigate();

  // 수영 기록 있는 날짜들만 추출
  const loggedDays = logs.map(log => parseISO(log.date));

  // 선택된 날짜의 기록들만 필터링
  const selectedLogs = logs.filter(log => selectedDay && isSameDay(parseISO(log.date), selectedDay));

  if (loading) return <div>불러오는 중...</div>;
  if (error) return <div>블러오기 실패</div>;

  return (
    <>
      <div className="noto-sans w-1/3 min-w-fit card-bg rounded-xl shadow flex flex-col items-center mb-24 p-8">
        {/* 달력 */}
        <div className="p-4">
          <DayPicker
            mode="single"
            required
            selected={selectedDay}
            onSelect={setSelectedDay}
            locale={ko}
            modifiers={{ hasLog: loggedDays }}
            modifiersStyles={{
              hasLog: { textDecoration: 'underline' }
            }}
            classNames={{
              ...defaultClassNames,

              month_caption: "flex justify-center items-center h-12 relative mb-4",
              caption_label: "text-xl font-black",

              nav: "flex items-center justify-between pointer-events-none px-1",
              button_previous: "pointer-events-auto z-10",
              button_next: "pointer-events-auto z-10",

              weekdays: "flex w-full justify-between mb-2",
              weekday: "text-slate-500 font-black w-14 h-12 flex items-center justify-center",

              month_grid: "w-full border-collapse",
              weeks: "flex flex-col gap-1",
              week: "flex w-full justify-between",

              day: "p-0 w-14 h-14 flex items-center justify-center",
              day_button: "w-full h-full font-bold flex items-center justify-center hover:bg-slate-100 rounded-md transition-colors",
              selected: "bg-blue-600 text-white rounded-md hover:bg-blue-700",
              today: "text-red-600 font-black",

              root: `${defaultClassNames.root} font-bold`,
            }}
          />
        </div>

        {/* 상세 기록 */}
        <div className="flex-1 sub-bg rounded-xl w-4/5 p-4">
          <h3 className="text-lg font-bold mb-4">
            {selectedDay ? format(selectedDay, "MM월 dd일") : "날짜를 선택하세요"}
          </h3>
          {selectedLogs.length > 0 ? (
            <ul className="space-y-2 font-medium">
              {selectedLogs.map(log => (
                <li key={log.id} className="cursor-pointer" onClick={() => nav(`${PATHS.EDIT}/${log.id}`)}>
                  {log.stroke === "freestyle" ? '자유형' : log.stroke === "backstroke" ? '배영' : log.stroke === "breaststroke" ? '평영' : '접영'} - {log.distance.toLocaleString()}m ({log.time}분)
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-between">
              <p className="text-gray-400">수영 기록이 없습니다.</p>
              {
                !isAfter(selectedDay as Date, new Date()) &&
                <Plus size={16} strokeWidth={5}
                  className="cursor-pointer"
                  onClick={() => nav(PATHS.NEW, { state: format(selectedDay as Date, 'yyyy-MM-dd') })} />
              }
            </div>
          )}
        </div>

      </div>
    </>
  )
}

export default HistoryCalendarSection