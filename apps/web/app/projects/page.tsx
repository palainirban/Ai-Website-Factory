const documents = ["PROJECT.md", "WEBSITE-BLUEPRINT.md", "BRAND.md", "DESIGN.md", "CONTENT.md", "FEATURES.md", "TASKS.md"];

export default function ProjectsPage() {
  return (
    <main>
      <a href="/">← AI Website Factory</a>
      <h1>Project Workspace</h1>
      <p className="muted">This is the MVP workspace shell. Persistence and AI generation will be connected next.</p>
      <section>
        <div className="project">
          <div><strong>Demo Project</strong><p>Strategy ready · Design pending</p></div>
          <a href="/new-project">Open</a>
        </div>
      </section>
      <h2>Generation pipeline</h2>
      <div className="grid">
        {documents.map((doc, index) => <article key={doc}><span>0{index + 1}</span><h3>{doc}</h3><p>Ready for generation and review.</p></article>)}
      </div>
      <style>{`
        main { max-width: 1100px; margin: 0 auto; padding: 32px 24px 80px; }
        h1 { font-size: 56px; letter-spacing: -.05em; margin-bottom: 8px; }
        .muted, p { color: var(--muted); }
        section { margin: 36px 0 56px; }
        .project { display: flex; justify-content: space-between; align-items: center; background: white; border: 1px solid var(--line); padding: 20px; border-radius: 12px; }
        .project p { margin-bottom: 0; }
        .project a { font-weight: 700; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        article { background: white; border: 1px solid var(--line); border-radius: 12px; padding: 20px; }
        article span { color: var(--accent); font-weight: 700; }
        h3 { margin-bottom: 8px; }
        @media (max-width: 700px) { .grid { grid-template-columns: 1fr; } h1 { font-size: 42px; } }
      `}</style>
    </main>
  );
}
