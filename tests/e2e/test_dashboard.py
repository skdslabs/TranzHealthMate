import re
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]

def test_dashboard_loads_and_navigates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto((ROOT / "index.html").as_uri())
        page.get_by_role("heading", name="Your wellness overview").wait_for()
        page.get_by_role("button", name=re.compile("My profile")).click()
        page.get_by_role("heading", name="Personal wellness profile").wait_for()
        browser.close()

def test_profile_persists_in_local_storage():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto((ROOT / "index.html").as_uri())
        page.locator("#age").fill("34")
        page.locator("#height").fill("172")
        page.locator("#weight").fill("70")
        page.locator("#profile-form button[type=submit]").click()
        saved = page.evaluate("localStorage.getItem('tranzhealthmate.v1')")
        assert '"age":34' in saved
        browser.close()
