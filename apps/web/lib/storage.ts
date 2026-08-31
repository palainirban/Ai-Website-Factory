import { Project, ProjectDocument } from "./types";

const projects = new Map<string, Project>();
const documents = new Map<string, ProjectDocument[]>();

function now() { return new Date().toISOString(); }

export const projectStore = {
  create(project: Project) {
    projects.set(project.id, project);
    return project;
  },
  get(projectId: string) {
    return projects.get(projectId) ?? null;
  },
  list() {
    return Array.from(projects.values()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  },
  saveDocuments(projectId: string, items: ProjectDocument[]) {
    documents.set(projectId, items);
    return items;
  },
  getDocuments(projectId: string) {
    return documents.get(projectId) ?? [];
  },
  getDocument(projectId: string, documentId: string) {
    return this.getDocuments(projectId).find(item => item.id === documentId) ?? null;
  },
  updateDocument(projectId: string, documentId: string, patch: Partial<Pick<ProjectDocument, "content" | "status">>) {
    const items = this.getDocuments(projectId);
    const document = items.find(item => item.id === documentId);
    if (!document) return null;
    Object.assign(document, patch, { updatedAt: now() });
    documents.set(projectId, items);
    return document;
  },
  regenerateDocument(projectId: string, documentId: string, content: string) {
    const items = this.getDocuments(projectId);
    const document = items.find(item => item.id === documentId);
    if (!document) return null;
    document.content = content;
    document.status = "generated";
    document.version += 1;
    document.updatedAt = now();
    documents.set(projectId, items);
    return document;
  }
};
