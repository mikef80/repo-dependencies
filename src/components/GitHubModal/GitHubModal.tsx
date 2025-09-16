import { useState, type ChangeEvent, type Dispatch, type SetStateAction, type FormEvent } from "react";
import styles from "./GitHubModal.module.css";
import type { gitHubDetailsType } from "../../types/types";

interface GitHubModalProps {
  toggleGitHubModal: () => void;
  gitHub: {
    gitHubDetails: gitHubDetailsType;
    setGitHubDetails: Dispatch<SetStateAction<gitHubDetailsType>>;
  };
}

const GitHubModal = ({ toggleGitHubModal, gitHub }: GitHubModalProps) => {
  const { gitHubDetails, setGitHubDetails } = gitHub;

  // Local draft state
  const [draftDetails, setDraftDetails] = useState<gitHubDetailsType>(gitHubDetails);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setDraftDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setGitHubDetails(draftDetails); // commit changes
    toggleGitHubModal();
  };

  const handleCancel = () => {
    toggleGitHubModal(); // discard draftChanges automatically
  };

  return (
    <div className={styles.overlay} onClick={toggleGitHubModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>GitHub Settings</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.username}>
            <label htmlFor="username">GitHub Username:</label>
            <input
              type="text"
              id="username"
              value={draftDetails.username || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.token}>
            <label htmlFor="token">GitHub Token:</label>
            <input
              type="text"
              id="token"
              value={draftDetails.token || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.buttons}>
            <button type="submit" className={styles.submit}>
              Save
            </button>
            <button type="button" className={styles.cancel} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GitHubModal;
