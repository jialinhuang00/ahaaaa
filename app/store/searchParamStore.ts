import { proxy } from "valtio";

const getSearchParams = () => {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
};

const searchParams = getSearchParams();

export const searchParamStore = proxy({
  q: searchParams.get("q") || "",
  n: (searchParams.get("n") || 20) as number,
});
