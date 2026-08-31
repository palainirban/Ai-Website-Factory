"use client";

import { useState } from "react";

type Document = {
  id: string;
  title: string;
  content: string;
  status: string;
  version: number;
};

export function DocumentEditor({
  projectId,
  initialDocuments
}: {
  projectId: string;
  initialDocuments: Document[];
}) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [activeId, setActiveId] = useState(initialDocuments[0]?.id || "");
  const [saving, setSaving] = useState(false);
  const active = documents.find(item => item.id === activeId);

  function replace(updated: Document) {
    setDocuments(items => items.map(item => item.id === updated.id ? updated : item));
  }

  async function save(status?: string) {
    if (!active) return;
    setSaving(true);
    const response = await fetch("/api/projects/" + projectId + "/documents/" + active.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: active.content, ...(status ? { status } : {}) })
    });
    const data = await response.json();
    if (response.ok) replace(data.document);
    setSaving(false);
  }

  async function regenerate() {
    if (!active || !confirm("Regenerate this document? Your current unsaved changes will be replaced.")) return;
    setSaving(true);
    const response = await fetch("/api/projects/" + projectId + "/documents/" + active.id + "/regenerate", { method: "POST" });
    const data = await response.json();
    if (response.ok) replace(data.document);
    else alert(data.error || "Regeneration failed.");
    setSaving(false);
  }

  if (!active) return null;

  return (
    <section className="editor">
      <aside>
        {documents.map(document => (
          <button className={document.id === active.id ? "active" : ""} onClick={() => setActiveId(document.id)} key={document.id}>
            <strong>{document.title}</strong>
            <small>{document.status} · v{document.version}</small>
          </button>
        ))}
      </aside>

      <div className="canvas">
        <div className="toolbar">
          <div><strong>{active.title}</strong><small>{active.status} · version {active.version}</small></div>
          <div className="actions">
            <button onClick={() => save()} disabled={saving}>Save</button>
            <button onClick={regenerate} disabled={saving}>Regenerate</button>
            <button className="approve" onClick={() => save("approved")} disabled={saving}>Approve</button>
          </div>
        </div>
        <textarea
          value={active.content}
          onChange={event => replace({ ...active, content: event.target.value, status: active.status === "approved" ? "draft" : active.status })}
        />
      </div>

      <style>{`
        .editor{display:grid;grid-template-columns:260px 1fr;gap:16px;margin-top:40px}.editor aside{display:grid;align-content:start;gap:8px}.editor aside button{border:1px solid var(--line);background:white;border-radius:10px;padding:14px;text-align:left;cursor:pointer}.editor aside button.active{border-color:var(--accent);box-shadow:0 0 0 2px rgba(109,93,252,.12)}.editor aside strong,.toolbar strong{display:block}.editor small{display:block;color:var(--muted);margin-top:5px}.canvas{background:white;border:1px solid var(--line);border-radius:14px;overflow:hidden}.toolbar{padding:16px;display:flex;justify-content:space-between;gap:16px;border-bottom:1px solid var(--line)}.actions{display:flex;gap:8px;flex-wrap:wrap}.actions button{padding:9px 12px;border:1px solid var(--line);background:white;border-radius:8px;font-weight:700;cursor:pointer}.actions .approve{background:var(--ink);color:white;border-color:var(--ink)}textarea{width:100%;min-height:650px;border:0;padding:24px;resize:vertical;font:15px/1.65 ui-monospace,SFMono-Regular,Menlo,monospace;outline:0}@media(max-width:800px){.editor{grid-template-columns:1fr}.editor aside{grid-template-columns:repeat(2,1fr)}.toolbar{flex-direction:column}}@media(max-width:520px){.editor aside{grid-template-columns:1fr}}
      `}</style>
    </section>
  );
}
