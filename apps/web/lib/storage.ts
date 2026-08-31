import { Project, ProjectDocument } from "./types";
const projects = new Map<string, Project>();
const documents = new Map<string, ProjectDocument[]>();
export const projectStore = {
  create(project: Project) { projects.set(project.id, project); return project; },
  get(projectId: string) { return projects.get(projectId) ?? null; },
  list() { return Array.from(projects.values()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)); },
  saveDocuments(projectId: string, items: ProjectDocument[]) { documents.set(projectId, items); return items; },
  getDocuments(projectId: string) { return documents.get(projectId) ?? []; }
};
