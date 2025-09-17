import Corners from "./components/Corners/Corners";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import StatsCardsGallery from "./components/StatsCardGallery/StatsCardGallery";

function App() {
  return (
    <>
      <Header />
      <Main>
        <StatsCardsGallery />
      </Main>
      <Corners />
    </>
  );
}

export default App;
