import axios from "axios";
import { useState } from "react";

export type HTTPmethods = "put" | "patch" | "post" | "get" | "Delete";

export function useFetchHook<T>(
  body?: any
): [
  T | T[] | undefined,
  boolean,
  (api: string) => Promise<void>,
  AbortController
] {
  const [data, setData] = useState<T | T[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const abortController = new AbortController();

  const fetchGetData = async (api: string) => {
    if (api.length) {
      setLoading(true);
      try {
        const response = await axios.get(api, {
          signal: abortController.signal,
        });
        const result: T | T[] = response.data;
        console.log(result);
        setData(result);
      } catch (error: any) {
        if (!abortController.signal.aborted) {
          setError(true);
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return [data, loading, fetchGetData, abortController];
}
