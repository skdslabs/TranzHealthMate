# AI and Intelligent Testing — Safe Implementation Plan

The current MVP assistant is deliberately retrieval-based and deterministic. It does not call an online LLM.

## Proposed portfolio extensions
1. Requirement-to-test assistant: accept a requirement, retrieve a fixed prompt template, and draft positive, negative, boundary and accessibility scenarios. Label output as a draft requiring QA review.
2. Test-data generator: create reproducible boundary and equivalence-partition datasets from explicit field constraints. Never use real patient data.
3. Failure summarizer: parse pytest/Playwright traces and group likely causes (selector mismatch, timeout, assertion, network, app exception). Link each summary to the original log.
4. Self-healing locator demo: propose alternative locators from accessible roles/labels and DOM evidence. Require uniqueness, visibility, enabled-state and expected-content assertions; do not silently update production tests.

## Guardrails
- Never let an AI-generated health response diagnose or prescribe.
- Keep AI features optional; deterministic offline behavior remains available.
- Use synthetic test data only.
- Preserve original failure logs and show uncertainty.
- Require human approval before accepting locator changes or generated tests.
