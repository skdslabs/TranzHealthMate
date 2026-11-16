"""Optional local API used to demonstrate Python Requests API testing."""
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from health_logic import bmi, protein_reference

app = FastAPI(title="TranzHealthMate Local Wellness API", version="0.1.0")

class Metrics(BaseModel):
    height_cm: float | None = Field(default=None)
    weight_kg: float | None = Field(default=None)

@app.get("/health")
def health():
    return {"status": "ok", "service": "tranzhealthmate-local-api"}

@app.post("/metrics")
def calculate_metrics(payload: Metrics):
    if payload.height_cm is None and payload.weight_kg is None:
        return {"bmi": None, "protein_reference_g": None, "message": "Add height and/or weight for available estimates."}
    try:
        bmi_value = bmi(payload.height_cm, payload.weight_kg) if payload.height_cm is not None and payload.weight_kg is not None else None
        protein = protein_reference(payload.weight_kg) if payload.weight_kg is not None else None
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    return {"bmi": round(bmi_value, 1) if bmi_value is not None else None, "protein_reference_g": protein}
