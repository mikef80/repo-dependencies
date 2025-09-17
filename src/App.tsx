import Corners from "./components/Corners/Corners";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import StatsCards from "./components/StatsCard/StatsCard";

function App() {
  return (
    <>
      <Header />
      <Main>
        <StatsCards />
      </Main>
      <Corners />
    </>
  );
}

export default App;
