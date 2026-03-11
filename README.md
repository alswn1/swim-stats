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

<table>
  <tr>
    <th align="center" colspan="3">회원가입 입력/완료</th>
    <th align="center" colspan="2">로그인</th>
  </tr>
  <tr>
    <td align="center" valign="top">
      <img width="1275" height="897" alt="스크린샷 2026-03-11 172359" src="https://github.com/user-attachments/assets/9768831d-6e62-45d4-8103-3831e5098914" />
    </td>
    <td align="center" valign="top">
      <img width="1274" height="926" alt="스크린샷 2026-03-11 172535" src="https://github.com/user-attachments/assets/8740a77c-a3c8-412f-8cc5-0ec32b36bc21" />
    </td>
    <td align="center" valign="top">
      <img width="1274" height="949" alt="스크린샷 2026-03-11 172618" src="https://github.com/user-attachments/assets/d768f158-150f-410f-8cfc-e60461aa32bc" />
    </td>
    <td align="center" valign="top">
      <img width="1276" height="881" alt="스크린샷 2026-03-11 172105" src="https://github.com/user-attachments/assets/d9a65b85-33de-4ed4-ac3a-96f289793089" />
    </td>
    <td align="center" valign="top">
      <img width="1275" height="909" alt="스크린샷 2026-03-11 172305" src="https://github.com/user-attachments/assets/0c1de6da-1145-46a0-9022-0fced25390a3" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th align="center">홈</th>
    <th align="center">데일리, 주간 기록</th>
    <th align="center" colspan="2">달력</th>
  </tr>
  <tr>
    <td align="center" valign="top">
      <img width="1273" height="1060" alt="스크린샷 2026-03-11 172828" src="https://github.com/user-attachments/assets/af7b47c7-a512-4cd6-b0d9-f9c3a3b3a185" />
    </td>
    <td align="center" valign="top">
      <img width="1258" height="723" alt="스크린샷 2026-03-11 173329" src="https://github.com/user-attachments/assets/24e600f7-65ca-412c-b0a9-0d9b2b4402c0" />
    </td>
    <td align="center" valign="top">
      <img width="1260" height="725" alt="스크린샷 2026-03-11 173151" src="https://github.com/user-attachments/assets/cbb3cd6b-1941-46db-abfb-0abdcd691e83" />
    </td>
    <td align="center" valign="top">
      <img width="1262" height="716" alt="스크린샷 2026-03-11 173129" src="https://github.com/user-attachments/assets/9d0fc0f3-cf3c-44b1-83e2-92fd3ddee192" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th align="center">기록</th>
    <th align="center" colspan="4">기록 생성 / 수정 / 삭제</th>
  </tr>
  <tr>
    <td align="center" valign="top">
      <img width="100%" alt="기록 목록" src="https://github.com/user-attachments/assets/9e22345e-3dde-4bea-bd3f-4be9ca3ede7d" />
    </td>
    <td align="center" valign="top">
      <img width="100%" alt="기록 생성" src="https://github.com/user-attachments/assets/98647e7f-9c07-4e70-9c1d-dadccc1955e1" />
    </td>
    <td align="center" valign="top">
      <img width="100%" alt="기록 수정 단계1" src="https://github.com/user-attachments/assets/d743b8fe-b54a-43eb-b2f1-4c5f0a1bb20d" />
    </td>
    <td align="center" valign="top">
      <img width="100%" alt="기록 수정 완료" src="https://github.com/user-attachments/assets/d44b6867-3dce-417e-93ac-8ebd7ffa84bd" />
    </td>
    <td align="center" valign="top">
      <img width="100%" alt="기록 삭제" src="https://github.com/user-attachments/assets/139f4bbf-0a73-4a5c-856b-baa3e6b2da5b" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th align="center">지도</th>
    <th align="center" colspan="2">검색/목록 클릭</th>
  </tr>
  <tr>
    <td align="center" valign="top">
      <img width="1559" height="1266" alt="image" src="https://github.com/user-attachments/assets/8d5004f8-b6d9-4594-950c-0b8b91febd07" />
    </td>
    <td align="center" valign="top">
      <img width="1559" height="1266" alt="image" src="https://github.com/user-attachments/assets/9c83e001-e349-4843-9fee-f3176275f727" />
    </td>
    <td align="center" valign="top">
      <img width="1562" height="1263" alt="image" src="https://github.com/user-attachments/assets/46dfd42f-76f1-40bd-af86-21a466df1fbb" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th align="center" colspan="2">마이페이지</th>
    <th align="center">개인별 맞춤 메시지</th>
  </tr>
  <tr>
    <td align="center" valign="top">
      <img width="1563" height="566" alt="image" src="https://github.com/user-attachments/assets/243a10e8-4c5c-4d6a-bad7-558bd64bfc53" />
    </td>
    <td align="center" valign="top">
      <img width="1561" height="517" alt="image" src="https://github.com/user-attachments/assets/d3428521-445a-4b61-910a-a605700b67c2" />
    </td>
    <td align="center" valign="top">
      <img width="274" height="58" alt="image" src="https://github.com/user-attachments/assets/d3f111c9-1034-4e34-8fa6-8cb019c6f4af" />
      <img width="317" height="61" alt="image" src="https://github.com/user-attachments/assets/461ab878-4748-46eb-9a21-05d966490db0" />
      <img width="287" height="55" alt="image" src="https://github.com/user-attachments/assets/44b279a5-88d4-46e2-bdec-53c8b4ef25e3" />
      <img width="301" height="62" alt="image" src="https://github.com/user-attachments/assets/743dad37-9898-4032-bc9b-7636bb00782c" />
      <img width="303" height="64" alt="image" src="https://github.com/user-attachments/assets/ca322af1-9d1c-4627-9ab1-56a4ca87f42b" />
      <img width="328" height="61" alt="image" src="https://github.com/user-attachments/assets/fa1eea8c-bf55-4495-b435-9cb0f142f87f" />
    </td>
  </tr>
</table>

---

## 📎 Link

### https://swim-stats.vercel.app/
