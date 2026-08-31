import { NextResponse } from "next/server";
import { projectStore } from "../../../../../../../lib/storage";
import { getAIProvider } from "../../../../../../../lib/ai/provider";
import { buildGenerationPrompt } from "../../../../../../../lib/ai/prompts";
import { DocumentType } from "../../../../../../../lib/types";

export const runtime = "nodejs";

export async function POST(
  _request: Request,
  context: { params: Promise<{ projectId: string; documentId: string }> }
) {
  const { projectId, documentId } = await context.params;
  const project = projectStore.get(projectId);
  const document = projectStore.getDocument(projectId, documentId);

  if (!project || !document) {
    return NextResponse.json({ error: "Project or document not found." }, { status: 404 });
  }

  try {
    const provider = getAIProvider();
    const prompt = buildGenerationPrompt(project.input, document.type as DocumentType);
    const content = await provider.generate(prompt);
    const updated = projectStore.regenerateDocument(projectId, documentId, content);
    return NextResponse.json({ document: updated });
  } catch {
    return NextResponse.json({ error: "Unable to regenerate document." }, { status: 500 });
  }
}
