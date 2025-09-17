import { create } from "zustand";
import { type Store } from "../types/types";

const useRepos = create<Store>((set) => ({
  repos: [],
  setRepos: (newRepos) => set({ repos: newRepos }),
}));

export default useRepos;
