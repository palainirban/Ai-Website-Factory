# AI Website Factory — Application Architecture

## Product vision

AI Website Factory is an internal-first AI workspace that converts a small business brief into a complete website strategy and build package.

## Core flow

Brief → Discovery → Strategy → Brand → Design → Content → Features → Tasks → Build → QA → Export/GitHub

## MVP

### 1. Project intake
Collect:
- business name
- business type
- location/market
- what the business does
- target customer
- primary goal
- preferred style
- reference URLs

### 2. Project workspace
A project has:
- Overview
- Strategy
- Blueprint
- Brand
- Design
- Content
- Features
- Tasks

### 3. Generation engine
The system should generate documents in sequence while allowing regeneration of individual sections.

### 4. Review mode
Each generated document can be:
- edited
- regenerated
- marked approved

### 5. Export
Export the project as:
- Markdown project pack
- ZIP
- GitHub repository structure

## Recommended stack

- Next.js + TypeScript
- Tailwind CSS
- shadcn/ui or a lightweight component system
- Supabase/Postgres for persistence when multi-project storage is needed
- Server-side AI provider adapter
- GitHub integration for project export/sync

## Data model

### Project
- id
- name
- businessName
- industry
- location
- description
- targetAudience
- primaryGoal
- stylePreference
- status
- createdAt
- updatedAt

### Document
- id
- projectId
- type
- title
- content
- version
- status

### Task
- id
- projectId
- title
- phase
- completed

## Security

AI keys must never be exposed in client-side code. Integrations use environment variables and server-side actions.

## MVP non-goals

Do not initially build:
- multi-tenant billing
- complex team permissions
- a full visual website editor
- autonomous production deployment

Build the core workflow first.
