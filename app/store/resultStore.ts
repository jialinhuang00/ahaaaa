import { proxy } from "valtio";
import results from "@/app/store/mockResults";

export interface Result {
  id: number;
  title: string;
  url: string;
  username: string;
}

export const resultStore = proxy({
  results: results as Result[],
});
