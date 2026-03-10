import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import SearchBar from "../components/map/SearchBar";
import type { Pool } from "../types/pool";
import { fetchPools } from "../api/poolApi";
import KakaoMap from "../components/map/KakaoMap";

const Map = () => {
  const [pools, setPools] = useState<Pool[]>([]);
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (keyword: string = '') => {
    if (!keyword.trim()) {
      setPools([]);
      return;
    }

    setLoading(true);
    try {
      const data = await fetchPools(keyword);
      setPools(data);
    } catch (error) {
      console.error("검색 중 오류 발생: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPools([]);
  }, []);

  return (
    <div>
      <Header />
      <div className="flex w-full h-[calc(100vh-160px)] overflow-hidden">
        {/* 검색 사이드바 */}
        <div className="w-96 h-full ml-8 mr-8 bg-white p-4 shadow-xl rounded-xl z-10">
          <h2 className="h-8 text-xl font-bold mb-4">수영장 검색</h2>
          <SearchBar onSearch={handleSearch} />

          {loading ? (
            <p className="text-center text-gray-500">검색 결과 불러오는 중...</p>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-400">검색 결과 {pools.length}건</p>
              <div className="h-[calc(100vh-360px)] flex flex-col gap-3 overflow-auto">
                {pools.map((pool, index) => {
                  const isSelected = selectedPool?.BPLC_NM === pool.BPLC_NM &&
                    selectedPool.ROAD_NM_ADDR === pool.ROAD_NM_ADDR;
                  return (
                    <div
                      key={`${pool.BPLC_NM}- ${index}`}
                      onClick={() => setSelectedPool(pool)}
                      className={`p-3 border rounded cursor-pointer
                      ${isSelected ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                          : 'border-gray-100 hover:bg-slate-50'}`}>
                      <h4 className={`font-bold ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>{pool.BPLC_NM}</h4>
                      <p className="text-xs text-gray-600">{pool.ROAD_NM_ADDR || pool.LOTNO_ADDR}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* 지도 영역 */}
        <div className="w-full min-w-[1000px] h-[calc(100vh-160px)] pr-8">
          <KakaoMap pools={pools} selectedPool={selectedPool} />
        </div>
      </div>
    </div >
  )
}

export default Map;