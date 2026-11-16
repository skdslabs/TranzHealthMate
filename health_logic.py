"""Pure wellness calculations for unit testing. Educational estimates only."""
def bmi(height_cm, weight_kg):
    if height_cm is None or weight_kg is None:
        return None
    if not (50 <= float(height_cm) <= 250):
        raise ValueError("height_cm must be between 50 and 250")
    if not (10 <= float(weight_kg) <= 500):
        raise ValueError("weight_kg must be between 10 and 500")
    return float(weight_kg) / (float(height_cm) / 100) ** 2

def protein_reference(weight_kg):
    """General adult reference estimate of 0.8 g/kg/day; not individual medical advice."""
    if weight_kg is None:
        return None
    if not (10 <= float(weight_kg) <= 500):
        raise ValueError("weight_kg must be between 10 and 500")
    return round(float(weight_kg) * 0.8)

def profile_completeness(profile):
    fields = ("age", "height", "weight", "country", "diet", "activity")
    return round(sum(bool(profile.get(k)) for k in fields) / len(fields) * 100)
