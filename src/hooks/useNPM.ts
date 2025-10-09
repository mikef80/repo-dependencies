import axios from "axios";
import { useCallback } from "react";
import useDependenciesStore from "../stores/dependencyStore";

export const useNPM = (
  dependencies: Record<string, string> = {},
  devDependencies: Record<string, string> = {}
) => {
  const { currentDependencies, loading, error, setDependenciesStore, setLoading, setError } =
    useDependenciesStore();

  const fetchDependencies = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const allDependencies = [
        ...new Set([...Object.keys(dependencies), ...Object.keys(devDependencies)]),
      ];

      const results = await Promise.all(
        allDependencies.map(async (dependency) => {
          try {
            const { data } = await axios.get(`https://registry.npmjs.org/${dependency}`);
            return {
              name: dependency,
              current: dependencies[dependency] || devDependencies[dependency],
              latest: data["dist-tags"]?.latest || null,
            };
          } catch (err) {
            console.error(`Failed to fetch ${dependency}`, err);
            return null;
          }
        })
      );

      console.log("before set dependencies");

      setDependenciesStore(results.filter(Boolean));
      console.log(currentDependencies, "<--currentDependencies");
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dependencies, devDependencies, setDependenciesStore, setError, setLoading]);

  return { currentDependencies, loading, error, fetchDependencies };
};
