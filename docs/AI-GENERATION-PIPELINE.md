# AI Generation Pipeline

## Sequence
1. PROJECT.md
2. WEBSITE-BLUEPRINT.md
3. BRAND.md
4. DESIGN.md
5. CONTENT.md
6. FEATURES.md
7. TASKS.md

## Rules
- Generation happens server-side.
- Provider keys must never reach the browser.
- Business facts must not be fabricated.
- Each document is independently versionable.
- The provider layer is replaceable.

## Current MVP state
The repository contains a deterministic mock provider. This proves the application flow before a production AI provider is connected.

## Production provider work
A provider implementation should read keys from server-side environment variables, return Markdown, handle failures and record provider/model metadata without exposing secrets.
