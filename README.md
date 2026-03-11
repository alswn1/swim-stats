# 🏊‍♂️ Swim-Stats: Swimmer's Dashboard

**Swim-Stats**는 수영 기록을 체계적으로 관리하고, 주변 수영장 위치를 한눈에 파악할 수 있는 개인 맞춤형 대시보드 웹 서비스입니다. 

---

## 🚀 프로젝트 개요
수영은 기록의 스포츠입니다. 하지만 여러 수영장을 이용하거나 매일의 영법별 거리를 관리하기는 번거롭습니다.<br/>
**Swim-Stats**는 사용자가 본인의 수영 데이터를 시각적으로 확인할 수 있도록 돕습니다.

## 🛠 Tech Stack

### Frontend
- **Framework:** React (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Library:**
  - `Recharts` (데이터 시각화)
  - `Lucide-react` (아이콘)
  - `date-fns` (날짜 연산)

### Backend & Infrastructure
- **BaaS:** Supabase (Auth, Database)
- **Maps:** Kakao Maps API
- **Pools data:** 공공데이터포털

---

## ✨ Key Features

### 1. 개인 수영 기록 대시보드 (Data Visualization)
- `Recharts`를 활용하여 최근 7일간의 기록을 **Stacked Bar Chart**로 시각화합니다.
- 자유형, 배영, 평영, 접영 등 영법별 거리를 누적하여 표시하며, 데이터 양에 따라 Y축 범위를 자동으로 조절하여 가독성을 높였습니다.

### 2. 수영장 탐색 (Map Service)
- **공공데이터포털 수영장 api**를 연동하여 영업중인 수영장 정보를 불러옵니다.
- **Kakao Map API**를 연동하여 수영장명 또는 지역을 검색하고 지도 위에 마커로 표시합니다.
- 사용자가 방문할 수영장의 위치 정보를 직관적으로 파악할 수 있습니다.

### 3. 수영 로그 관리 (CRUD)
- 영법, 거리(m), 시간 등을 상세히 기록하고 관리합니다.
- **Supabase**와 실시간 연동되어 데이터가 안전하게 저장되며, 사용자별 맞춤형 통계를 제공합니다.

### 4. 사용자 인증 (Authentication)
- **Supabase Auth**를 통해 이메일 기반 회원가입 및 로그인 기능을 제공합니다.
- 개인별 독립된 데이터 공간을 확보하여 보안성을 강화했습니다.

---

## 📋 화면 구성 (Screenshots)
| 홈 | 기록 보유 | 기록 미보유 | 달력 |
| :---: | :---: | :---: | :---: |
|  |  |  |  |

| 기록 | 기록 생성 | 기록 수정 | 기록 삭제 |
| :---: | :---: | :---: | :---: |
|  |  |  |  |

| 지도 | 검색어 입력 | 마커 클릭 |
| :---: | :---: | :---: |
|  |  |  |

| 마이페이지 | | | |
| :---: | :---: | :---: | :---: |
|  |  |  |  |

---

## 📎 Link

### https://swim-stats.vercel.app/
