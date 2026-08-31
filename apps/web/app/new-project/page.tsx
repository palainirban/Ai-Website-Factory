import { NewProjectForm } from "../../components/NewProjectForm";

export default function NewProjectPage() {
  return (
    <main>
      <header>
        <a href="/">← AI Website Factory</a>
        <h1>Start a new website project</h1>
        <p>Give the AI the essentials. Missing details can be handled later.</p>
      </header>
      <NewProjectForm />
      <style>{`
        main { max-width: 760px; margin: 0 auto; padding: 32px 24px 80px; }
        header a { font-weight: 700; }
        h1 { font-size: clamp(40px, 6vw, 68px); letter-spacing: -.05em; margin: 48px 0 10px; }
        header p { color: var(--muted); font-size: 18px; }
        form { display: grid; gap: 20px; margin-top: 40px; }
        label { display: grid; gap: 8px; font-weight: 700; }
        input, textarea, select { width: 100%; padding: 14px; border: 1px solid var(--line); border-radius: 8px; background: white; }
        textarea { min-height: 120px; resize: vertical; }
        button { margin-top: 12px; padding: 16px 20px; border: 0; border-radius: 10px; background: var(--ink); color: white; font-weight: 700; cursor: pointer; }
        button:disabled { opacity: .6; cursor: wait; }
        .error { color: #b42318; margin: 0; }
        .status { color: var(--accent); margin: 0; font-weight: 700; }
      `}</style>
    </main>
  );
}
