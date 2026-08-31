"use client";

import { useEffect, useState } from "react";

type Data = {
  project: { input: { businessName: string; primaryGoal: string } };
  documents: { id: string; title: string; content: string; status: string }[];
};

export default function ProjectDetailPage({ params }: { params: Promise<{ projectId: string }> }) {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    params.then(({ projectId }) => {
      fetch("/api/projects/" + projectId)
        .then(async (response) => {
          if (!response.ok) throw new Error("Project could not be loaded.");
          return response.json();
        })
        .then(setData)
        .catch((err) => setError(err.message));
    });
  }, [params]);

  if (error) return <main><p>{error}</p><a href="/projects">Back to workspace</a></main>;
  if (!data) return <main><p>Loading project…</p></main>;

  return (
    <main>
      <a href="/projects">← Workspace</a>
      <p className="eyebrow">PROJECT</p>
      <h1>{data.project.input.businessName}</h1>
      <p className="muted">Primary goal: {data.project.input.primaryGoal}</p>
      <section className="documents">
        {data.documents.map((document) => (
          <details key={document.id}>
            <summary><span>{document.title}</span><small>{document.status}</small></summary>
            <pre>{document.content}</pre>
          </details>
        ))}
      </section>
      <style>{".eyebrow{margin-top:48px;color:var(--accent);font-weight:700;font-size:12px;letter-spacing:.08em}main{max-width:1000px;margin:0 auto;padding:32px 24px 80px}h1{font-size:clamp(42px,7vw,72px);letter-spacing:-.05em;margin:8px 0}.muted{color:var(--muted)}.documents{display:grid;gap:12px;margin-top:48px}details{background:white;border:1px solid var(--line);border-radius:12px;overflow:hidden}summary{cursor:pointer;display:flex;justify-content:space-between;padding:18px;font-weight:700}summary small{color:var(--accent)}pre{margin:0;padding:20px;white-space:pre-wrap;overflow-wrap:anywhere;border-top:1px solid var(--line);font-family:inherit;line-height:1.55;color:var(--muted)}"}</style>
    </main>
  );
}
