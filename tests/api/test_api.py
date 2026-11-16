from fastapi.testclient import TestClient
from api import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert response.json()["service"] == "tranzhealthmate-local-api"


def test_metrics_complete_profile():
    response = client.post(
        "/metrics",
        json={"height_cm": 170, "weight_kg": 68}
    )

    assert response.status_code == 200
    assert response.json()["bmi"] == 23.5
    assert response.json()["protein_reference_g"] == 54


def test_metrics_incomplete_profile():
    response = client.post(
        "/metrics",
        json={"weight_kg": 70}
    )

    assert response.status_code == 200
    assert response.json()["bmi"] is None
    assert response.json()["protein_reference_g"] == 56


def test_metrics_without_measurements():
    response = client.post("/metrics", json={})

    assert response.status_code == 200
    assert response.json()["bmi"] is None
    assert response.json()["protein_reference_g"] is None
    assert "message" in response.json()


def test_metrics_height_only():
    response = client.post(
        "/metrics",
        json={"height_cm": 170}
    )

    assert response.status_code == 200
    assert response.json()["bmi"] is None
    assert response.json()["protein_reference_g"] is None


def test_metrics_invalid_height():
    response = client.post(
        "/metrics",
        json={"height_cm": 300, "weight_kg": 70}
    )

    assert response.status_code == 422


def test_metrics_invalid_weight():
    response = client.post(
        "/metrics",
        json={"height_cm": 170, "weight_kg": 501}
    )

    assert response.status_code == 422


def test_metrics_invalid_input_type():
    response = client.post(
        "/metrics",
        json={"height_cm": "not-a-number", "weight_kg": 70}
    )

    assert response.status_code == 422