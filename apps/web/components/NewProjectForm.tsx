"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function NewProjectForm() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Generating your website project...");
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      businessName: String(form.get("businessName") || ""),
      businessType: String(form.get("businessType") || ""),
      description: String(form.get("description") || ""),
      location: String(form.get("location") || ""),
      targetCustomer: String(form.get("targetCustomer") || ""),
      primaryGoal: String(form.get("primaryGoal") || ""),
      stylePreference: String(form.get("stylePreference") || "")
    };

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.errors?.join(" ") || data.error || "Generation failed.");
      router.push("/projects/" + data.project.id);
    } catch (err) {
      setStatus("");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={submit}>
      <label>Business name<input name="businessName" required placeholder="e.g. Deep Enterprise" /></label>
      <label>Business type<input name="businessType" placeholder="e.g. Real Estate" /></label>
      <label>What does the business do?<textarea name="description" required placeholder="Describe products, services and business model." /></label>
      <label>Location / market<input name="location" placeholder="e.g. Kolkata, West Bengal" /></label>
      <label>Target customer<input name="targetCustomer" required placeholder="Who should this website attract?" /></label>
      <label>Main website goal<select name="primaryGoal" required defaultValue=""><option value="" disabled>Select one</option><option>Generate leads</option><option>Sell products</option><option>Get bookings</option><option>Build trust</option></select></label>
      <label>Preferred style (optional)<input name="stylePreference" placeholder="Premium, minimal, bold..." /></label>
      {error && <p className="error">{error}</p>}
      {status && <p className="status">{status}</p>}
      <button disabled={Boolean(status)}>{status ? "Working..." : "Generate Website Blueprint"}</button>
    </form>
  );
}
