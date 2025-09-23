import { AlertCircle, Calendar } from "lucide-react";
import styles from "./RepoCard.module.css";
import type { Repo } from "../../types/types";
import LanguagesList from "../LanguagesList/LanguagesList";
import LanguagesBar from "../LanguagesBar/LanguagesBar";
import { formatDistanceToNowStrict } from "date-fns";

const RepoCard = ({ repo }: { repo: Repo }) => {
  return (
    <li className={styles.repocard}>
      <div className={styles.header_description_container}>
        <div className={styles.header_description}>
          <h2 className={styles.header}>{repo.name}</h2>
          <p className={styles.description}>{repo.description || "No description provided"}</p>
        </div>
        <AlertCircle className={styles.svg} />
      </div>
      <div className={styles.languages}>
        <div className={styles.languages_list}>
          <LanguagesList languages={repo.languages} />
        </div>
        <div className={styles.languages_bar}>
          <LanguagesBar languages={repo.languages} />
        </div>
      </div>
      <div className={styles.dependencies}>
        <span className={styles.dependencies_title}>Dependencies</span>
        <span className={styles.dependencies_count}>123</span>
      </div>
      <div className={styles.vulnerabilities}>
        <span className={styles.vulnerabilities_title}>Vulnerabilities</span>
        <span className={styles.vulnerabilities_count}>123</span>
      </div>
      <div className={styles.size}>
        <span className={styles.size_title}>Size</span>
        <span className={styles.size_count}>123</span>
      </div>
      <hr className={styles.hr} />
      <div className={styles.updated_details}>
        <div className={styles.updated}>
          <Calendar className={styles.svg} />
          <div>{formatDistanceToNowStrict(new Date(repo.lastUpdate), { addSuffix: true })}</div>
        </div>

        <span>View Details &rarr;</span>
      </div>
    </li>
  );
};

export default RepoCard;
