

\# TranzHealthMate – Test Plan and Test Scenarios



\## 1. Introduction



This document defines the test plan and test scenarios for TranzHealthMate, an offline-first personal health and wellness assistant.



The purpose is to validate the application's core functionality, API behavior, calculations, browser workflows, data handling and offline capabilities.



Testing combines manual validation and automated testing using Pytest, FastAPI TestClient and Playwright.



\## 2. Testing Objectives



\- Validate the major application features.

\- Verify BMI and protein reference calculations.

\- Validate API responses and input handling.

\- Test positive, negative and boundary scenarios.

\- Verify browser-based user workflows.

\- Validate local data storage and export functionality.

\- Verify offline functionality.

\- Identify and document defects.

\- Perform regression testing after fixes.

\- Ensure automated tests execute successfully in GitHub Actions.



\## 3. Test Environment



| Component | Environment |

|---|---|

| Operating System | Windows 11 |

| Programming Language | Python 3.13 |

| Backend | FastAPI |

| Frontend | HTML, CSS and JavaScript |

| Unit Testing | Pytest |

| API Testing | FastAPI TestClient |

| Browser Automation | Playwright |

| Browser | Chromium |

| Test Reporting | pytest-html |

| Code Coverage | pytest-cov |

| CI/CD | GitHub Actions |



\## 4. Testing Scope



\### In Scope



\- Dashboard loading and navigation.

\- User profile input and validation.

\- BMI calculation.

\- Protein reference calculation.

\- Food explorer and dietary filtering.

\- Nutrient filtering.

\- Water, sleep, steps and habit tracking.

\- Dark and light theme.

\- Local storage.

\- JSON data export.

\- Delete-data functionality.

\- Offline content and service worker behavior.

\- API health endpoint.

\- API metrics endpoint.

\- Input validation and error handling.



\### Out of Scope



\- Clinical validation of health recommendations.

\- Medical diagnosis.

\- Integration with hospitals or medical records.

\- Production-scale load testing.

\- Full security certification.

\- External third-party health integrations.



\## 5. Test Execution Approach



Testing will be performed at the following levels:



| Testing Level | Objective | Tool |

|---|---|---|

| Unit Testing | Validate individual calculation functions | Pytest |

| API Testing | Validate API responses and input validation | FastAPI TestClient |

| Functional Testing | Validate application features | Manual Testing |

| End-to-End Testing | Validate browser workflows | Playwright |

| Regression Testing | Verify existing functionality after changes | Pytest and Playwright |

| Compatibility Testing | Validate supported browser behavior | Chromium |

| Offline Testing | Verify supported offline functionality | Playwright |



\## 6. Test Scenarios and Test Cases



Priority definitions:



\- P1 – Critical functionality.

\- P2 – Important functionality.

\- P3 – Normal or lower-priority functionality.



\### 6.1 Dashboard Testing



| Test ID | Test Scenario | Expected Result | Priority |

|---|---|---|---|

| DASH-001 | Open the application | Dashboard loads successfully | P1 |

| DASH-002 | Refresh the application | Dashboard loads without errors | P1 |

| DASH-003 | Navigate through dashboard sections | Sections are accessible | P2 |

| DASH-004 | Verify dashboard content | Expected content is displayed | P2 |



\### 6.2 User Profile Testing



| Test ID | Test Scenario | Expected Result | Priority |

|---|---|---|---|

| PROF-001 | Enter valid profile information | Profile information is accepted | P1 |

| PROF-002 | Enter partial profile information | Supported partial information is accepted | P1 |

| PROF-003 | Leave optional fields empty | Application handles missing values | P2 |

| PROF-004 | Refresh after saving profile information | Persisted information is restored where supported | P2 |

| PROF-005 | Enter invalid measurement values | Invalid values are handled appropriately | P1 |



\### 6.3 BMI Calculation Testing



| Test ID | Test Scenario | Expected Result | Priority |

|---|---|---|---|

