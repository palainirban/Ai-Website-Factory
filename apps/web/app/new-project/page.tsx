export default function NewProjectPage() {
  return (
    <main>
      <header>
        <a href="/">← AI Website Factory</a>
        <h1>Start a new website project</h1>
        <p>Give the AI the essentials. Missing details can be handled later.</p>
      </header>

      <form>
        <label>Business name<input placeholder="e.g. Deep Enterprise" /></label>
        <label>What does the business do?<textarea placeholder="Describe products, services and business model." /></label>
        <label>Location / market<input placeholder="e.g. Kolkata, West Bengal" /></label>
        <label>Target customer<input placeholder="Who should this website attract?" /></label>
        <label>Main website goal<select defaultValue=""><option value="" disabled>Select one</option><option>Generate leads</option><option>Sell products</option><option>Get bookings</option><option>Build trust</option></select></label>
        <label>Preferred style (optional)<input placeholder="Premium, minimal, bold..." /></label>
        <button type="button">Generate Project Blueprint</button>
      </form>

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
      `}</style>
    </main>
  );
}
