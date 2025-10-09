import { create } from "zustand";
import type { AxiosError } from "axios";

interface Store {
  currentDependencies: [];
  loading: boolean;
  error: AxiosError | string | null;
  setDependenciesStore: (dependencies: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: AxiosError | string | null) => void;
}

const useDependenciesStore = create<Store>((set) => ({
  currentDependencies: [],
  loading: false,
  error: null,
  setDependenciesStore: (dependencies) => set({ currentDependencies: dependencies }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export default useDependenciesStore;
