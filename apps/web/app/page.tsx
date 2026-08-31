const steps = [
  ["01", "Brief", "Tell us what the business does and what the website should achieve."],
  ["02", "Strategy", "Turn the brief into audience, conversion and sitemap decisions."],
  ["03", "Design", "Create a brand-specific design direction and design system."],
  ["04", "Build Pack", "Generate content, features, tasks and AI development instructions."]
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">AI-POWERED WEBSITE OPERATING SYSTEM</p>
        <h1>From one business brief to a complete website blueprint.</h1>
        <p className="intro">
          AI Website Factory organizes strategy, brand, design, content, features and development into one repeatable workflow.
        </p>
        <div className="actions">
          <a className="primary" href="/new-project">Create a Project</a>
          <a className="secondary" href="/projects">View Workspace</a>
        </div>
      </section>

      <section className="steps">
        {steps.map(([number, title, text]) => (
          <article className="step" key={number}>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <style>{`
        main { max-width: 1180px; margin: 0 auto; padding: 24px; }
        .hero { padding: 96px 0 72px; max-width: 850px; }
        .eyebrow { color: var(--accent); font-weight: 700; letter-spacing: .08em; font-size: 12px; }
        h1 { font-size: clamp(48px, 8vw, 96px); letter-spacing: -.06em; line-height: .95; margin: 18px 0; }
        .intro { color: var(--muted); font-size: 20px; line-height: 1.5; max-width: 720px; }
        .actions { display: flex; gap: 12px; margin-top: 32px; flex-wrap: wrap; }
        .primary, .secondary { padding: 14px 20px; border-radius: 10px; font-weight: 700; }
        .primary { background: var(--ink); color: white; }
        .secondary { border: 1px solid var(--line); background: var(--surface); }
        .steps { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--line); }
        .step { padding: 28px 24px 24px 0; border-right: 1px solid var(--line); min-height: 220px; }
        .step span { color: var(--accent); font-weight: 700; }
        .step h2 { font-size: 24px; margin: 30px 0 10px; }
        .step p { color: var(--muted); line-height: 1.5; }
        @media (max-width: 800px) { .hero { padding-top: 56px; } .steps { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 520px) { .steps { grid-template-columns: 1fr; } .step { border-bottom: 1px solid var(--line); } }
      `}</style>
    </main>
  );
}
