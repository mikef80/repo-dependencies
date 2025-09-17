import { RefreshCw, Settings } from "lucide-react";
import styles from "./Header.module.css";
import GitHubModal from "../GitHubModal/GitHubModal";
import { useEffect, useState } from "react";
import type { GitHubCredentials } from "../../types/types";

import { fetchLanguageDetails, fetchRepoData } from "../../utils/repoUtils";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import useRepos from "../../stores/repoStore";

const Header = () => {
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gitHubDetails, setGitHubDetails] = useLocalStorage<GitHubCredentials>(
    "github-credentials",
    { username: "", token: "" }
  );

  const { setRepos } = useRepos();

  const toggleGitHubModal = () => {
    setShowGitHubModal((currentShowState) => !currentShowState);
  };

  const onFetchClick = async () => {
    if (!gitHubDetails.username || !gitHubDetails.token) return;

    setLoading(true);
    try {
      const fetchedRepos = await fetchRepoData(gitHubDetails);

      const reposWithLanguages = await Promise.all(
        fetchedRepos.map(async (repo) => {
          const { data } = await fetchLanguageDetails(gitHubDetails, repo);
          return { ...repo, languages: data };
        })
      );

      setRepos(reposWithLanguages);
    } catch (error) {
      console.error("Error fetching repos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onFetchClick();
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.column_left}>
          <h1 className={styles.h1}>Repository Dashboard</h1>
          <h2 className={styles.h2}>Monitor dependencies, security and project health</h2>
          <p className={styles.p}>
            {gitHubDetails.username
              ? `Connected to: @${gitHubDetails.username}`
              : "Not connected"}
          </p>
        </div>
        <div className={styles.column_right}>
          <button className={styles.button_settings} onClick={toggleGitHubModal}>
            <Settings className={styles.settings} />
          </button>
          <button
            className={`${styles.button_refresh} ${loading ? styles.loading : ""}`}
            onClick={onFetchClick}
            disabled={loading}>
            <RefreshCw className={`${styles.refresh} ${loading ? styles.loading : ""}`} />
            Refresh
          </button>
        </div>
      </header>

      {showGitHubModal && (
        <GitHubModal
          toggleGitHubModal={toggleGitHubModal}
          gitHub={{ gitHubDetails, setGitHubDetails }}
        />
      )}
    </>
  );
};

export default Header;
