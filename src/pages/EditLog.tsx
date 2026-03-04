import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Editor from "../components/Editor";
import Header from "../components/Header";
// import { PATHS } from "../constants/paths";

const EditLog = () => {
  const { id } = useParams<{ id: string }>();
  const logId = useMemo(() => Number(id), [id]);

  // if (!id || !Number.isFinite(logId)) {
  //   return <Navigate to={PATHS.LOG} replace />;
  // }

  return (
    <div>
      <Header />
      <Editor logId={logId} />
    </div>
  )
}

export default EditLog