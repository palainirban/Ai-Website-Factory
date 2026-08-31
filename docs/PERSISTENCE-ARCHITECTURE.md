# Persistence Architecture

## Current MVP

The application uses an in-memory repository so the complete workflow can be developed without requiring database credentials.

## Production target

Use PostgreSQL, with Supabase as the recommended managed option.

Schema:

- projects
- project_documents

The SQL schema is available at:

`apps/web/db/schema.sql`

## Migration path

1. Create a PostgreSQL/Supabase database.
2. Apply `schema.sql`.
3. Add server-only database credentials.
4. Replace the in-memory repository with a Postgres repository implementation.
5. Keep the same Project and ProjectDocument interfaces so UI and generation code do not need to change.

## Why this architecture

The application separates the domain model from storage. This keeps the AI generation pipeline independent of the database provider and makes local development easy.
