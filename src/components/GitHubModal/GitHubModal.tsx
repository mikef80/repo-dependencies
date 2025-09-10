import styles from "./GitHubModal.module.css";

interface GitHubModalProps {
  onToggle: () => void;
}

const GitHubModal = ({ onToggle }: GitHubModalProps) => {
  return (
    <div className={styles.overlay} onClick={onToggle}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>GitHub Settings</h3>
        <div className={styles.username}>
          <label htmlFor='username'>GitHub Username:</label>
          <input type='text' name='username' id='username' />
        </div>
      </div>
    </div>
  );
};

export default GitHubModal;
