# TranzHealthMate

**AI-Powered Personal Health & Wellness Assistant** — an offline-first educational wellness companion and SDET portfolio project.

> This project is for general education and habit tracking. It is not a medical device and does not diagnose, treat, or prevent disease.

## MVP features
- Responsive dashboard with daily thought and wellness summary.
- Optional profile fields; partial profiles are supported.
- Educational BMI and protein reference estimates with limitations.
- Food explorer filtered by dietary preference and nutrient.
- Water, sleep, step and daily habit trackers.
- Offline question-answer guide backed by a small curated knowledge base.
- Local browser storage, JSON export, delete-data control and dark mode.
- Service worker for offline caching when served from localhost or HTTPS.
- Python calculation module, optional FastAPI demo API, Pytest and Playwright tests.
- GitHub Actions workflow for unit, API and browser tests.

## Run the application
The frontend has no build step. For a quick local preview, open `index.html` in a modern browser. For service-worker offline caching, run a local server:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Run the SDET test suite
Use Python 3.11+:

```bash
python -m venv .venv
# Windows PowerShell:
.venv\Scripts\Activate.ps1
# macOS/Linux:
# source .venv/bin/activate
pip install -r requirements-dev.txt
```

Install browser binaries:

```bash
playwright install chromium
```

Run unit tests:

```bash
pytest tests/unit -v
```

Run browser tests:

```bash
pytest tests/e2e -v
```

Run the optional local API in one terminal:

```bash
uvicorn api:app --reload
```

Then in another terminal:

```bash
pytest tests/api -v
```

Generate a report:

```bash
pytest tests/unit --html=reports/unit-report.html --self-contained-html
```

## Project structure

```text
TranzHealthMate/
├── index.html
├── styles.css
├── app.js
├── data/
│   ├── foods.js
│   └── thoughts.js
├── health_logic.py
├── api.py
├── tests/
│   ├── unit/
│   ├── api/
│   └── e2e/
├── .github/workflows/qa.yml
├── docs/
├── README.md
└── LICENSE
```

## Health and nutrition methodology
The sample dataset identifies foods that can contribute nutrients; it does not claim exact nutrient quantities. Actual content depends on serving size, preparation, fortification and product. The protein card uses a broad 0.8 g/kg/day adult reference only when weight is supplied. It is not suitable as an individual prescription for every age or medical circumstance. BMI is a screening measure and must not be interpreted as a diagnosis. Water needs vary widely; the app deliberately avoids prescribing a universal water target.

For a public release, add a sources-and-review page using authoritative references such as national dietary guidelines, WHO guidance, NIH Office of Dietary Supplements fact sheets and country-specific food composition databases. Record source, publication/version date and review date for each dataset entry.

## Privacy
The frontend stores data in browser local storage. This is convenient for an MVP but is not encrypted health-record storage. Do not enter highly sensitive medical details. The delete-data control clears the app's local storage key; browser-managed cache may remain until the browser clears it.

## Current limitations / roadmap
- [ ] Add exact nutrient quantities per serving with cited national food-composition sources.
- [ ] Add a reviewed age- and life-stage-aware recommendation model.
- [ ] Add allergy-aware filtering based on structured allergen tags (current MVP only does a simple name filter).
- [ ] Add favourite thoughts and category selection.
- [ ] Add weekly trends and CSV/PDF export.
- [ ] Add test data generation, requirement-to-test drafting and failure-summary assistant.
- [ ] Add validated self-healing locator demo (propose locator changes, require assertions/review before acceptance).
- [ ] Add Tauri desktop packaging and encrypted storage evaluation.
- [ ] Add Firefox and WebKit browser projects and accessibility checks.
- [ ] Add versioned, reviewed offline knowledge packs.

## License
MIT. See [LICENSE](LICENSE).
