import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Ruler, Timer, Activity } from "lucide-react";
import { PATHS } from "../constants/paths";
import { useUserLogs } from "../contexts/UserLogContext";
import Button from "./Button";
import ToastMsg from "./ToastMsg";

type StrokeOption = { value: string; label: string };

const Editor = () => {
  const nav = useNavigate();
  const { addLog } = useUserLogs();

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const [date, setDate] = useState(today);
  const [pool, setPool] = useState("");
  const [distance, setDistance] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [stroke, setStroke] = useState("");
  const [memo, setMemo] = useState("");

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"error" | "success">("error");
  const [toastMsg, setToastMsg] = useState("");

  const strokeOptions: StrokeOption[] = [
    { value: "freestyle", label: "자유형" },
    { value: "backstroke", label: "배영" },
    { value: "breaststroke", label: "평영" },
    { value: "butterfly", label: "접영" },
  ];

  const triggerToast = (msg: string, type: "error" | "success") => {
    setToastMsg(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !pool.trim() || !stroke) {
      triggerToast("필수 항목을 모두 입력해주세요.", "error");
      return;
    }
    if (distance <= 0 || time <= 0) {
      triggerToast("거리와 시간은 0보다 커야 해요.", "error");
      return;
    }

    setLoading(true);
    try {
      await addLog({
        date,
        pool: pool.trim(),
        distance,
        time,
        stroke,
        memo: memo.trim(),
      });

      triggerToast("새 수영 기록이 저장되었습니다.", "success");
      setTimeout(() => nav(PATHS.LOG), 1200);
    } catch (err) {
      console.log(err instanceof Error ? err.message : "원인불명");
      triggerToast("저장에 실패했습니다.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="do-hyeon w-1/2 min-w-96 card-bg rounded-xl p-5 flex flex-col gap-6 items-center">
        <div className="black-han text-xl">새 수영 기록 쓰기</div>

        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <div>날짜</div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="date"
                required
                className="w-full pl-10 py-3 pr-3 bg-white border border-slate-200 rounded-xl outline-none transition-all"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>수영장</div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                required
                className="w-full pl-10 py-3 pr-3 bg-white border border-slate-200 rounded-xl outline-none transition-all"
                placeholder="예) 올림픽 수영장"
                value={pool}
                onChange={(e) => setPool(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div>거리 (m)</div>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="number"
                  min={0}
                  step={25}
                  required
                  className="w-full pl-10 py-3 pr-3 bg-white border border-slate-200 rounded-xl outline-none transition-all"
                  value={Number.isFinite(distance) ? distance : 0}
                  onChange={(e) => setDistance(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div>시간 (분)</div>
              <div className="relative">
                <Timer className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="number"
                  min={1}
                  required
                  className="w-full pl-10 py-3 pr-3 bg-white border border-slate-200 rounded-xl outline-none transition-all"
                  value={Number.isFinite(time) ? time : 0}
                  onChange={(e) => setTime(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>영법</div>
            <div className="relative">
              <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <select
                required
                className="w-full pl-10 py-3 pr-3 bg-white border border-slate-200 rounded-xl outline-none transition-all"
                value={stroke}
                onChange={(e) => setStroke(e.target.value)}
              >
                <option value="" disabled>
                  영법 선택
                </option>
                {strokeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>메모</div>
            <textarea
              className="w-full px-3 py-3 bg-white border border-slate-200 rounded-xl outline-none transition-all min-h-28"
              placeholder="오늘의 컨디션, 페이스 등 자유롭게 적어주세요"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>

          <div className="flex flex-row gap-5 text-lg justify-center pt-2">
            <Button
              text="취소하기"
              font="do-hyeon"
              type="CANCEL"
              loading={loading}
              onClick={() => nav(PATHS.LOG)}
            />
            <Button text={loading ? "저장 중..." : "저장하기"} font="do-hyeon" type="CONFIRM" loading={loading} />
          </div>
        </form>
      </div>

      {showToast && <ToastMsg errorMessage={toastMsg} type={toastType} />}
    </div>
  );
};

export default Editor;