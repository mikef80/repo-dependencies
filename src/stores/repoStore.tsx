import { create } from "zustand";
import type { Repo } from "../types/types";

interface Store {
  repos: Repo[];
  loading: boolean;
  error: string | null;
  setRepoStore: (repos: Repo[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
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
