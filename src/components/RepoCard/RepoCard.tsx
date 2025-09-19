import { AlertCircle } from "lucide-react";
import styles from "./RepoCard.module.css";
import type { Repo } from "../../types/types";

const RepoCard = ({ repo }: { repo: Repo }) => {
  console.log(repo.languages);

  const total = Object.values(repo.languages).reduce<number>((acc, val) => acc + val, 0);

  const colors: Record<string, string> = {
    CSS: "#264de4",
    HTML: "#e34c26",
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Default: "#999",
  };

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
        {Object.entries(repo.languages).map(([lang, value]) => {
          const width = (value / total) * 100;

          return (
            <div
              key={lang}
              style={{
                width: `${width}%`,
                backgroundColor: colors[lang] || colors.default,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "12px",
              }}
              title={`${lang}: ${value}`}>
              {width > 10 && lang}
            </div>
          );
        })}
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
      <hr />
      <div className={styles.updated_details}>
        <span>
          <span>Icon</span>
          <span>Size</span>
        </span>
        <span>123</span>
      </div>
    </li>
  );
};

export default RepoCard;
