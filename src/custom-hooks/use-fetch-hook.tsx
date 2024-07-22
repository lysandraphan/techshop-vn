import axios from "axios";
import { useState } from "react";

export type HTTPmethods = "put" | "patch" | "post" | "get" | "Delete";

export function useFetchHook<T>(
  token?: any
): [
  T | undefined,
  (api: string) => Promise<void>,
  AbortController,
  boolean,
  boolean
] {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const abortController = new AbortController();

  const fetchGetData = async (api: string) => {
    if (api.length) {
      setLoading(true);
      try {
        let response;
        if (token) {
          response = await axios.get(api, {
            signal: abortController.signal,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          response = await axios.get(api, {
            signal: abortController.signal,
          });
        }
        const result: T = response.data;
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
  return [data, fetchGetData, abortController, loading, error];
}
