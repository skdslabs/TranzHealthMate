

\# TranzHealthMate – Bug Report Template



Use this template to document defects identified during manual or automated testing.



\## 1. Defect Details



| Field | Description |

|---|---|

| Defect ID | BUG-001 |

| Defect Title | Short and clear defect summary |

| Module | Name of the affected application module |

| Reported By | Tester name |

| Reported Date | YYYY-MM-DD |

| Environment | OS, browser and application version |

| Severity | Critical / High / Medium / Low |

| Priority | P1 / P2 / P3 |

| Status | New / Assigned / In Progress / Fixed / Retest / Closed / Reopened |



\## 2. Preconditions



Describe the conditions that must be met before reproducing the defect.



Example:

\- Application is running.

\- User has opened the wellness dashboard.

\- Required test data is available.



\## 3. Steps to Reproduce



1\. Open the application.

2\. Navigate to the affected feature.

3\. Enter the required test data.

4\. Perform the action that triggers the issue.

5\. Observe the result.



\## 4. Expected Result



Describe what should happen according to the requirement.



\## 5. Actual Result



Describe what actually happened.



\## 6. Test Data



| Field | Value |

|---|---|

| Input 1 | |

| Input 2 | |

| Input 3 | |



Do not include real personal or sensitive health information in defect reports.



\## 7. Evidence



Attach relevant evidence where available:



\- Screenshot.

\- Screen recording.

\- Browser console logs.

\- API request and response.

\- Automated test execution output.

\- Relevant application logs.



\## 8. Reproducibility



\- Always

\- Sometimes

\- Intermittent

\- Not reproducible



\## 9. Impact



Explain how the defect affects the user or application functionality.



\## 10. Retesting Details



| Field | Description |

|---|---|

| Fixed Build / Commit | |

| Retested By | |

| Retest Date | |

| Retest Result | Pass / Fail |

| Comments | |



\## 11. Defect Lifecycle



New → Assigned → In Progress → Fixed → Retest → Closed



If the issue persists after the fix, change the status to Reopened.



\---



\## Example Bug Report



The following is an illustrative example, not a confirmed defect in TranzHealthMate.



| Field | Example |

|---|---|

| Defect ID | BUG-EXAMPLE-001 |

| Defect Title | Dashboard does not restore saved theme after refresh |

| Module | Theme |

| Severity | Medium |

| Priority | P2 |

| Status | New |



\*\*Preconditions:\*\*

\- Application is open.

\- Light theme is available.



\*\*Steps to Reproduce:\*\*

1\. Open the application.

2\. Switch to dark theme.

3\. Refresh the browser.



\*\*Expected Result:\*\*



The application should restore the previously selected theme if theme persistence is supported.



\*\*Actual Result:\*\*



To be completed after reproducing the issue.



\*\*Evidence:\*\*



Attach screenshots or logs after verification.



\*\*Note:\*\* This example must not be treated as an actual application defect until it has been reproduced.



