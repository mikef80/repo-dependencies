import useRepoStore from "../../stores/repoStore";
import RepoCard from "../RepoCard/RepoCard";
import styles from "./RepoGallery.module.css";

const RepoGallery = () => {
  const { repos, loading, error } = useRepoStore();

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (repos.length) {
    return (
      <div className={styles.repogallery}>
        {repos.map((repo, id) => (
          <RepoCard key={id} repo={repo} />
        ))}
      </div>
    );
  }

  return <div className={styles.error}>Error: {typeof error === "string" ? error : error?.message}</div>;
};

export default RepoGallery;
