# BHA managed account workflow

BHA does not expose public role registration. School management controls membership.

## Intended workflow
1. Proprietor or authorized administrator admits the learner.
2. Management creates the student's authentication account using the secure server-side provisioning service.
3. A profile is assigned the `student` role, BHA Student ID and class.
4. A temporary credential is issued and the student is required to change it at first sign-in.
5. Parent accounts are separately provisioned and linked to their children through `parent_students`.
6. Teacher/staff accounts are separately provisioned with only their authorized role.
7. Accounts can be deactivated without deleting academic or financial history.

## Security boundary
Creation, password reset, role assignment and account deactivation require privileged server-side authentication administration. Never expose a Supabase service-role key in browser code. The management UI therefore lists/manages school identities while privileged account mutations must run through a protected server action/API using a server-only secret.
