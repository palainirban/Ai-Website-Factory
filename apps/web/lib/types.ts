export type DocumentType = "PROJECT" | "WEBSITE_BLUEPRINT" | "BRAND" | "DESIGN" | "CONTENT" | "FEATURES" | "TASKS";
export type DocumentStatus = "draft" | "generated" | "approved";
export interface ProjectInput { businessName: string; businessType?: string; location?: string; description: string; targetCustomer: string; primaryGoal: string; stylePreference?: string; referenceUrls?: string[]; }
export interface Project { id: string; createdAt: string; updatedAt: string; input: ProjectInput; }
export interface ProjectDocument { id: string; projectId: string; type: DocumentType; title: string; content: string; status: DocumentStatus; version: number; createdAt: string; updatedAt: string; }
export interface GenerationResult { project: Project; documents: ProjectDocument[]; }
