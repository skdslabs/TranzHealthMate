import re
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]


def open_profile(page):
    page.get_by_role("button", name=re.compile("My profile")).click()

    # Wait for the actual profile section, not the duplicate page heading.
    profile_view = page.locator("#view-profile")
    profile_view.wait_for(state="visible")

    return profile_view


def test_dashboard_loads_and_navigates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto((ROOT / "index.html").as_uri())

        page.get_by_role("heading", name="Your wellness overview").wait_for()

        profile_view = open_profile(page)

        profile_view.get_by_role(
            "heading",
            name="Personal wellness profile"
        ).wait_for(state="visible")

        browser.close()


def test_profile_persists_in_local_storage():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto((ROOT / "index.html").as_uri())

        profile_view = open_profile(page)

        profile_view.locator("#age").fill("34")
        profile_view.locator("#height").fill("172")
        profile_view.locator("#weight").fill("70")

        profile_view.locator(
            "#profile-form button[type=submit]"
        ).click()

        saved = page.evaluate(
            "localStorage.getItem('tranzhealthmate.v1')"
        )

        assert saved is not None
        assert '"age":34' in saved

        browser.close()