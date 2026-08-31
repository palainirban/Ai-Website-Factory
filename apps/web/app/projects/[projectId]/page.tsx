"use client";

import { useEffect, useState } from "react";
import { DocumentEditor } from "../../../components/DocumentEditor";

type Data = {
  project: { input: { businessName: string; primaryGoal: string } };
  documents: { id: string; title: string; content: string; status: string; version: number }[];
};

export default function ProjectDetailPage({ params }: { params: Promise<{ projectId: string }> }) {
  const [data, setData] = useState<Data | null>(null);
  const [projectId, setProjectId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    params.then(({ projectId: id }) => {
      setProjectId(id);
      fetch("/api/projects/" + id)
        .then(async response => {
          if (!response.ok) throw new Error("Project could not be loaded.");
          return response.json();
        })
        .then(setData)
        .catch(err => setError(err.message));
    });
  }, [params]);

  if (error) return <main><p>{error}</p><a href="/projects">Back to workspace</a></main>;
  if (!data) return <main><p>Loading project…</p></main>;

  return (
    <main>
      <a href="/projects">← Dashboard</a>
      <p className="eyebrow">PROJECT WORKSPACE</p>
      <h1>{data.project.input.businessName}</h1>
      <p className="muted">Primary goal: {data.project.input.primaryGoal}</p>
      <DocumentEditor projectId={projectId} initialDocuments={data.documents} />
      <style>{".eyebrow{margin-top:48px;color:var(--accent);font-weight:700;font-size:12px;letter-spacing:.08em}main{max-width:1180px;margin:0 auto;padding:32px 24px 80px}h1{font-size:clamp(42px,7vw,72px);letter-spacing:-.05em;margin:8px 0}.muted{color:var(--muted)}"}</style>
    </main>
  );
}
