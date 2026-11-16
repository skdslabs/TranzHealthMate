

\# TranzHealthMate – Requirements Traceability Matrix (RTM)



\## 1. Introduction



This Requirements Traceability Matrix (RTM) maps the functional requirements of TranzHealthMate to their corresponding test scenarios.



The purpose is to ensure that important application requirements have corresponding validation scenarios and that testing coverage can be tracked throughout the project.



\## 2. Project Information



| Field | Details |

|---|---|

| Project | TranzHealthMate |

| Project Type | Personal Health and Wellness Assistant |

| Testing Framework | Pytest |

| API Testing | FastAPI TestClient |

| UI Automation | Playwright |

| Test Management | Markdown documentation |

| Version | MVP |



\## 3. Traceability Matrix



\### 3.1 Dashboard and User Profile



| Requirement ID | Requirement Description | Test Case ID | Test Scenario | Testing Type | Coverage |

|---|---|---|---|---|---|

| REQ-001 | Application dashboard should load successfully | DASH-001 | Verify dashboard loading | E2E | Automated |

| REQ-002 | Dashboard should support refreshing | DASH-002 | Refresh the application | Functional | Planned |

| REQ-003 | Users should be able to navigate dashboard sections | DASH-003 | Navigate dashboard sections | Functional | Planned |

| REQ-004 | Users should be able to enter profile information | PROF-001 | Enter valid profile information | Functional | Automated interaction coverage is partial |

| REQ-005 | Application should support partial profile information | PROF-002 | Enter partial profile information | Unit / Functional | Automated logic coverage |

| REQ-006 | Application should handle missing optional profile fields | PROF-003 | Leave optional fields empty | Functional | Planned |



\### 3.2 Wellness Calculations



| Requirement ID | Requirement Description | Test Case ID | Test Scenario | Testing Type | Coverage |

|---|---|---|---|---|---|

| REQ-007 | Application should calculate BMI using valid measurements | BMI-001 | Enter valid height and weight | Unit / API | Automated |

| REQ-008 | Application should handle missing height | BMI-002 | Leave height empty | Unit / API | Automated |

| REQ-009 | Application should handle missing weight | BMI-003 | Leave weight empty | Unit / API | Automated |

| REQ-010 | Application should validate invalid measurements | BMI-004 | Enter zero or negative measurements | Unit / API | Automated |

| REQ-011 | Application should provide a protein reference estimate | PROT-001 | Enter valid body weight | Unit / API | Automated |

| REQ-012 | Application should handle missing body weight | PROT-002 | Leave body weight empty | Unit / API | Automated |

| REQ-013 | Application should validate invalid body weight | PROT-003 | Enter zero or negative weight | Unit / API | Automated |



\### 3.3 Food Explorer



| Requirement ID | Requirement Description | Test Case ID | Test Scenario | Testing Type | Coverage |

|---|---|---|---|---|---|

| REQ-014 | Application should display food suggestions | FOOD-001 | Open food explorer | Functional | Planned |

| REQ-015 | Application should support vegetarian filtering | FOOD-002 | Select vegetarian preference | Functional | Planned |

| REQ-016 | Application should support vegan filtering | FOOD-003 | Select vegan preference | Functional | Planned |

| REQ-017 | Application should filter foods by nutrient | FOOD-004 | Apply nutrient filter | Functional | Planned |

| REQ-018 | Application should handle empty filter results | FOOD-006 | Apply filters with no matching results | Negative | Planned |



\### 3.4 Wellness Tracking and User Preferences



| Requirement ID | Requirement Description | Test Case ID | Test Scenario | Testing Type | Coverage |

|---|---|---|---|---|---|

| REQ-019 | Users should be able to update water intake | WELL-001 | Update water intake | Functional | Planned |

| REQ-020 | Users should be able to update sleep duration | WELL-002 | Update sleep duration | Functional | Planned |

| REQ-021 | Users should be able to update step count | WELL-003 | Update step count | Functional | Planned |

| REQ-022 | Users should be able to update daily habits | WELL-004 | Update daily habits | Functional | Planned |

| REQ-023 | Application should support dark and light themes | THEME-001, THEME-002 | Switch between themes | Functional | Planned |

| REQ-024 | Application should preserve supported user preferences | THEME-003 | Refresh after changing theme | Functional | Planned |



\### 3.5 Data Management and Offline Functionality



| Requirement ID | Requirement Description | Test Case ID | Test Scenario | Testing Type | Coverage |

|---|---|---|---|---|---|

| REQ-025 | Users should be able to export application data | DATA-001 | Export application data | Functional | Planned |

| REQ-026 | Users should be able to delete locally stored application data | DATA-003 | Delete application data | Functional | Planned |

| REQ-027 | Application should provide supported offline content | OFF-002 | Access supported content offline | E2E | Automated |

| REQ-028 | Offline wellness assistant should provide curated responses | OFF-003 | Use offline wellness assistant | Functional | Planned |

| REQ-029 | Cached application resources should remain accessible offline | OFF-004 | Refresh while offline after caching | E2E | Automated |



\### 3.6 API Requirements



| Requirement ID | Requirement Description | Test Case ID | Test Scenario | Testing Type | Coverage |

|---|---|---|---|---|---|

| REQ-030 | API should expose a health endpoint | API-001 | GET /health | API | Automated |

| REQ-031 | API should calculate metrics for valid input | API-002 | POST /metrics with valid data | API | Automated |

| REQ-032 | API should handle weight-only input | API-003 | POST /metrics with weight only | API | Automated |

| REQ-033 | API should handle empty input | API-004 | POST /metrics with empty data | API | Automated |

| REQ-034 | API should handle height-only input | API-005 | POST /metrics with height only | API | Automated |

| REQ-035 | API should reject invalid height | API-006 | Submit invalid height | API Negative | Automated |

| REQ-036 | API should reject invalid weight | API-007 | Submit invalid weight | API Negative | Automated |

| REQ-037 | API should reject invalid input data types | API-008 | Submit invalid data type | API Negative | Automated |



\## 4. Traceability Summary



| Category | Requirement Count |

|---|---:|

| Dashboard and Profile | 6 |

| Wellness Calculations | 7 |

| Food Explorer | 5 |

| Wellness Tracking and Preferences | 6 |

| Data Management and Offline Functionality | 5 |

| API | 8 |

| Total Requirements | 37 |



\## 5. Coverage Status Definitions



| Status | Meaning |

|---|---|

| Automated | Corresponding automated test coverage is recorded in the current project test suite |

| Planned | Scenario is identified but requires implementation or execution |

| Partial | Some related behavior is automated, but the full requirement is not covered |



Coverage labels should be updated as tests are implemented and verified.



\## 6. Traceability Guidelines



\- Every important functional requirement should have at least one test scenario.

\- Test case IDs should remain consistent with the Test Plan.

\- New application features should receive requirement IDs.

\- Requirements should be reviewed when application functionality changes.

\- Failed test cases should be linked to relevant defect reports.

\- Coverage status should be updated after actual test execution.

\- Requirements without test coverage should be identified and addressed.



\## 7. Known Limitations



\- This matrix is based on the current MVP feature scope.

\- Some requirements have planned rather than implemented test coverage.

\- Automated coverage labels refer to the current recorded test suite and should be verified against the actual test implementation.

\- This matrix does not establish clinical accuracy or medical safety.



\## 8. Conclusion



The Requirements Traceability Matrix provides a structured link between TranzHealthMate's functional requirements and its test scenarios.



It helps identify testing gaps, organize regression testing and demonstrate requirement-based testing practices.



The matrix will be updated as the application and its automated test suite evolve.



