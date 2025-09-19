import type { Repo, GitHubCredentials } from "../types/types";
import axios from "axios";

export const transformRepo = (repo: any): Repo => ({
  dependencies: 0, // placeholder
  dependencyDetails: [],
  dependencyStatus: "current", // placeholder
  description: repo.description,
  forks: repo.forks_count,
  htmlUrl: repo.html_url,
  id: repo.id,
  languages: {} as Record<string, number>,
  languages_url: repo.languages_url,
  lastUpdate: repo.updated_at,
  name: repo.name,
  private: repo.private,
  size: repo.size,
  stars: repo.stargazers_count,
  topics: repo.topics ?? [],
  vulnerabilities: 0, // placeholder
});

export const fetchRepoData = async (gitHubDetails: GitHubCredentials) => {
  let url = "";
  if (!gitHubDetails.token) {
    url = `https://api.github.com/users/${gitHubDetails.username}/repos`;
  } else {
    url = `https://api.github.com/user/repos`;
  }

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

    return structuredRepos;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw new Error("Failed to fetch repositories");
  }
};

export const fetchLanguageDetails = async (gitHubDetails: GitHubCredentials, repo: Repo) => {
  const url = repo.languages_url;

  if (!url) {
    throw new Error("languages_url is null");
  }

  try {
    const data = await axios.get(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(gitHubDetails.token && { Authorization: `Bearer ${gitHubDetails.token}` }),
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw new Error("Failed to fetch languages");
  }
};
