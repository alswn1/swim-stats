/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from "react";
import type { Pool } from "../../types/pool";

interface CustomMarker extends kakao.maps.Marker {
  poolName?: string;
}

interface KakaoMapProps {
  pools: Pool[];
  selectedPool: Pool | null;
}

const KakaoMap = ({ pools, selectedPool }: KakaoMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);
  const markersRef = useRef<CustomMarker[]>([]);
  const infoWindowRef = useRef<kakao.maps.InfoWindow | null>(null); // 현재 열려있는 인포윈도우 관리

  // 인포윈도우를 띄우는 공통 함수
  const displayInfoWindow = useCallback((marker: kakao.maps.Marker | null, title: string) => {
    if (!infoWindowRef.current || !mapInstance.current) return;

    const content = `
      <div style="padding:5px; z-index:1; color: black; font-size: 12px; border-radius: 4px; min-width: 150px; text-align: center;">
        ${title}
      </div>
    `;
    infoWindowRef.current!.setContent(content);
    infoWindowRef.current!.open(mapInstance.current, marker!);
  }, []);


  // 1. 지도 초기화
  useEffect(() => {
    const { kakao } = window;
    const initMap = () => {
      if (!kakao || !kakao.maps) {
        setTimeout(initMap, 100);
        return;
      }

      kakao.maps.load(() => {
        if (!mapContainer.current || mapInstance.current) return;
        const options = {
          center: new kakao.maps.LatLng(37.5665, 126.978),
          level: 5,
        };
        mapInstance.current = new kakao.maps.Map(mapContainer.current, options);
        // 공용 인포윈도우 객체 생성
        infoWindowRef.current = new kakao.maps.InfoWindow({ zIndex: 1 });
      });
    };
    initMap();
  }, []);

  // 2. 검색 결과(pools) 마커 및 이벤트 등록
  useEffect(() => {
    const { kakao } = window;
    if (!mapInstance.current || !kakao || !kakao.maps.services) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    const geocoder = new kakao.maps.services.Geocoder();
    const bounds = new kakao.maps.LatLngBounds();

    pools.forEach((pool) => {
      geocoder.addressSearch(pool.ROAD_NM_ADDR || pool.LOTNO_ADDR, (result: any[], status: kakao.maps.services.Status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new kakao.maps.Marker({
            map: mapInstance.current!,
            position: coords,
          }) as CustomMarker;

          marker.poolName = pool.BPLC_NM;

          // 마커 클릭 시 인포윈도우 표시 이벤트
          kakao.maps.event.addListener(marker, 'click', () => {
            displayInfoWindow(marker, pool.BPLC_NM);
          });

          markersRef.current.push(marker);
          bounds.extend(coords);

          if (pools.length > 0) {
            mapInstance.current?.setBounds(bounds);
          }
        }
      });
    });
  }, [pools]);

  // 3. 리스트에서 선택 시 이동 및 인포윈도우 자동 열기
  useEffect(() => {
    const { kakao } = window;
    if (!mapInstance.current || !selectedPool || !kakao) return;

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(selectedPool.ROAD_NM_ADDR || selectedPool.LOTNO_ADDR, (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        const moveLatLon = new kakao.maps.LatLng(result[0].y, result[0].x);
        mapInstance.current?.setCenter(moveLatLon);
        mapInstance.current?.setLevel(5);

        // 해당 위치의 마커를 찾아 인포윈도우 표시
        const targetMarker = markersRef.current.find(
          (m) => m.poolName === selectedPool.BPLC_NM
        );

        if (targetMarker) {
          displayInfoWindow(targetMarker, selectedPool.BPLC_NM);
        }
      }
    });
  }, [selectedPool]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full min-h-[500px]"
    />
  );
};

export default KakaoMap;