import { randomUUID } from "crypto";
import { getAIProvider } from "./ai/provider";
import { buildGenerationPrompt, documentOrder, documentTitle } from "./ai/prompts";
import { projectStore } from "./storage";
import { GenerationResult, Project, ProjectDocument, ProjectInput } from "./types";

export async function generateProject(input: ProjectInput): Promise<GenerationResult> {
  const now = new Date().toISOString();
  const project: Project = { id: randomUUID(), createdAt: now, updatedAt: now, input };
  projectStore.create(project);
  const provider = getAIProvider();
  const documents: ProjectDocument[] = [];
  for (const type of documentOrder) {
    const content = await provider.generate(buildGenerationPrompt(input, type));
    documents.push({ id: randomUUID(), projectId: project.id, type, title: documentTitle(type), content, status: "generated", version: 1, createdAt: now, updatedAt: now });
  }
  projectStore.saveDocuments(project.id, documents);
  return { project, documents };
}
