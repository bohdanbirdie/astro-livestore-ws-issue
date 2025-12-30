/// <reference types="@cloudflare/workers-types" />
import "@livestore/adapter-cloudflare/polyfill";

import type { CfTypes } from "@livestore/sync-cf/cf-worker";
import * as SyncBackend from "@livestore/sync-cf/cf-worker";

export class SyncBackendDO extends SyncBackend.makeDurableObject({
  onPush: async (message, { storeId }) => {
    console.log(`onPush for store (${storeId})`, message.batch);
  },
}) {}

export default {
  async fetch(
    request: CfTypes.Request,
    _env: SyncBackend.Env,
    ctx: CfTypes.ExecutionContext,
  ) {
    const searchParams = SyncBackend.matchSyncRequest(request);
    if (searchParams !== undefined) {
      return SyncBackend.handleSyncRequest({
        request,
        searchParams,
        ctx,
        syncBackendBinding: "SYNC_BACKEND_DO",
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};
