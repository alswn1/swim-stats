export interface Pool {
  BPLC_NM: string;      // 사업자명
  LOTNO_ADDR: string;   // 지번주소
  ROAD_NM_ADDR: string; // 도로명주소
  CRD_INFO_X: string;   // 좌표정보
  CRD_INFO_Y: string;   // 좌표정보
  TELNO: string;        // 전화번호
}

export interface PoolApiResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      dataType: string;
      items: {
        item: Pool[];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    }
  }
}