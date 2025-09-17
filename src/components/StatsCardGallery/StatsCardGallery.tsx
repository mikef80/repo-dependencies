import StatsCard from "../StatsCard/StatsCard";
import styles from "./StatsCardGallery.module.css";
import { FileText, AlertCircle, Zap, Activity } from "lucide-react";

const StatsCardGallery = () => {
  return (
    <div className={styles.statsCardGallery}>
      <StatsCard
        title='Total Repositories'
        count={0}
        iconClassName='totalRepositories'
        className='totalRepositories'
        icon={FileText}
      />
      <StatsCard
        title='Outdated Dependencies'
        count={0}
        iconClassName='outdatedDependencies'
        className='outdatedDependencies'
        icon={AlertCircle}
      />
      <StatsCard
        title='Security Issues'
        count={0}
        iconClassName='securityIssues'
        className='securityIssues'
        icon={Zap}
      />
      <StatsCard
        title='Total Dependencies'
        count={0}
        iconClassName='totalDependencies'
        className='totalDependencies'
        icon={Activity}
      />
    </div>
  );
};

export default StatsCardGallery;
