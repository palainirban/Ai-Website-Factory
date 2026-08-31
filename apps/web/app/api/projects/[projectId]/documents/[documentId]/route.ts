import { NextResponse } from "next/server";
import { projectStore } from "../../../../../../lib/storage";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ projectId: string; documentId: string }> }
) {
  const { projectId, documentId } = await context.params;
  const body = await request.json() as { content?: string; status?: "draft" | "generated" | "approved" };

  const document = projectStore.updateDocument(projectId, documentId, {
    ...(typeof body.content === "string" ? { content: body.content } : {}),
    ...(body.status ? { status: body.status } : {})
  });

  if (!document) return NextResponse.json({ error: "Document not found." }, { status: 404 });
  return NextResponse.json({ document });
}
