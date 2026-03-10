import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Ruler, Timer, Activity } from "lucide-react";
import { PATHS } from "../../constants/paths";
import { useUserLogs } from "../../contexts/UserLogContext";
import Button from "../common/Button";
import ToastMsg from "../common/ToastMsg";
import { useLocation } from "react-router-dom";
import type { Pool } from "../../types/pool";
import { fetchPools } from "../../api/poolApi";

type StrokeOption = { value: string; label: string };

type EditorProps = {
  logId?: number;
};

const Editor = ({ logId }: EditorProps) => {
  const nav = useNavigate();
  const { state, loadLogs, addLog, updateLog } = useUserLogs();
  const isEdit = typeof logId === "number" && Number.isFinite(logId);

  // 홈화면의 calendar에서 날짜 클릭해서 들어오는 경우
  // state 변수에 날짜 담아서 옴
  const location = useLocation();
  const selectedDay = location.state as string;

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const [date, setDate] = useState(selectedDay || today);
  const [pool, setPool] = useState("");
  const [distance, setDistance] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [stroke, setStroke] = useState("");
  const [memo, setMemo] = useState("");

  // 수영장 자동완성
  const [allPools, setAllPools] = useState<Pool[]>([]);           //전체 수영장 데이터
  const [filteredPools, setFilteredPools] = useState<Pool[]>([]); // 검색 결과 리스트
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    setTimeout(() => setShowToast(false), 1000);
  };

  // 초기 전국 수영장 데이터 로드
  useEffect(() => {
    const loadPoolData = async () => {
      const data = await fetchPools();
      setAllPools(data);
    };
    loadPoolData();
  }, []);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 수영장 입력창 변경 핸들러
  const handlePoolChange = (value: string) => {
    setPool(value);

    if (value.trim().length > 0) {
      const filtered = allPools.filter(p => p.BPLC_NM.includes(value));

      setFilteredPools(filtered);
      setIsDropdownOpen(true);
    } else {
      setFilteredPools([]);
      setIsDropdownOpen(false);
    }
  };

  const handleSelectPool = (poolName: string) => {
    setPool(poolName);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (!isEdit) {
      setDate(selectedDay || today);
      setPool("");
      setDistance(0);
      setTime(0);
      setStroke("");
      setMemo("");
      return;
    }

    const existing = state.logs.find((l) => l.id === logId);
    if (!existing) {
      void loadLogs().catch(() => {
        // loadLogs 내부에서 error state 처리됨
      });
      return;
    }

    setDate(existing.date);
    setPool(existing.pool);
    setDistance(existing.distance);
    setTime(existing.time);
    setStroke(existing.stroke);
    setMemo(existing.memo ?? "");
  }, [isEdit, loadLogs, logId, state.logs, today]);

  const handleSubmit = async (e: FormEvent) => {
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
      if (isEdit) {
        await updateLog(logId, {
          date,
          pool: pool.trim(),
          distance,
          time,
          stroke,
          memo: memo.trim(),
        });
        triggerToast("수영 기록이 수정되었습니다.", "success");
      } else {
        await addLog({
          date,
          pool: pool.trim(),
          distance,
          time,
          stroke,
          memo: memo.trim(),
        });
        triggerToast("새 수영 기록이 저장되었습니다.", "success");
      }
      setTimeout(() => nav(PATHS.LOG), 1000);
    } catch (err) {
      console.log(err instanceof Error ? err.message : "원인불명");
      triggerToast(isEdit ? "수정에 실패했습니다." : "저장에 실패했습니다.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="do-hyeon w-1/2 min-w-96 card-bg rounded-xl p-5 flex flex-col gap-6 items-center">
        <div className="black-han text-xl">{isEdit ? "수영 기록 수정하기" : "새 수영 기록 쓰기"}</div>

        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <div>날짜</div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="date"
                required
                className="w-full pl-10 py-3 pr-3 bg-white border border-slate-200 rounded-xl outline-none transition-all"
                max={new Date().toISOString().split('T')[0]}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>수영장</div>
            <div className="relative" ref={dropdownRef}>
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                required
                className="w-full pl-10 py-3 pr-3 bg-white border border-slate-200 rounded-xl outline-none transition-all"
                placeholder="예) 올림픽 수영장"
                value={pool}
                onChange={(e) => handlePoolChange(e.target.value)}
                onFocus={() => pool.length > 0 && setIsDropdownOpen(true)}
              />
              {/* 수영장 자동완성 드롭다운 */}
              {isDropdownOpen && filteredPools.length > 0 && (
                <div className="noto-sans absolute top-full left-0 w-full h-60 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-auto">
                  {filteredPools.map((p, idx) => (
                    <div
                      key={`${p.BPLC_NM}-${idx}`}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b last:border-none border-slate-50 transition-colors"
                      onClick={() => handleSelectPool(p.BPLC_NM)}
                    >
                      <div className="font-bold text-slate-800 text-sm">{p.BPLC_NM}</div>
                      <div className="text-xs text-slate-400 truncate">
                        {p.ROAD_NM_ADDR || p.LOTNO_ADDR}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div>거리 (m)</div>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="number"
                  min={1}
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
              onClick={() => nav(-1)}
            />
            <Button
              text={loading ? (isEdit ? "수정 중..." : "저장 중...") : isEdit ? "수정하기" : "저장하기"}
              font="do-hyeon"
              type="CONFIRM"
              loading={loading}
            />
          </div>
        </form>
      </div>

      {showToast && <ToastMsg errorMessage={toastMsg} type={toastType} />}
    </div>
  );
};

export default Editor;