import axios from "axios";
import { useCallback } from "react";
import type { GitHubCredentials, Repo } from "../types/types";
import { transformRepo } from "../utils/repoUtils";
import useRepoStore from "../stores/repoStore";

export const useGitHub = (gitHubDetails: GitHubCredentials) => {
  const { repos, loading, error, setRepoStore, setLoading, setError } = useRepoStore();

  const fetchRepoData = useCallback(async () => {
    console.time("Repo load time");
    setError(null);

    let url = "";
    if (!gitHubDetails.token) {
      url = `https://api.github.com/users/${gitHubDetails.username}/repos`;
    } else {
      url = `https://api.github.com/user/repos`;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(url, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(gitHubDetails.token && { Authorization: `Bearer ${gitHubDetails.token}` }),
        },
        params: {
          sort: "updated",
          per_page: 100,
          type: "owner",
        },
      });

      const structuredRepos: Repo[] = data.map((repo: any) => transformRepo(repo));

      setRepoStore(structuredRepos);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch repos");
    } finally {
      setLoading(false);
      console.timeEnd("Repo load time");
    }
  }, [gitHubDetails.username, gitHubDetails.token]);

  return { repos, loading, error, fetchRepoData };
};
