import { RefreshCw, Settings } from "lucide-react";
import styles from "./Header.module.css";
import GitHubModal from "../GitHubModal/GitHubModal";
import { useState } from "react";

const Header = () => {
  const [showGitHubModal, setShowGitHubModal] = useState(false);

  const toggleGitHubModal = () => {
    setShowGitHubModal((currentShowState) => !currentShowState);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.column_left}>
          <h1 className={styles.h1}>Repository Dashboard</h1>
          <h2 className={styles.h2}>Monitor dependencies, security and project health</h2>
          <p className={styles.p}>Connect to: &lt;insert dynamic name here&gt;</p>
        </div>
        <div className={styles.column_right}>
          <button className={styles.button_settings} onClick={toggleGitHubModal}>
            <Settings className={styles.settings} />
          </button>
          <button className={styles.button_refresh}>
            <RefreshCw className={styles.refresh} />
            Loading
          </button>
        </div>
      </header>

      {showGitHubModal && <GitHubModal onToggle={toggleGitHubModal} />}
    </>
  );
};

export default Header;
