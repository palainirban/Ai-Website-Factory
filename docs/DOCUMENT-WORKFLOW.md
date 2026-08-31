# Document Review Workflow

Each generated document can move through:

Generated → Edited → Approved

## Actions

### Save
Persists manual content changes.

### Regenerate
Runs the document through the configured AI provider again and creates a new version number.

### Approve
Marks the current document as approved for downstream development work.

## Current MVP limitation

The current storage adapter is in-memory. Editing, approval and regeneration work during the running server session, but production persistence requires the PostgreSQL/Supabase adapter described in the persistence architecture.
