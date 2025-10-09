import axios, { AxiosError } from "axios";
import { useCallback } from "react";
import type { GitHubCredentials, Repo } from "../types/types";
import { decodeBase64, fetchLanguageDetails, transformRepo } from "../utils/repoUtils";
import useRepoStore from "../stores/repoStore";

export const useGitHub = (gitHubDetails: GitHubCredentials) => {
  const { repos, loading, error, setRepoStore, setLoading, setError } = useRepoStore();

  const fetchRepoData = useCallback(async () => {
    setError(null);
    setLoading(true);
    console.time("Repo load time");

    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      ...(gitHubDetails.token && { Authorization: `Bearer ${gitHubDetails.token}` }),
    };

    let url = gitHubDetails.token
      ? "https://api.github.com/user/repos"
      : `https://api.github.com/users/${gitHubDetails.username}/repos`;

    const perPage = 100;
    let page = 1;
    let allRepos: any[] = [];

    try {
      // Pagination loop
      while (true) {
        const { data } = await axios.get(url, {
          headers,
          params: {
            sort: "updated",
            per_page: perPage,
            page,
            type: "owner",
          },
        });

        if (data.length === 0) break; // no more pages
        allRepos = allRepos.concat(data);
        page++;

        if (data.length < perPage) break; // last page reached
      }

      // Filter repos that have package.json
      const reposWithPackageJSON: Repo[] = (
        await Promise.all(
          allRepos.map(async (repo: any) => {
            try {
              const packageJSON = await axios.get(
                `https://api.github.com/repos/${repo.full_name}/contents/package.json`,
                { headers }
              );

              const decodedContent = decodeBase64(packageJSON.data.content);

              if (!decodedContent) return repo;

              const decodedPackageJSON = JSON.parse(decodedContent);

              console.log(decodedPackageJSON);
              

              const { dependencies, devDependencies } = decodedPackageJSON;
              const updatedRepo = { ...repo, dependencies, devDependencies };

              return updatedRepo;
            } catch {
              return null;
            }
          })
        )
      ).filter(Boolean);

      // Fetch language details if token is available
      const structuredRepos: Repo[] = await Promise.all(
        reposWithPackageJSON.map(async (repo: any) => {
          const baseRepo = transformRepo(repo);
          console.log(baseRepo,'<--baseRepo');
          
          let languages;
          if (gitHubDetails.token) {
            const { data } = await fetchLanguageDetails(gitHubDetails, baseRepo);
            languages = data;
          }
          return { ...baseRepo, languages };
        })
      );

      setRepoStore(structuredRepos);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      setError(error instanceof AxiosError ? error : "Failed to fetch repos");
    } finally {
      setLoading(false);
      console.timeEnd("Repo load time");
    }
  }, [gitHubDetails.username, gitHubDetails.token]);

  return { repos, loading, error, fetchRepoData };
};
