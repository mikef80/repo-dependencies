import { FileText } from "lucide-react";
import styles from "./StatsCard.module.css";

const StatsCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.details}>
        <p className={styles.title}>Title</p>
        <p className={styles.count}>Count</p>
      </div>
      <FileText className={styles.filetext} />
    </div>
  );
};

export default StatsCard;
