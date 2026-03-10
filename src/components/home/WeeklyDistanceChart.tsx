import { ResponsiveContainer, Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"
import { useUserLogs } from "../../contexts/UserLogContext";
import { useMemo } from "react";
import { format, subDays, eachDayOfInterval } from "date-fns";

interface ChartData {
  name: string;
  fullDate: string;
  freestyle?: number;
  backstroke?: number;
  breaststroke?: number;
  butterfly?: number;
}

const WeeklyDistanceChart = () => {
  const { state } = useUserLogs();
  const { logs, loading, error } = state;

  const chartData = useMemo(() => {
    if (!logs || logs.length === 0) return [];

    // 최근 7일간의 날짜 배열 생성 (6일전 ~ 오늘)
    const last7Days = eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date(),
    });

    return last7Days.map((day) => {
      const dateStr = format(day, "yyyy-MM-dd"); // 비교용 (2026-03-02)
      const label = format(day, "MM/dd");       // 출력용 (03/02)

      // 해당 날짜의 로그들만 필터링
      const dayLogs = (logs).filter((log) => log.date === dateStr);

      // 영법별 거리 합산
      const result: ChartData = { name: label, fullDate: dateStr };

      dayLogs.forEach((log) => {
        const stroke = log.stroke;
        result[stroke as keyof Omit<ChartData, 'name' | 'fullDate'>] =
          (Number(result[stroke as keyof Omit<ChartData, 'name' | 'fullDate'>]) || 0) + log.distance;
      });

      return result;
    })
  }, [logs]);

  if (loading) return <div>불러오는 중...</div>;
  if (error) return <div>블러오기 실패</div>;
  if (logs.length === 0) return <div>수영기록을 작성해주세요</div>;

  return (
    <div className="w-1/3 min-w-[420px] h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit="m" />
          <Tooltip
            formatter={(value) => [`${value?.toLocaleString()}m`, '거리']}
            labelStyle={{ color: '#333' }} />
          <Legend />
          <Bar dataKey="freestyle" name="자유형" stackId="a" fill="#007FC5" />
          <Bar dataKey="backstroke" name="배영" stackId="a" fill="#059669" />
          <Bar dataKey="breaststroke" name="평영" stackId="a" fill="#D97706" />
          <Bar dataKey="butterfly" name="접영" stackId="a" fill="#DC2626" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WeeklyDistanceChart