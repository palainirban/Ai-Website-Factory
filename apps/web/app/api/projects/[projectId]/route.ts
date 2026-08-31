import { NextResponse } from "next/server";
import { projectStore } from "../../../../lib/storage";
export async function GET(_request: Request, context: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await context.params;
  const project = projectStore.get(projectId);
  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  return NextResponse.json({ project, documents: projectStore.getDocuments(projectId) });
}
