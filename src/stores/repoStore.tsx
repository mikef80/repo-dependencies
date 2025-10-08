import { create } from "zustand";
import type { Repo } from "../types/types";
import type { AxiosError } from "axios";

interface Store {
  repos: Repo[];
  loading: boolean;
  error: AxiosError | string | null;
  setRepoStore: (repos: Repo[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: AxiosError | string | null) => void;
}

const useRepoStore = create<Store>((set) => ({
  repos: [],
  loading: false,
  error: null,
  setRepoStore: (repos) => set({ repos }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export default useRepoStore;
