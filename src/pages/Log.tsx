import { useEffect } from "react";
import Header from "../components/Header";
import LogList from "../components/LogList";
import { useUserLogs } from "../contexts/UserLogContext";

const Log = () => {
  const { loadLogs } = useUserLogs();

  // 로그 페이지에 들어올 때마다 최신 데이터로 다시 로딩
  useEffect(() => {
    void loadLogs();
  }, [loadLogs]);

  return (
    <div>
      <Header />
      <LogList />
    </div>
  );
};

export default Log;