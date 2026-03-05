/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

// userLog 테이블과 매핑되는 타입
export type UserLog = {
  id: number;
  user_id: string;
  date: string;
  pool: string;
  distance: number;
  time: number;
  stroke: string;
  memo: string;
};

// 새 로그를 만들 때는 보통 id는 DB가 만들고, user_id는 "현재 로그인 유저"로 자동 설정합니다.
// 그래서 addLog는 나머지 필드만 받도록 만드는 게 자연스럽습니다.
export type CreateUserLogInput = Omit<UserLog, "id" | "user_id">;

// Context에서 관리할 상태들
type UserLogState = {
  logs: UserLog[];
  loading: boolean;
  error: string | null;
};

// 상태를 바꾸기 위해 쓸 액션 타입들
// - type: 어떤 동작인지 설명
// - payload: 그 동작에 필요한 데이터
type UserLogAction =
  | { type: "LOAD_START" }                            // 목록 로딩 시작
  | { type: "LOAD_SUCCESS"; payload: UserLog[] }      // 목록 로딩 성공
  | { type: "LOAD_ERROR"; payload: string }           // 목록 로딩 실패
  | { type: "ADD_LOG"; payload: UserLog }             // 새 로그 추가
  | { type: "UPDATE_LOG"; payload: UserLog }          // 기존 로그 수정
  | { type: "DELETE_LOG"; payload: number };          // 로그 삭제 (id로 삭제)

// 초기 상태
const initialState: UserLogState = {
  logs: [],
  loading: false,
  error: null,
};

// useReducer에 사용할 reducer 함수
//    - 현재 state, action을 받아서 > 새로운 state 반환
function userLogReducer(state: UserLogState, action: UserLogAction): UserLogState {
  switch (action.type) {
    case "LOAD_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOAD_SUCCESS":
      return { ...state, loading: false, error: null, logs: action.payload };
    case "LOAD_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "ADD_LOG":
      return {
        ...state,
        logs: [action.payload, ...state.logs],
      };
    case "UPDATE_LOG":
      return {
        ...state,
        logs: state.logs.map((log) => (log.id === action.payload.id ? action.payload : log)),
      };
    case "DELETE_LOG":
      return {
        ...state,
        logs: state.logs.filter((log) => (log.id !== action.payload)),
      };
    default:
      return state;
  }
}

// Context에서 외부로 제공할 값 타입
//    - state 전체
//    - 자주 쓰는 액션들 함수로 감싼 것들
type UserLogContextValue = {
  state: UserLogState;
  loadLogs: () => Promise<UserLog[]>;
  addLog: (input: CreateUserLogInput) => Promise<UserLog>;
  updateLog: (id: number, patch: Partial<Omit<UserLog, "id" | "user_id">>) => Promise<UserLog>;
  deleteLog: (id: number) => Promise<void>;
};

const UserLogContext = createContext<UserLogContextValue | undefined>(undefined);

export const UserLogProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoggedIn } = useAuth();
  const [state, dispatch] = useReducer(userLogReducer, initialState);

  const loadLogs = useCallback(async () => {
    if (!user) return [];
    dispatch({ type: "LOAD_START" });

    const { data, error } = await supabase
      .from("userLog")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    if (error) {
      dispatch({ type: "LOAD_ERROR", payload: error.message });
      throw new Error(error.message);
    }

    const logs = (data ?? []) as UserLog[];
    dispatch({ type: "LOAD_SUCCESS", payload: logs });
    return logs;
  }, [user]);

  const addLog = useCallback(
    async (input: CreateUserLogInput) => {
      if (!user) throw new Error("로그인이 필요합니다.");

      const { data, error } = await supabase
        .from("userLog")
        .insert({
          user_id: user.id,
          ...input,
        })
        .select("*")
        .single();

      if (error) {
        dispatch({ type: "LOAD_ERROR", payload: error.message });
        throw new Error(error.message);
      }

      const created = data as UserLog;
      dispatch({ type: "ADD_LOG", payload: created });
      await supabase.auth.refreshSession();
      return created;
    },
    [user]
  );

  const updateLog = useCallback(async (id: number, patch: Partial<Omit<UserLog, "id" | "user_id">>) => {
    const { data, error } = await supabase
      .from("userLog")
      .update(patch)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      dispatch({ type: "LOAD_ERROR", payload: error.message });
      throw new Error(error.message);
    }

    const updated = data as UserLog;
    dispatch({ type: "UPDATE_LOG", payload: updated });
    await supabase.auth.refreshSession();
    return updated;
  }, []);

  const deleteLog = useCallback(async (id: number) => {
    const { error } = await supabase.from("userLog").delete().eq("id", id);

    if (error) {
      dispatch({ type: "LOAD_ERROR", payload: error.message });
      throw new Error(error.message);
    }

    dispatch({ type: "DELETE_LOG", payload: id });
    await supabase.auth.refreshSession();
  }, []);

  // 로그인/로그아웃에 따라 자동 로드 or 비우기
  useEffect(() => {
    if (!isLoggedIn || !user) {
      dispatch({ type: "LOAD_SUCCESS", payload: [] });
      return;
    }
    void loadLogs();
  }, [isLoggedIn, loadLogs, user]);

  const value = useMemo<UserLogContextValue>(
    () => ({ state, loadLogs, addLog, updateLog, deleteLog }),
    [addLog, deleteLog, loadLogs, state, updateLog]
  );

  return <UserLogContext.Provider value={value}>{children}</UserLogContext.Provider>;
};

export const useUserLogs = () => {
  const ctx = useContext(UserLogContext);
  if (!ctx) throw new Error("useUserLogs는 UserLogProvider 안에서만 사용할 수 있습니다.");
  return ctx;
};