"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  createdAt: string;
  input: {
    businessName: string;
    businessType?: string;
    primaryGoal: string;
  };
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then(response => response.json())
      .then(data => setProjects(data.projects || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <header>
        <div>
          <p className="eyebrow">AI WEBSITE FACTORY</p>
          <h1>Your project dashboard</h1>
          <p>Every business brief becomes a structured strategy, design and development package.</p>
        </div>
        <a className="primary" href="/new-project">+ New Project</a>
      </header>

      <section className="stats">
        <article><strong>{projects.length}</strong><span>Total projects</span></article>
        <article><strong>{projects.length * 7}</strong><span>Generated documents</span></article>
        <article><strong>7</strong><span>Pipeline stages</span></article>
      </section>

      <section className="workspace">
        <div className="sectionHead">
          <h2>Projects</h2>
          <span>{loading ? "Loading..." : projects.length + " projects"}</span>
        </div>

        {!loading && projects.length === 0 && (
          <div className="empty">
            <h3>Create your first AI website project.</h3>
            <p>Start with a simple business brief. The system will organize the website workflow for you.</p>
            <a className="primary" href="/new-project">Create First Project</a>
          </div>
        )}

        <div className="projectGrid">
          {projects.map(project => (
            <a className="project" href={"/projects/" + project.id} key={project.id}>
              <span className="dot" />
              <div>
                <strong>{project.input.businessName}</strong>
                <p>{project.input.businessType || "Business"} · {project.input.primaryGoal}</p>
              </div>
              <span className="arrow">→</span>
            </a>
          ))}
        </div>
      </section>

      <section className="pipeline">
        <p className="eyebrow">AUTOMATION PIPELINE</p>
        <h2>Brief → Strategy → Brand → Design → Content → Features → Tasks</h2>
      </section>

      <style>{`
        main { max-width: 1180px; margin: 0 auto; padding: 40px 24px 80px; }
        header { display: flex; justify-content: space-between; gap: 32px; align-items: flex-start; }
        .eyebrow { color: var(--accent); font-size: 12px; font-weight: 800; letter-spacing: .09em; }
        h1 { font-size: clamp(44px, 7vw, 76px); letter-spacing: -.06em; margin: 10px 0; line-height: .95; }
        header p:not(.eyebrow) { max-width: 680px; color: var(--muted); font-size: 18px; line-height: 1.5; }
        .primary { display: inline-block; background: var(--ink); color: white; padding: 14px 18px; border-radius: 10px; font-weight: 700; white-space: nowrap; }
        .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 56px 0; }
        .stats article { background: white; border: 1px solid var(--line); border-radius: 14px; padding: 24px; }
        .stats strong { display: block; font-size: 42px; letter-spacing: -.05em; }
        .stats span, .sectionHead span { color: var(--muted); }
        .workspace { border-top: 1px solid var(--line); padding-top: 28px; }
        .sectionHead { display: flex; justify-content: space-between; align-items: baseline; }
        h2 { font-size: 30px; letter-spacing: -.03em; }
        .projectGrid { display: grid; gap: 10px; margin-top: 20px; }
        .project { display: flex; align-items: center; gap: 16px; background: white; border: 1px solid var(--line); border-radius: 12px; padding: 20px; transition: transform .15s ease; }
        .project:hover { transform: translateY(-2px); }
        .dot { width: 10px; height: 10px; border-radius: 50%; background: var(--accent); }
        .project strong { font-size: 18px; }
        .project p { color: var(--muted); margin: 5px 0 0; }
        .arrow { margin-left: auto; font-size: 24px; }
        .empty { background: white; border: 1px dashed var(--line); border-radius: 14px; padding: 48px; margin-top: 20px; }
        .empty p { color: var(--muted); max-width: 580px; line-height: 1.5; margin-bottom: 24px; }
        .pipeline { margin-top: 72px; padding: 32px 0; border-top: 1px solid var(--line); }
        .pipeline h2 { max-width: 900px; font-size: clamp(28px, 4vw, 50px); line-height: 1.05; }
        @media (max-width: 700px) { header { flex-direction: column; } .stats { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
