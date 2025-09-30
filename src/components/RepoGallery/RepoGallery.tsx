import useRepoStore from "../../stores/repoStore";
import RepoCard from "../RepoCard/RepoCard";
import styles from "./RepoGallery.module.css";

const RepoGallery = () => {
  const { repos, loading } = useRepoStore();
  console.log(loading, "<--loading");

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.repogallery}>
      {repos.map((repo, id) => (
        <RepoCard key={id} repo={repo} />
      ))}
    </div>
  );
};

export default RepoGallery;
