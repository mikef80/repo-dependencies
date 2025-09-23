import Corners from "./components/Corners/Corners";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import RepoGallery from "./components/RepoGallery/RepoGallery";
import StatsCardsGallery from "./components/StatsCardGallery/StatsCardGallery";

function App() {
  return (
    <>
      <Header />
      <Main>
        <StatsCardsGallery />
        <RepoGallery />
      </Main>
      <Corners />
    </>
  );
}

export default App;
