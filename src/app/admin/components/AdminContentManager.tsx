"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  IoAdd,
  IoCheckmarkCircle,
  IoDocumentAttach,
  IoDocumentText,
  IoSave,
  IoTrash,
} from "react-icons/io5";

type PostItem = {
  file: string;
  slug: string;
  metadata: {
    title?: string;
    publishedAt?: string;
    summary?: string;
  };
};

type JsonEditorKey = "experience" | "projects";
type NoticeKind = "success" | "error";
type Notice = { kind: NoticeKind; text: string } | null;

const steps = [
  { key: "posts", label: "Posts", icon: IoDocumentText },
  { key: "experience", label: "Experience", icon: IoSave },
  { key: "projects", label: "Projects", icon: IoSave },
  { key: "cvs", label: "CVs", icon: IoDocumentAttach },
] as const;

const emptyPost = {
  slug: "",
  title: "",
  publishedAt: new Date().toISOString().slice(0, 10),
  summary: "",
  content: "# New Post",
};

const AdminContentManager = () => {
  const [activeStep, setActiveStep] = useState<(typeof steps)[number]["key"]>("posts");
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [newPost, setNewPost] = useState(emptyPost);
  const [jsonContent, setJsonContent] = useState<Record<JsonEditorKey, string>>({
    experience: "",
    projects: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  const sortedPosts = useMemo(
    () =>
      [...posts].sort((first, second) =>
        (second.metadata.publishedAt ?? "").localeCompare(first.metadata.publishedAt ?? ""),
      ),
    [posts],
  );

  const showNotice = (kind: NoticeKind, text: string) => {
    setNotice({ kind, text });
  };

  const requestJson = async <T,>(url: string, init?: RequestInit): Promise<T> => {
    const response = await fetch(url, init);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message ?? "Request failed.");
    }

    return data as T;
  };

  const loadContent = async () => {
    setLoading(true);

    try {
      const [postsResponse, experienceResponse, projectsResponse] = await Promise.all([
        requestJson<{ posts: PostItem[] }>("/api/admin/posts"),
        requestJson<{ content: string }>("/api/admin/json?file=experience"),
        requestJson<{ content: string }>("/api/admin/json?file=projects"),
      ]);

      setPosts(postsResponse.posts);
      setJsonContent({
        experience: experienceResponse.content,
        projects: projectsResponse.content,
      });
    } catch (error) {
      showNotice("error", error instanceof Error ? error.message : "Could not load admin content.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadContent();
  }, []);

  const addPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    try {
      await requestJson("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      setNewPost(emptyPost);
      await loadContent();
      showNotice("success", "Post added.");
    } catch (error) {
      showNotice("error", error instanceof Error ? error.message : "Could not add the post.");
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (file: string) => {
    const confirmed = window.confirm(`Delete ${file}?`);

    if (!confirmed) {
      return;
    }

    setSaving(true);

    try {
      await requestJson("/api/admin/posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file }),
      });
      setPosts((currentPosts) => currentPosts.filter((post) => post.file !== file));
      showNotice("success", "Post deleted.");
    } catch (error) {
      showNotice("error", error instanceof Error ? error.message : "Could not delete the post.");
    } finally {
      setSaving(false);
    }
  };

  const saveJson = async (file: JsonEditorKey) => {
    setSaving(true);

    try {
      await requestJson(`/api/admin/json?file=${file}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: jsonContent[file] }),
      });
      showNotice("success", `${file === "experience" ? "Experience" : "Projects"} JSON saved.`);
    } catch (error) {
      showNotice("error", error instanceof Error ? error.message : "Could not save JSON.");
    } finally {
      setSaving(false);
    }
  };

  const uploadCv = async (event: FormEvent<HTMLFormElement>, language: "english" | "spanish") => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem("file");

    if (!(input instanceof HTMLInputElement) || !input.files?.[0]) {
      showNotice("error", "Choose a PDF before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("language", language);
    formData.append("file", input.files[0]);
    setSaving(true);

    try {
      await requestJson("/api/admin/cv", {
        method: "POST",
        body: formData,
      });
      form.reset();
      showNotice("success", `${language === "english" ? "English" : "Spanish"} CV uploaded.`);
    } catch (error) {
      showNotice("error", error instanceof Error ? error.message : "Could not upload CV.");
    } finally {
      setSaving(false);
    }
  };

  const renderJsonEditor = (file: JsonEditorKey) => (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold capitalize text-theme-text">{file}</h2>
        <p className="mt-1 text-sm text-theme-muted">
          Edit <span className="font-mono">src/app/content/{file}.json</span> and save valid JSON.
        </p>
      </div>
      <textarea
        value={jsonContent[file]}
        onChange={(event) =>
          setJsonContent((currentContent) => ({
            ...currentContent,
            [file]: event.target.value,
          }))
        }
        className="min-h-[520px] w-full resize-y rounded border border-theme-border/40 bg-theme-surface p-4 font-mono text-sm text-theme-text outline-none transition focus:border-theme-secondary focus:ring-2 focus:ring-theme-secondary/20"
        spellCheck={false}
      />
      <button
        type="button"
        onClick={() => saveJson(file)}
        disabled={saving}
        className="inline-flex min-h-10 items-center gap-2 rounded bg-theme-secondary px-4 py-2 text-sm font-semibold text-theme-contrast transition hover:bg-theme-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        <IoSave aria-hidden />
        Save JSON
      </button>
    </section>
  );

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto border-b border-theme-border/30">
        <div className="flex min-w-max gap-2 pb-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === step.key;

            return (
              <button
                key={step.key}
                type="button"
                onClick={() => setActiveStep(step.key)}
                className={`flex min-h-12 min-w-36 items-center gap-3 rounded border px-4 py-2 text-left transition ${
                  isActive
                    ? "border-theme-secondary bg-theme-secondary text-theme-contrast"
                    : "border-theme-border/40 bg-theme-surface text-theme-muted hover:border-theme-secondary hover:text-theme-text"
                }`}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-theme-panel text-sm font-semibold text-theme-text">
                  {index + 1}
                </span>
                <Icon aria-hidden className="shrink-0" />
                <span className="text-sm font-semibold">{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {notice && (
        <div
          className={`flex items-center gap-2 rounded border px-4 py-3 text-sm ${
            notice.kind === "success"
              ? "border-theme-accent/50 bg-theme-accent/10 text-theme-accent"
              : "border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-200"
          }`}
        >
          <IoCheckmarkCircle aria-hidden />
          {notice.text}
        </div>
      )}

      {loading ? (
        <p className="text-theme-muted">Loading admin content...</p>
      ) : (
        <div className="rounded border border-theme-border/30 bg-theme-surface p-5 shadow-sm">
          {activeStep === "posts" && (
            <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(360px,440px)]">
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold text-theme-text">MDX posts</h2>
                  <p className="mt-1 text-sm text-theme-muted">
                    Files from <span className="font-mono">src/app/content/posts</span>.
                  </p>
                </div>
                <div className="divide-y divide-theme-border/20 rounded border border-theme-border/30">
                  {sortedPosts.map((post) => (
                    <div
                      key={post.file}
                      className="grid gap-3 p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
                    >
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-theme-text">
                          {post.metadata.title ?? post.slug}
                        </h3>
                        <p className="mt-1 text-sm text-theme-muted">
                          {post.file} · {post.metadata.publishedAt ?? "No date"}
                        </p>
                        {post.metadata.summary && (
                          <p className="mt-2 line-clamp-2 text-sm text-theme-muted">
                            {post.metadata.summary}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => deletePost(post.file)}
                        disabled={saving}
                        title={`Delete ${post.file}`}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded border border-red-500/40 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:text-red-200"
                      >
                        <IoTrash aria-hidden />
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={addPost} className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-theme-text">Add post</h2>
                  <p className="mt-1 text-sm text-theme-muted">
                    A new MDX file will be created with the same frontmatter format.
                  </p>
                </div>
                <label className="block text-sm font-semibold text-theme-text">
                  Slug
                  <input
                    value={newPost.slug}
                    onChange={(event) => setNewPost({ ...newPost, slug: event.target.value })}
                    placeholder="my-new-post"
                    className="mt-2 w-full rounded border border-theme-border/40 bg-theme-bg px-3 py-2 text-theme-text outline-none focus:border-theme-secondary focus:ring-2 focus:ring-theme-secondary/20"
                  />
                </label>
                <label className="block text-sm font-semibold text-theme-text">
                  Title
                  <input
                    value={newPost.title}
                    onChange={(event) => setNewPost({ ...newPost, title: event.target.value })}
                    className="mt-2 w-full rounded border border-theme-border/40 bg-theme-bg px-3 py-2 text-theme-text outline-none focus:border-theme-secondary focus:ring-2 focus:ring-theme-secondary/20"
                  />
                </label>
                <label className="block text-sm font-semibold text-theme-text">
                  Published date
                  <input
                    type="date"
                    value={newPost.publishedAt}
                    onChange={(event) =>
                      setNewPost({ ...newPost, publishedAt: event.target.value })
                    }
                    className="mt-2 w-full rounded border border-theme-border/40 bg-theme-bg px-3 py-2 text-theme-text outline-none focus:border-theme-secondary focus:ring-2 focus:ring-theme-secondary/20"
                  />
                </label>
                <label className="block text-sm font-semibold text-theme-text">
                  Summary
                  <textarea
                    value={newPost.summary}
                    onChange={(event) => setNewPost({ ...newPost, summary: event.target.value })}
                    className="mt-2 min-h-24 w-full resize-y rounded border border-theme-border/40 bg-theme-bg px-3 py-2 text-theme-text outline-none focus:border-theme-secondary focus:ring-2 focus:ring-theme-secondary/20"
                  />
                </label>
                <label className="block text-sm font-semibold text-theme-text">
                  MDX content
                  <textarea
                    value={newPost.content}
                    onChange={(event) => setNewPost({ ...newPost, content: event.target.value })}
                    className="mt-2 min-h-56 w-full resize-y rounded border border-theme-border/40 bg-theme-bg p-3 font-mono text-sm text-theme-text outline-none focus:border-theme-secondary focus:ring-2 focus:ring-theme-secondary/20"
                    spellCheck={false}
                  />
                </label>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex min-h-10 items-center gap-2 rounded bg-theme-secondary px-4 py-2 text-sm font-semibold text-theme-contrast transition hover:bg-theme-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <IoAdd aria-hidden />
                  Add MDX file
                </button>
              </form>
            </section>
          )}

          {activeStep === "experience" && renderJsonEditor("experience")}
          {activeStep === "projects" && renderJsonEditor("projects")}

          {activeStep === "cvs" && (
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-theme-text">CV PDFs</h2>
                <p className="mt-1 text-sm text-theme-muted">
                  Uploading replaces the public PDF for the selected language.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    language: "english" as const,
                    label: "English CV",
                    target: "public/CV-AntonioPantoja_ENG.pdf",
                  },
                  {
                    language: "spanish" as const,
                    label: "Spanish CV",
                    target: "public/CV-AntonioPantoja_ESP.pdf",
                  },
                ].map((cv) => (
                  <form
                    key={cv.language}
                    onSubmit={(event) => uploadCv(event, cv.language)}
                    className="space-y-4 rounded border border-theme-border/30 bg-theme-bg p-4"
                  >
                    <div>
                      <h3 className="font-semibold text-theme-text">{cv.label}</h3>
                      <p className="mt-1 text-sm text-theme-muted">{cv.target}</p>
                    </div>
                    <input
                      name="file"
                      type="file"
                      accept="application/pdf,.pdf"
                      aria-label={`${cv.label} PDF file`}
                      className="block w-full text-sm text-theme-muted file:mr-4 file:rounded file:border-0 file:bg-theme-panel file:px-4 file:py-2 file:text-sm file:font-semibold file:text-theme-text hover:file:bg-theme-border/20"
                    />
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex min-h-10 items-center gap-2 rounded bg-theme-secondary px-4 py-2 text-sm font-semibold text-theme-contrast transition hover:bg-theme-primary disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <IoDocumentAttach aria-hidden />
                      Upload {cv.label}
                    </button>
                  </form>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminContentManager;