| BMI-001 | Enter valid height and weight | BMI is calculated | P1 |

| BMI-002 | Leave height empty | BMI is not calculated | P1 |

| BMI-003 | Leave weight empty | BMI is not calculated | P1 |

| BMI-004 | Enter zero or negative measurements | Invalid measurements are rejected or handled | P1 |

| BMI-005 | Enter measurements outside supported limits | Validation is applied | P2 |



\### 6.4 Protein Reference Testing



| Test ID | Test Scenario | Expected Result | Priority |

|---|---|---|---|

| PROT-001 | Enter valid body weight | Protein reference is calculated | P1 |

| PROT-002 | Enter missing body weight | Protein reference is unavailable | P1 |

| PROT-003 | Enter zero or negative weight | Invalid input is handled | P1 |

| PROT-004 | Enter weight outside supported limits | Validation is applied | P2 |



\### 6.5 Food Explorer Testing



| Test ID | Test Scenario | Expected Result | Priority |

|---|---|---|---|

| FOOD-001 | Open food explorer | Food suggestions are displayed | P1 |

| FOOD-002 | Select vegetarian preference | Matching suggestions are displayed | P1 |

| FOOD-003 | Select vegan preference | Matching suggestions are displayed | P1 |

| FOOD-004 | Apply nutrient filter | Relevant food suggestions are displayed | P1 |

| FOOD-005 | Change dietary preference | Results update appropriately | P2 |

| FOOD-006 | Apply filters with no matching results | Application handles empty results clearly | P2 |



\### 6.6 Wellness Tracking Testing



| Test ID | Test Scenario | Expected Result | Priority |

|---|---|---|---|

| WELL-001 | Update water intake | Tracker displays updated value | P1 |

| WELL-002 | Update sleep duration | Tracker displays updated value | P1 |

| WELL-003 | Update step count | Tracker displays updated value | P2 |

| WELL-004 | Update daily habits | Habit status changes correctly | P2 |

| WELL-005 | Refresh the dashboard | Persisted tracker information is restored where supported | P2 |



\### 6.7 Theme Testing



| Test ID | Test Scenario | Expected Result | Priority |

|---|---|---|---|

| THEME-001 | Select dark mode | Dark theme is applied | P2 |

| THEME-002 | Select light mode | Light theme is applied | P2 |

| THEME-003 | Refresh after changing theme | Saved preference is restored where supported | P3 |



\### 6.8 Data Management Testing



| Test ID | Test Scenario | Expected Result | Priority |

|---|---|---|---|

| DATA-001 | Export application data | JSON export is generated | P1 |

| DATA-002 | Inspect exported JSON | Export contains the expected available data | P2 |

| DATA-003 | Delete application data | Application data is cleared from its designated local storage key | P1 |

| DATA-004 | Refresh after deleting data | Deleted information is not restored from that cleared storage key | P1 |



\### 6.9 Offline Functionality Testing



| Test ID | Test Scenario | Expected Result | Priority |

|---|---|---|---|

| OFF-001 | Load application while online | Application loads successfully | P1 |

| OFF-002 | Access supported content while offline | Cached content remains accessible | P1 |

| OFF-003 | Use offline wellness assistant | Curated offline responses are available | P1 |

| OFF-004 | Refresh while offline after caching | Supported cached application resources load | P2 |

| OFF-005 | Restore network connectivity | Application can resume normal online access | P2 |



\### 6.10 API Testing



| Test ID | Test Scenario | Expected Result | Priority |

|---|---|---|---|

| API-001 | Send GET request to `/health` | HTTP 200 response | P1 |

| API-002 | Send valid data to `/metrics` | Expected metrics are returned | P1 |

| API-003 | Send weight without height | Protein reference is available; BMI is unavailable | P1 |

| API-004 | Send an empty request | Missing measurements are handled correctly | P1 |

| API-005 | Send height without weight | BMI and protein reference are unavailable | P1 |

