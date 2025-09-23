export interface GitHubCredentials {
  username: string;
  token?: string;
}

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  languages: Record<string, number>;
  languages_url: string | null;
  stars: number;
  forks: number;
  lastUpdate: string; // ISO date string from API, format later in UI
  dependencyStatus: string; // custom, not from API
  vulnerabilities: number; // custom, not from API
  dependencies: number; // custom, not from API
  size: number; // number in KB from API, format to "51.0 KB"
  htmlUrl: string;
  topics: string[];
  dependencyDetails: any[]; // custom, define shape later if needed
  private: boolean;
};

export type Store = {
  repos: Repo[];
  setRepos: (newRepos: Repo[]) => void;
};
