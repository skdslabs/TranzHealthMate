# Architecture

## Runtime
The browser app is a static client application. `index.html` provides semantic page structure, `styles.css` provides responsive styling, `app.js` owns view navigation, state, calculations and UI rendering, and `data/` contains local educational datasets. There are no remote runtime dependencies.

## Data flow
1. User edits an optional profile or daily tracker.
2. Input validation runs in the browser.
3. State is saved under one versioned localStorage key.
4. Dashboard values are derived from saved state.
5. Food and assistant responses are read from local static datasets.

## Test architecture
- `health_logic.py`: pure calculation functions for unit tests.
- `api.py`: optional local FastAPI wrapper for demonstrating API automation.
- `tests/unit`: calculation and validation tests.
- `tests/api`: Python Requests tests against the optional local API.
- `tests/e2e`: Playwright browser tests for navigation, persistence and offline loading.
- `.github/workflows/qa.yml`: CI execution and report artifact upload.

## Desktop direction
Tauri can host the static frontend and replace browser storage with a local database layer. Keep health logic and datasets versioned and testable independently of the UI.
