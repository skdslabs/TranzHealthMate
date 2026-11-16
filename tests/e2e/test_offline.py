from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]

def test_core_app_loads_without_network_requests():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        failed = []
        page.on("requestfailed", lambda request: failed.append(request.url))
        page.goto((ROOT / "index.html").as_uri())
        assert page.locator("#page-title").inner_text() == "Your wellness overview"
        assert not failed
        browser.close()
