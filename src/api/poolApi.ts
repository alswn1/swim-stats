import axios from "axios";
import type { Pool, PoolApiResponse } from "../types/pool";

const POOL_KEY = import.meta.env.VITE_POOL_KEY;
const BASE_URL = 'https://apis.data.go.kr/1741000/swimming_pools/info';

export const fetchPools = async (keyword: string = ''): Promise<Pool[]> => {
  let allItems: Pool[] = [];
  let pageNo = 1;
  const numOfRows = 1000; // 한 번에 가져올 양 최대로 설정
  let hasMore = true;

  try {
    while (hasMore) {
      const params = new URLSearchParams();
      params.append("serviceKey", decodeURIComponent(POOL_KEY));
      params.append("pageNo", pageNo.toString());
      params.append("numOfRows", numOfRows.toString());
      params.append("returnType", "json");
      params.append("cond[SALS_STTS_CD::EQ]", "01");

      const response = await axios.get<PoolApiResponse>(`${BASE_URL}?${params.toString()}`);

      const body = response.data.response?.body;
      const items = body?.items?.item || [];
      const totalCount = body?.totalCount || 0;

      // 1. 현재까지 가져온 데이터 합치기
      allItems = [...allItems, ...items];

      // 2. 더 가져올 데이터가 있는지 판단
      // 현재 페이지 번호 * 페이지당 개수가 전체 개수보다 작으면 다음 페이지 호출
      if (pageNo <= totalCount / 100) {
        pageNo++;
      } else {
        hasMore = false;
      }
    }

    // 아무것도 입력하지 않으면 전체 반환
    if (!keyword.trim()) {
      return allItems;
    }

    // 사업자명 또는 지역에 키워드 포함 필터링
    return allItems.filter((pool) => {
      const nameMatch = pool.BPLC_NM?.includes(keyword);
      const addrMatch = pool.LOTNO_ADDR?.includes(keyword) || pool.ROAD_NM_ADDR?.includes(keyword);
      return nameMatch || addrMatch;
    });

  } catch (error) {
    console.error('전체 수영장 데이터 수집 실패:', error);
    return allItems; // 에러 발생 시 그때까지 모은 데이터라도 반환
  }
};