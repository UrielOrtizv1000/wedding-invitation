# Security Policy

## Reporting a vulnerability

Report anything that looks like a security issue through GitHub's private
[security advisories](../../security/advisories/new) instead of a public issue.

This is a static site with no backend and no user accounts, so the realistic
surface is small: a dependency with a known vulnerability, a leaked secret in
the history, or a workflow that could be made to run untrusted code. Those are
still worth reporting.

## Supported versions

Only the current `main` branch is maintained. There are no released versions to
backport fixes to.

## What to expect

This is a personal project maintained by one person in their own time. Best
effort, no guaranteed response time. Fixes for dependency advisories usually
land as automated Dependabot pull requests.
