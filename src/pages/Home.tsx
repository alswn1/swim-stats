import Header from "../components/common/Header";
import DailySummaryCard from "../components/home/DailySummaryCard";
import HistoryCalendarSection from "../components/home/HistoryCalendarSection";
import WeeklyDistanceChart from "../components/home/WeeklyDistanceChart";

const Home = () => {
  return (
    <div className="black-han">
      <Header />
      <div className="flex flex-col gap-8 items-center">
        <DailySummaryCard />
        <WeeklyDistanceChart />
        <HistoryCalendarSection />
      </div>
    </div>
  )
}

export default Home;