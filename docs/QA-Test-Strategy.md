
# TranzHealthMate – QA Test Strategy

## 1. Introduction

TranzHealthMate is an offline-first personal health and wellness assistant developed as an educational software project.

This document describes the quality assurance strategy, testing approach, automation framework, test coverage and release criteria for the application.

The objective is to demonstrate practical software testing skills across functional testing, API testing, unit testing, browser automation and continuous integration.

## 2. Testing Objectives

The primary testing objectives are:

- Verify the correctness of wellness calculation logic.
- Validate API responses, input handling and error scenarios.
- Verify the dashboard's major user workflows.
- Validate offline functionality and application behavior.
- Identify functional defects and regression issues.
- Maintain reliable automated test execution.
- Integrate automated testing into GitHub Actions.
- Improve application reliability and maintainability.

## 3. Testing Scope

### In Scope

| Area | Testing Coverage |
|---|---|
| Wellness calculations | BMI, protein reference and profile completeness |
| API | Health endpoint, metrics endpoint and input validation |
| Dashboard | Main dashboard and user interactions |
| User profile | Optional profile fields and partial profiles |
| Food explorer | Dietary preference and nutrient filtering |
| Wellness tracking | Water, sleep, steps and daily habits |
| Offline functionality | Offline question-answer guide and caching behavior |
| Browser compatibility | Chromium-based browser automation |
| Data handling | Local storage, JSON export and delete-data functionality |
| UI preferences | Dark and light mode |

### Out of Scope

The following are not currently covered by the MVP automation suite:

- Medical diagnosis or clinical validation.
- Accuracy certification of individual nutritional recommendations.
- Security certification for health-record storage.
- Full cross-browser compatibility testing.
- Performance benchmarking under production-scale traffic.
- Integration with external medical systems.

## 4. Testing Approach

A combination of manual and automated testing is used.

### 4.1 Unit Testing

Framework: Pytest

Objective:
Validate individual Python functions independently.

Key test areas:

- BMI calculation with valid height and weight.
- BMI handling when measurements are missing.
- BMI validation for values outside supported ranges.
- Protein reference calculation.
- Protein validation for invalid weight values.
- Profile completeness calculation.

### 4.2 API Testing

Framework: Pytest + FastAPI TestClient

Objective:
Validate API behavior, response structure and input validation.

| Test Scenario | Expected Result |
|---|---|
| GET /health | HTTP 200 and healthy service response |
| POST /metrics with valid measurements | Correct BMI and protein reference |
| POST /metrics with weight only | Protein reference returned; BMI unavailable |
| POST /metrics with no measurements | Empty estimates and informative message |
| POST /metrics with height only | BMI and protein reference unavailable |
| Invalid height | HTTP 422 |
| Invalid weight | HTTP 422 |
| Invalid input data type | HTTP 422 |

The API tests use FastAPI TestClient and do not require a separately running Uvicorn server.

### 4.3 End-to-End Testing

Framework: Playwright

Objective:
Validate application workflows through browser interaction.

Key scenarios:

- Verify that the dashboard loads successfully.
- Verify profile-related dashboard interactions.
- Verify offline application behavior.
- Validate expected page content and user-visible results.

### 4.4 Functional Testing

Functional testing focuses on validating the application's user-facing features.

Important scenarios include:

| Feature | Test Scenario | Expected Result |
|---|---|---|
| Dashboard | Open the application | Dashboard loads correctly |
| Profile | Enter partial profile details | Application accepts supported partial information |
| BMI | Enter valid measurements | BMI estimate is displayed |
| Food explorer | Select dietary preference | Matching food suggestions are displayed |
| Nutrient filtering | Select a nutrient | Relevant food suggestions are filtered |
| Water tracking | Update water intake | Tracker reflects the updated value |
| Sleep tracking | Update sleep duration | Tracker reflects the updated value |
| Habit tracking | Update daily habits | Updated habit status is displayed |
| Theme | Switch dark/light mode | Theme changes correctly |
| Data export | Export application data | JSON export is generated |
| Delete data | Use the delete-data control | Application data is cleared from its local storage key |
| Offline mode | Access supported offline content | Curated offline content remains available |

These are functional test scenarios for validation; not all are currently automated.

## 5. Negative Testing

Negative testing verifies how the application handles invalid, incomplete or unexpected input.

Important scenarios:

