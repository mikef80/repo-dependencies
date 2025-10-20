import axios from "axios";
import { useCallback } from "react";
import useDependenciesStore from "../stores/dependencyVulnerabilitiesStore";

export const useNPM = (
  dependencies: Record<string, string> = {},
  devDependencies: Record<string, string> = {}
) => {
  const {
    currentDependencyVulnerabilities,
    loading,
    error,
    setDependencyVulnerabilitiesStore,
    setLoading,
    setError,
  } = useDependenciesStore();

  const fetchDependencyVulnerabilities = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const allDependencies = [
        ...new Set([...Object.keys(dependencies), ...Object.keys(devDependencies)]),
      ];

      const results = await Promise.all(
        allDependencies.map(async (dependency) => {
          try {
            //CHECK IF DEPENDENCY IS ALREADY IN STORE
            if (currentDependencyVulnerabilities[dependency]) {
              return currentDependencyVulnerabilities[dependency];
            }

            const { data } = await axios.get(`https://registry.npmjs.org/${dependency}`);
            return {
              [dependency]: {
                current: dependencies[dependency] || devDependencies[dependency],
                latest: data["dist-tags"]?.latest || null,
              },
            };
          } catch (err) {
            console.error(`Failed to fetch ${dependency}`, err);
            return null;
          }
        })
      );

      console.log(results);

      console.log("before set dependencies");

      const currentVulnerabilities = Object.assign({}, ...results);

      console.log(currentVulnerabilities, "<--results");

      /* setDependencyVulnerabilitiesStore(currentVulnerabilities);
      console.log(currentDependencyVulnerabilities, "<--currentDependencyVulnerabilities"); */
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dependencies, devDependencies]);

  return { currentDependencyVulnerabilities, loading, error, fetchDependencyVulnerabilities };
};
