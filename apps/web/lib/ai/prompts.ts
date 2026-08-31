import { DocumentType, ProjectInput } from "../types";
export const documentOrder: DocumentType[] = ["PROJECT", "WEBSITE_BLUEPRINT", "BRAND", "DESIGN", "CONTENT", "FEATURES", "TASKS"];
const labels: Record<DocumentType, string> = { PROJECT: "PROJECT.md", WEBSITE_BLUEPRINT: "WEBSITE-BLUEPRINT.md", BRAND: "BRAND.md", DESIGN: "DESIGN.md", CONTENT: "CONTENT.md", FEATURES: "FEATURES.md", TASKS: "TASKS.md" };
export function documentTitle(type: DocumentType) { return labels[type]; }
export function buildGenerationPrompt(input: ProjectInput, type: DocumentType) {
  return ["You are an expert website strategist working inside AI Website Factory.","Create a practical Markdown document, not commentary.","Never invent awards, client counts, testimonials, certifications or business facts.","Use placeholders where a fact is genuinely unknown.","Keep recommendations specific to the business and primary conversion.","","BUSINESS BRIEF","Business: " + input.businessName,"Type: " + (input.businessType || "Not specified"),"Location/market: " + (input.location || "Not specified"),"Description: " + input.description,"Target customer: " + input.targetCustomer,"Primary goal: " + input.primaryGoal,"Style preference: " + (input.stylePreference || "AI recommendation"),"","Generate: " + labels[type]].join("\n");
}
