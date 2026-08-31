import { NextResponse } from "next/server";
import { generateProject } from "../../../lib/generate-project";
import { ProjectInput } from "../../../lib/types";
import { projectStore } from "../../../lib/storage";
export const runtime = "nodejs";
function validate(body: Partial<ProjectInput>) {
  const errors: string[] = [];
  if (!body.businessName?.trim()) errors.push("Business name is required.");
  if (!body.description?.trim()) errors.push("Business description is required.");
  if (!body.targetCustomer?.trim()) errors.push("Target customer is required.");
  if (!body.primaryGoal?.trim()) errors.push("Primary goal is required.");
  return errors;
}
export async function GET() { return NextResponse.json({ projects: projectStore.list() }); }
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ProjectInput>;
    const errors = validate(body);
    if (errors.length) return NextResponse.json({ errors }, { status: 400 });
    const input: ProjectInput = { businessName: body.businessName!.trim(), businessType: body.businessType?.trim(), location: body.location?.trim(), description: body.description!.trim(), targetCustomer: body.targetCustomer!.trim(), primaryGoal: body.primaryGoal!.trim(), stylePreference: body.stylePreference?.trim(), referenceUrls: body.referenceUrls ?? [] };
    return NextResponse.json(await generateProject(input), { status: 201 });
  } catch { return NextResponse.json({ error: "Unable to create project." }, { status: 500 }); }
}
