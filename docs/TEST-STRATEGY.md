# Test Strategy

## Scope
Validate core wellness flows, optional inputs, calculation boundaries, local persistence, offline behavior, basic accessibility semantics and the optional API.

## Test levels
- Unit: BMI missing values, valid values, out-of-range boundaries, protein reference, profile completeness.
- API: health endpoint, valid metrics, incomplete metrics, invalid boundary values.
- UI/E2E: dashboard render, navigation, profile save, localStorage persistence, offline/no-external-request smoke test.
- Regression: rerun the full suite after changes to profile, calculations, food filters, storage and navigation.

## Risk-based priorities
1. Incorrect health calculation or unsafe wording.
2. Data loss or accidental exposure.
3. Invalid inputs and incomplete profiles.
4. Offline startup and broken local assets.
5. Navigation, responsiveness and accessibility.

## Entry / exit
Entry: dependencies installed and app files available. Exit: all required tests pass, no critical defects remain, and any known limitations are documented.

## Future coverage
Add Firefox/WebKit, keyboard-only navigation, screen-reader checks, storage migration, allergy structured data, import/export validation, XSS tests, and test data generation.
