import { Suspense, useState } from "react";
import { makePersistedAdapter } from "@livestore/adapter-web";
import {
  StoreRegistry,
  StoreRegistryProvider,
  useStore,
} from "@livestore/react";
import { ErrorBoundary } from "react-error-boundary";
import { unstable_batchedUpdates as batchUpdates } from "react-dom";

import { schema } from "@/livestore/schema";

import LiveStoreWorker from "@/livestore/livestore.worker?worker";
import LiveStoreSharedWorker from "@livestore/adapter-web/shared-worker?sharedworker";

const adapter = makePersistedAdapter({
  storage: { type: "opfs" },
  worker: LiveStoreWorker,
  sharedWorker: LiveStoreSharedWorker,
});

type Props = {
  renderLoading: () => React.ReactNode;
  renderError: () => React.ReactNode;
  children: React.ReactNode;
};

export const useLikesStore = ({ slug }: { slug: string }) => {
  const store = useStore({
    storeId: slug,
    schema,
    adapter,
    batchUpdates,
  });

  return store;
};

export function LikesProvider({ children, renderError, renderLoading }: Props) {
  const [storeRegistry] = useState(() => new StoreRegistry());

  return (
    <ErrorBoundary fallback={renderError()}>
      <Suspense fallback={renderLoading()}>
        <StoreRegistryProvider storeRegistry={storeRegistry}>
          {children}
        </StoreRegistryProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
