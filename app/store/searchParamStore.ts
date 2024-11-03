import { proxy } from "valtio";

export const searchParamStore = proxy({
  q: "",
  n: 0,
});
