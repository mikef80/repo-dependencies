import { RefreshCw, Settings } from "lucide-react";
import styles from "./Header.module.css";
import GitHubModal from "../GitHubModal/GitHubModal";
import { useState } from "react";
import type { GitHubCredentials, Repo } from "../../types/types";

import { fetchLanguageDetails, fetchRepoData } from "../../utils/repoUtils";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Header = () => {
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const [gitHubDetails, setGitHubDetails] = useLocalStorage<GitHubCredentials>(
    "github-credentials",
    { username: "", token: "" }
  );
  const [repos, setRepos] = useState<Repo[]>([]);

  const toggleGitHubModal = () => {
    setShowGitHubModal((currentShowState) => !currentShowState);
  };

  const onRefreshClick = async () => {
    const fetchedRepos = await fetchRepoData(gitHubDetails);

    fetchedRepos.forEach(async (repo) => {
      const { data } = await fetchLanguageDetails(gitHubDetails, repo);
      repo.languages = data;
    });

    setRepos(fetchedRepos);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.column_left}>
          <h1 className={styles.h1}>Repository Dashboard</h1>
          <h2 className={styles.h2}>Monitor dependencies, security and project health</h2>
          {gitHubDetails.username && repos.length > 0 && (
            <p className={styles.p}>Connected to: @{gitHubDetails.username}</p>
          )}
        </div>
        <div className={styles.column_right}>
          <button className={styles.button_settings} onClick={toggleGitHubModal}>
            <Settings className={styles.settings} />
          </button>
          <button className={styles.button_refresh} onClick={onRefreshClick}>
            <RefreshCw className={styles.refresh} />
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
