import styles from "./StatsCard.module.css";

const StatsCard = ({
  title,
  count,
  className,
  icon: Icon,
  iconClassName,
}: {
  title: string;
  count: number;
  className: keyof typeof styles;
  icon: React.ElementType;
  iconClassName: keyof typeof styles;
}) => {
  return (
    <div className={`${styles.statscard} ${styles[className]}`}>
      <div className={styles.details}>
        <p className={styles.title}>{title}</p>
        <p className={styles.count}>{count}</p>
      </div>
      <Icon className={styles[iconClassName]} />
    </div>
  );
};

export default StatsCard;
