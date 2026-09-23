import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { NamePrompt } from "@/components/NamePrompt";
import { FIELDS } from "@/data/careers";
import { useAppStore } from "@/store/useAppStore";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Student community — share career ideas | CareerScope" },
      {
        name: "description",
        content:
          "Join topic rooms and talk with other students thinking about the same career pathway as you.",
      },
      { property: "og:title", content: "Student community — CareerScope" },
      { property: "og:description", content: "Swap ideas with students considering the same path." },
    ],
  }),
  component: CommunityPage,
});

function timeAgo(ts: number) {
  const mins = Math.round((Date.now() - ts) / 60000);
  if (mins < 60) return `${Math.max(mins, 1)}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function CommunityPage() {
  const posts = useAppStore((s) => s.posts);
  const addPost = useAppStore((s) => s.addPost);
  const addReply = useAppStore((s) => s.addReply);
  const likePost = useAppStore((s) => s.likePost);
  const displayName = useAppStore((s) => s.displayName);

  const [room, setRoom] = useState<string>("All rooms");
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const visible = room === "All rooms" ? posts : posts.filter((p) => p.room === room);
  const author = displayName || "Anonymous student";

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <PageHeader
        eyebrow="Community"
        title="You're not the only one deciding"
        description="Pick a room for the pathway you're curious about, share what you're thinking, and reply to other students."
      />

      <NamePrompt purpose="so others know who they're talking to" />

      <div className="flex flex-wrap gap-2">
        {["All rooms", ...FIELDS].map((f) => (
          <button
            key={f}
            onClick={() => setRoom(f)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              room === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/40"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.trim()) return;
          addPost(room === "All rooms" ? "Technology" : room, author, draft.trim());
          setDraft("");
        }}
        className="surface space-y-3 p-5"
      >
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          placeholder={`Share an idea or question with the ${room === "All rooms" ? "community" : room} room...`}
          className="w-full resize-none rounded-xl border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Be kind, keep it about careers, and never share your address, school or phone number.
          </p>
          <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Post
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {visible.map((post) => (
          <article key={post.id} className="surface p-5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="pill">{post.room}</span>
              <span className="font-semibold text-foreground">{post.author}</span>
              <span>· {timeAgo(post.createdAt)}</span>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm text-foreground">{post.body}</p>

            <div className="mt-4 flex gap-4 text-sm">
              <button
                onClick={() => likePost(post.id)}
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary"
              >
                <Heart className="size-4" /> {post.likes}
              </button>
              <button
                onClick={() => setReplyTo(replyTo === post.id ? null : post.id)}
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary"
              >
                <MessageCircle className="size-4" /> {post.replies.length} replies
              </button>
            </div>

            {post.replies.length > 0 && (
              <div className="mt-4 space-y-3 border-l-2 border-border pl-4">
                {post.replies.map((r) => (
                  <div key={r.id}>
                    <p className="text-xs font-semibold text-foreground">
                      {r.author} <span className="font-normal text-muted-foreground">· {timeAgo(r.createdAt)}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{r.body}</p>
                  </div>
                ))}
              </div>
            )}

            {replyTo === post.id && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!replyText.trim()) return;
                  addReply(post.id, author, replyText.trim());
                  setReplyText("");
                  setReplyTo(null);
                }}
                className="mt-4 flex gap-2"
              >
                <input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 rounded-xl border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                  Reply
                </button>
              </form>
            )}
          </article>
        ))}

        {visible.length === 0 && (
          <p className="surface p-8 text-center text-muted-foreground">
            No posts in this room yet — be the first to start the conversation.
          </p>
        )}
      </div>
    </div>
  );
}
