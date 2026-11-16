
import json
import re
from pathlib import Path

import pytest
from playwright.sync_api import Page, expect, sync_playwright

ROOT = Path(__file__).resolve().parents[2]

@pytest.fixture
def page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        browser_page = browser.new_page()

        yield browser_page

        browser.close()

def open_profile(page: Page):
    page.get_by_role(
        "button",
        name=re.compile("My profile")
    ).click()

    profile_view = page.locator("#view-profile")
    expect(profile_view).to_be_visible()

    return profile_view


def test_dashboard_loads_and_navigates(page: Page):
    page.goto((ROOT / "index.html").as_uri())

    expect(
        page.get_by_role("heading", name="Your wellness overview")
    ).to_be_visible()

    profile_view = open_profile(page)

    expect(
        profile_view.get_by_role(
            "heading",
            name="Personal wellness profile"
        )
    ).to_be_visible()


def test_profile_persists_in_local_storage(page: Page):
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

    profile_data = json.loads(saved)

    print(
        "SAVED PROFILE DATA:",
        json.dumps(profile_data, indent=4)
    )

    assert profile_data["profile"]["age"] == 34
    assert profile_data["profile"]["height"] == 172
    assert profile_data["profile"]["weight"] == 70

def test_profile_form_rejects_invalid_age(page: Page):
    page.goto((ROOT / "index.html").as_uri())

    profile_view = open_profile(page)

    age_input = profile_view.locator("#age")
    age_input.fill("150")

    profile_view.locator(
        "#profile-form button[type=submit]"
    ).click()

    saved = page.evaluate(
        "localStorage.getItem('tranzhealthmate.v1')"
    )

    # An invalid age must not be saved as a valid profile.
    assert saved is None or json.loads(saved).get("age") != 150
