# Best Home Academy (BHA)

> **Excellence Is Doing Ordinary Things Extraordinarily Well.**

Best Home Academy is a mobile-first academic and digital-campus platform for focused secondary-school and external-examination preparation in Eket, Akwa Ibom State, Nigeria.

**Location:** 16 Umana Ndon, Eket, Akwa Ibom State, Nigeria  
**Website:** https://bha-nine.vercel.app/

## Platform

BHA combines the academy's public website with a secure Digital Campus for students, parents, staff and the proprietor. The platform is being built around academic preparation, admissions, school administration, payments and a serious Nigerian CBT examination environment.

### Academic Experience

- JAMB, WAEC and NECO preparation
- 18 core and practical subjects
- Timed CBT Practice and Exam Simulation modes
- Adaptive question assembly designed to reduce memorisation
- Student attempt history and topic-level performance tracking
- Controlled question-authoring, academic review and verified-question workflow
- Server-controlled examination architecture that keeps verified answer keys away from the browser

### Digital Campus

- Online admissions
- Proprietor, staff, parent and student access
- Student and guardian records
- Academic sessions, subjects, attendance and results
- School-fee invoices, balances, payment history and verified receipts
- Announcements and school communications
- Role-based access control and audit trails

## BHA Adaptive Exam Engine

The CBT system is designed so repeated practice measures knowledge rather than familiarity with a fixed paper.

The architecture separates question creation from live examinations:

`Candidate Question → Validation → Academic Review → Approved Candidate → Verified Question Bank → Locked Exam Session → Server Scoring`

AI-assisted authoring can support controlled content production, but generated material does not enter a live examination automatically. Formal exam sessions are assembled from verified material, and the production direction is server-side session creation and scoring rather than exposing answer keys to the client.

Practice Mode can reinforce weaker topics. Exam Simulation remains examination-focused, timed and free from live AI assistance.

## Security Principles

- Least-privilege role permissions
- Supabase Row Level Security
- Server-side examination scoring for verified-bank sessions
- Quarantined question candidates separated from student-facing verified content
- No live AI generation during formal exam sessions
- Payment secrets remain server-side
- Server-side payment verification before account credit
- Auditable financial and academic operations
- Protected student information
- Secure sessions and account recovery
- Database constraints, validation and production backups

## Technology

- Next.js 15
- React 19
- TypeScript
- PostgreSQL / Supabase
- Supabase Auth and Row Level Security
- Vercel
- Lucide icons
- Nigerian payment-gateway integration architecture

## Repository Structure

- `app/` application routes, public experience, Digital Campus and API endpoints
- `app/cbt/` CBT student experience
- `app/api/cbt/` authenticated CBT history, authoring and examination endpoints
- `lib/cbt/` adaptive assembly, validation, integrity telemetry and CBT domain logic
- `supabase/` database schemas and CBT migrations

## Deployment Notes

SQL files committed under `supabase/` describe database changes but are not proof that those migrations have been applied to the deployed Supabase project. Database-backed features should only be considered live after the corresponding migration is deployed and verified.

Environment credentials and secret keys must never be committed to this repository.

## Development Direction

Current work is focused on completing the verified-question pipeline and authoritative server-scored CBT sessions, then progressively connecting the Adaptive Exam Engine to the database-backed verified bank while retaining safe fallback behavior during migration.

## Ownership

**Best Home Academy LTD**  
Eket, Akwa Ibom State, Nigeria

Designed and developed by **ETL GIS Consulting LLC**.
