import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const username = user?.user_metadata?.name;

  return (
    <div>
      <Header />
      {username}
    </div>
  )
}

export default Home;