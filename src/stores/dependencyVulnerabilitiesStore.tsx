import { create } from "zustand";
import type { AxiosError } from "axios";

interface Store {
  currentDependencyVulnerabilities: {};
  loading: boolean;
  error: AxiosError | string | null;
  setDependencyVulnerabilitiesStore: (dependencyVulnerabilities: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: AxiosError | string | null) => void;
}

const usecDependencyVulnerabilitiesStore = create<Store>((set) => ({
  currentDependencyVulnerabilities: {},
  loading: false,
  error: null,
  setDependencyVulnerabilitiesStore: (dependencyVulnerabilities) => set({ currentDependencyVulnerabilities: dependencyVulnerabilities }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export default usecDependencyVulnerabilitiesStore;