- Missing height and weight.
- Height below the supported range.
- Height above the supported range.
- Weight below the supported range.
- Weight above the supported range.
- Invalid API input types.
- Partial user profiles.
- Empty API request payloads.

Expected behavior:

- Invalid API inputs return appropriate validation errors.
- Missing optional values are handled without unnecessary application failures.
- The application does not produce misleading calculation results.

## 6. Test Automation Framework

The project uses the following tools:

| Tool | Purpose |
|---|---|
| Python | Test automation language |
| Pytest | Unit and API test framework |
| FastAPI TestClient | API testing |
| Playwright | Browser automation |
| pytest-html | HTML test reports |
| pytest-cov | Python statement coverage |
| GitHub Actions | Continuous integration |

### Automation Structure

```text
tests/
├── unit/
│   └── test_health_logic.py
├── api/
│   └── test_api.py
└── e2e/
    ├── test_dashboard.py
    └── test_offline.py
```

## 7. Test Execution

Install dependencies:

```bash
pip install -r requirements-dev.txt
```

Install Chromium:

```bash
playwright install chromium
```

Run unit tests:

```bash
python -m pytest tests/unit -v
```

Run API tests:

```bash
python -m pytest tests/api -v
```

Run browser tests:

```bash
python -m pytest tests/e2e -v
```

Run the complete test suite:

```bash
python -m pytest -v
```

Generate HTML test and coverage reports:

```bash
python -m pytest -v --cov=api --cov=health_logic --cov-report=term-missing --cov-report=html:reports/coverage --html=reports/full-test-report.html --self-contained-html
```

## 8. Test Results

Latest recorded local test execution:

| Metric | Result |
|---|---|
| Total automated tests | 24 |
| Passed | 24 |
| Failed | 0 |
| API module statement coverage | 100% |
| Health logic module statement coverage | 100% |

Coverage is limited to `api.py` and `health_logic.py`. It does not represent total application coverage.

## 9. Continuous Integration

GitHub Actions is used to execute automated tests when changes are pushed to the repository or submitted through pull requests.

The workflow includes:

- Python dependency installation.
- Unit test execution.
- API test execution.
- Browser test execution using Playwright.
- Automated workflow result reporting.

Repository:

https://github.com/skdslabs/TranzHealthMate

GitHub Actions:

https://github.com/skdslabs/TranzHealthMate/actions

## 10. Defect Management

Defects identified during testing should be documented with:

- Defect ID.
- Summary and description.
- Environment and browser details.
- Preconditions.
- Steps to reproduce.
- Expected result.
- Actual result.
- Severity and priority.
- Screenshots or logs, where applicable.
- Current defect status.

Suggested defect lifecycle:

New → Assigned → In Progress → Fixed → Retest → Closed

If the issue persists after a fix, it should be reopened.

## 11. Entry and Exit Criteria

### Entry Criteria

- Application source code is available.
- Required dependencies are installed.
- Test environment is configured.
- Test scenarios are identified.
- Required browser binaries are installed for E2E execution.

### Exit Criteria

- All required automated tests pass.
- No unresolved critical defects remain.
- API validation scenarios pass.
- Browser automation completes successfully.
- Test reports are generated and reviewed.
- GitHub Actions completes successfully.

## 12. Risks and Limitations

- Health and nutrition estimates are educational and are not medical recommendations.
- Nutrient data may vary by food type, serving size and preparation.
- Browser local storage is not encrypted health-record storage.
- Current automated browser coverage is limited to Chromium.
- Statement coverage does not guarantee complete branch or functional coverage.
- External integrations and production-scale performance are not currently tested.

## 13. Future QA Improvements

Planned quality improvements include:

- Add Firefox and WebKit automation.
- Introduce accessibility testing.
- Add performance and load testing.
- Add security testing and dependency vulnerability checks.
- Expand functional automation for food filtering and wellness trackers.
- Add structured test data management.
- Introduce requirement-to-test traceability.
- Add API schema and contract validation.
- Explore AI-assisted test generation and failure analysis.
- Demonstrate reviewed self-healing locator suggestions.

## 14. Conclusion

TranzHealthMate demonstrates a practical QA automation approach combining Python, Pytest, FastAPI TestClient, Playwright and GitHub Actions.

The project provides examples of unit testing, API validation, end-to-end browser testing, test reporting and continuous integration.

The testing strategy will evolve as additional application features and automation capabilities are introduced.