| API-006 | Send invalid height | HTTP 422 validation response | P1 |

| API-007 | Send invalid weight | HTTP 422 validation response | P1 |

| API-008 | Send invalid input data type | HTTP 422 validation response | P1 |



\## 7. Test Data



The following examples can be used when validating supported input ranges.



| Test Data | Height | Weight | Purpose |

|---|---:|---:|---|

| TD-001 | 170 cm | 65 kg | Normal valid input |

| TD-002 | 160 cm | 55 kg | Valid input |

| TD-003 | Not provided | 65 kg | Missing height |

| TD-004 | 170 cm | Not provided | Missing weight |

| TD-005 | 0 cm | 65 kg | Invalid height |

| TD-006 | 170 cm | 0 kg | Invalid weight |

| TD-007 | -170 cm | 65 kg | Negative height |

| TD-008 | 170 cm | -65 kg | Negative weight |



Actual accepted boundaries should be verified against the application's validation rules.



\## 8. Automation Coverage



The current automated test suite includes:



| Test Area | Framework | Current Coverage |

|---|---|---|

| Unit Testing | Pytest | Automated |

| API Testing | FastAPI TestClient | Automated |

| Dashboard E2E | Playwright | Automated |

| Offline E2E | Playwright | Automated |

| Food Explorer | Manual testing | Further automation planned |

| Wellness Trackers | Manual testing | Further automation planned |

| Theme | Manual testing | Further automation planned |

| Data Export | Manual testing | Further automation planned |



Not every scenario in this document is currently automated.



\## 9. Test Execution Commands



Run unit tests:



```bash

python -m pytest tests/unit -v

```



Run API tests:



```bash

python -m pytest tests/api -v

```



Run end-to-end tests:



```bash

python -m pytest tests/e2e -v

```



Run the complete test suite:



```bash

python -m pytest -v

```



Generate HTML and coverage reports:



```bash

python -m pytest -v --cov=api --cov=health\_logic --cov-report=term-missing --cov-report=html:reports/coverage --html=reports/full-test-report.html --self-contained-html

```



\## 10. Defect Reporting



Every identified defect should include:



\- Defect ID.

\- Test case ID.

\- Defect summary.

\- Environment.

\- Preconditions.

\- Steps to reproduce.

\- Expected result.

\- Actual result.

\- Severity.

\- Priority.

\- Screenshots or logs.

\- Defect status.



Suggested defect lifecycle:



New → Assigned → In Progress → Fixed → Retest → Closed



Defects that persist after a fix should be reopened.



\## 11. Entry Criteria



\- Application source code is available.

\- Required dependencies are installed.

\- Test environment is configured.

\- Test data is prepared.

\- Test scenarios are reviewed.

\- Required browser binaries are installed.



\## 12. Exit Criteria



\- All required P1 test scenarios pass.

\- Automated test suite completes successfully.

\- No unresolved critical defects remain.

\- API validation scenarios pass.

\- Browser automation completes successfully.

\- Test reports are generated and reviewed.

\- GitHub Actions workflow completes successfully.



\## 13. Risks and Limitations



\- Health estimates are educational and not medical advice.

\- Nutrient information may vary by food and preparation.

\- Browser local storage is not encrypted medical-record storage.

\- Current automated browser coverage is limited.

\- Current Python coverage measures only the configured Python modules.

\- Some functional scenarios require manual execution.



\## 14. Future Improvements



\- Expand Playwright automation.

\- Add Firefox and WebKit testing.

\- Introduce accessibility testing.

\- Add performance testing.

\- Add security and dependency vulnerability checks.

\- Add API contract testing.

\- Improve test data management.

\- Introduce requirement-to-test traceability.

\- Explore AI-assisted test generation and failure analysis.



\## 15. Conclusion



This test plan provides a structured approach to validating TranzHealthMate.



It combines functional testing, negative testing, API testing, unit testing and browser automation.



The document will be updated as new features, test cases and automation capabilities are added.



