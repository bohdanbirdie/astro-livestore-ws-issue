import { Heart, HeartCrack } from "lucide-react";

import { likesCount$ } from "@/livestore/queries";
import { events } from "@/livestore/schema";
import { LikeButton } from "@/components/like-button";
import { LikesProvider, useLikesStore } from "./provider";

function LikesButton({ slug }: { slug: string }) {
  const store = useLikesStore({ slug });
  const likesData = store.useQuery(likesCount$);

  const count = likesData.count;

  const handleLike = () => {
    store.commit(events.likeAdded({}));
  };

  return <LikeButton count={count} onClick={handleLike} />;
}

function LikesShell({
  children,
  isError = false,
  isLoading = false,
}: {
  children: React.ReactNode;
  isError?: boolean;
  isLoading?: boolean;
}) {
  const content = isError ? (
    <div className="text-red-700">Error ocurred</div>
  ) : isLoading ? (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card-bg border border-border-primary opacity-50">
      ...
    </div>
  ) : (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card-bg border border-border-primary opacity-50">
      <Heart className="size-5 text-red-500" />
      <span className="text-sm font-medium text-primary-text">{children}</span>
    </div>
  );

  return content;
}

export function LikesCounter({
  slug,
  fallback,
}: {
  slug: string;
  fallback?: React.ReactNode;
}) {
  return (
    <LikesProvider
      renderLoading={() => <LikesShell isLoading>...</LikesShell>}
      renderError={() => fallback || <LikesShell isError>Like</LikesShell>}
    >
      <LikesButton slug={slug} />
    </LikesProvider>
  );
}
