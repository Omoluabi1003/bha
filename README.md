# Best Home Academy (BHA)

**Excellence Is Doing Ordinary Things Extraordinarily Well**

Digital school management and payment platform for Best Home Academy.

**Address:** 16 Umana Ndon, Eket, Akwa Ibom State, Nigeria

## Platform Vision

BHA is being developed as a mobile-first school management portal, not merely a brochure website. It will provide a public-facing academy website alongside secure role-based workspaces for the Proprietor, Staff, Parents, and Students.

## Core Modules

- Public academy website
- Online admissions
- Proprietor dashboard
- Staff dashboard
- Parent portal
- Student portal
- Student and parent records
- Academic sessions and subjects
- Attendance and results
- Fee invoicing and balances
- Secure online school-fee payments in Nigerian Naira
- Digital receipts and transaction history
- Announcements and school communications
- Role-based access control and audit trail

## Payment Architecture

The production payment flow will use a Nigerian payment gateway such as Paystack or Flutterwave. Secret credentials must remain server-side and must never be committed to this repository. Payment status will be verified server-side before a student's account is credited.

## Proposed Stack

- Next.js
- TypeScript
- PostgreSQL / Supabase
- Role-based authentication
- Paystack or Flutterwave
- Vercel

## Roles

### Proprietor
Full institutional oversight including admissions, users, students, staff, payments, outstanding balances, academic records, reports, announcements, and audit activity.

### Staff
Access limited to authorized academic and administrative functions, including assigned students/classes, attendance, results, and announcements.

### Parents
Secure access to linked children, invoices, balances, payment history, receipts, results, attendance, and school announcements.

### Students
Secure access to personal profile, academic records, results, schedules, payment status, and announcements.

## Security Principles

- Least-privilege role permissions
- Server-side payment verification
- No payment secrets in client code
- Auditable financial changes
- Protected student information
- Secure sessions and password recovery
- Database constraints and validation
- Production backups

## Status

Initial architecture established. Application implementation follows.
