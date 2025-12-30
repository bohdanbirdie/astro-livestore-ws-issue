import { makeWorker } from "@livestore/adapter-web/worker";
import { makeWsSync } from "@livestore/sync-cf/client";

import { schema } from "./schema";

makeWorker({
  schema,
  sync: {
    backend: makeWsSync({
      url: `http://localhost:8788/sync`,
    }),
    initialSyncOptions: { _tag: "Blocking", timeout: 5000 },
  },
});
