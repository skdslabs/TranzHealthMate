import requests
import pytest

BASE = "http://127.0.0.1:8000"

@pytest.fixture(scope="session", autouse=True)
def api_available():
    try:
        requests.get(f"{BASE}/health", timeout=2).raise_for_status()
    except requests.RequestException:
        pytest.skip("Start the optional API with: uvicorn api:app --reload")

def test_health_endpoint():
    response = requests.get(f"{BASE}/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_metrics_complete_profile():
    response = requests.post(f"{BASE}/metrics", json={"height_cm": 170, "weight_kg": 68})
    assert response.status_code == 200
    assert response.json()["bmi"] == 23.5
    assert response.json()["protein_reference_g"] == 54

def test_metrics_incomplete_profile():
    response = requests.post(f"{BASE}/metrics", json={"weight_kg": 70})
    assert response.status_code == 200
    assert response.json()["bmi"] is None
    assert response.json()["protein_reference_g"] == 56

def test_metrics_invalid_height():
    response = requests.post(f"{BASE}/metrics", json={"height_cm": 300, "weight_kg": 70})
    assert response.status_code == 422
