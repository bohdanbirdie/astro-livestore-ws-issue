import { queryDb } from "@livestore/livestore";

import { tables } from "./schema";

const DEFAULT_VALUE: { readonly id: string; readonly count: number } = {
  id: "counter",
  count: 0,
};

export const likesCount$ = queryDb(
  tables.likes.where({ id: "counter" }).first({
    behaviour: "fallback",
    fallback: () => DEFAULT_VALUE,
  }),
  {
    label: "likesCount",
  },
);
