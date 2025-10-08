import axios, { AxiosError } from "axios";
import { useCallback } from "react";
import type { GitHubCredentials, PackageJSON, Repo } from "../types/types";
import { decodeBase64, fetchLanguageDetails, transformRepo } from "../utils/repoUtils";
import useRepoStore from "../stores/repoStore";

export const useGitHub = (gitHubDetails: GitHubCredentials) => {
  const { repos, loading, error, setRepoStore, setLoading, setError } = useRepoStore();

  /* const fetchRepoData = useCallback(async () => {
    setError(null);

    let url = "";
    if (!gitHubDetails.token) {
      console.log("unauthenticated request");
      url = `https://api.github.com/users/${gitHubDetails.username}/repos`;
    } else {
      console.log("authenticated request");
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
          page:2,
          type: "owner",
        },
      });

      // check if repo has package.json
      const reactRepos: Repo[] = await Promise.all(
        data.map(async (repo: any) => {
          try {
            await axios.get(
              `https://api.github.com/repos/${repo.full_name}/contents/package.json`,
              {
                headers: {
                  Accept: "application/vnd.github.v3+json",
                  ...(gitHubDetails.token && {
                    Authorization: `Bearer ${gitHubDetails.token}`,
                  }),
                },
              }
            );

            return repo;
          } catch (error) {
            return null;
          }
        })
      );

      const filteredReactRepos = reactRepos.filter(Boolean);

      const structuredRepos: Repo[] = await Promise.all(
        filteredReactRepos.map(async (repo: any) => {
          const baseRepo = transformRepo(repo);

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
  }, [gitHubDetails.username, gitHubDetails.token]); */

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
      const reactRepos: Repo[] = (
        await Promise.all(
          allRepos.map(async (repo: any) => {
            try {
              const packageJSON = await axios.get(
                `https://api.github.com/repos/${repo.full_name}/contents/package.json`,
                { headers }
              );

              const decodedRaw = decodeBase64(packageJSON.data.content);
              if (!decodedRaw) return null;

              const decoded: PackageJSON = JSON.parse(decodedRaw);
              console.log(decoded, "<--decoded");

              if (decoded.dependencies?.react) {
                return repo;
              }
            } catch {
              return null;
            }
          })
        )
      ).filter(Boolean);

      // Fetch language details if token is available
      const structuredRepos: Repo[] = await Promise.all(
        reactRepos.map(async (repo: any) => {
          const baseRepo = transformRepo(repo);
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
