# Build Verification Note

The GitHub connector used for this change does not execute the repository's local `next build`. The PR should rely on the repository's deployment/CI build as the final compile check before merge. The feature itself does not add a new package dependency.
