import { useUserLogs } from "../contexts/UserLogContext"
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../constants/paths";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

const LogItem = () => {
  const nav = useNavigate();
  const { state, deleteLog } = useUserLogs();
  const { logs, loading, error } = state;
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (loading) return <div className="flex items-center justify-center">불러오는 중...</div>;
  if (error) return <div className="flex items-center justify-center">불러오기 실패 {error}</div>;
  if (logs.length === 0) return <div className="flex items-center justify-center">수영기록을 작성해주세요</div>;

  const handleDelete = async () => {
    if (selectedId) {
      await deleteLog(selectedId);
      setSelectedId(null);
    }
  };


  return (
    <>
      {logs.map((log) => (
        <div key={log.id} className='flex'>
          <div className='w-1/6'>{log.date}</div>
          <div className='w-1/6'>{log.pool}</div>
          <div className='w-1/6'>{log.distance}m</div>
          <div className='w-1/6'>{log.time}m</div>
          <div className='w-1/6'>{log.stroke}</div>
          <div className='flex items-center w-1/6'>
            <Edit
              className="h-4 text-blue-600 cursor-pointer"
              onClick={() => nav(`${PATHS.EDIT}/${log.id}`)}
            />
            <Trash2
              className="h-4 text-red-600 cursor-pointer"
              onClick={() => setSelectedId(log.id)}
            />
          </div>
        </div>
      ))}

      {selectedId && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setSelectedId(null)} />
      )}
    </>
  )
}

export default LogItem