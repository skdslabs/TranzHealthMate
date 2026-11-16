import pytest
from health_logic import bmi, protein_reference, profile_completeness

def test_bmi_known_value():
    assert round(bmi(170, 68), 1) == 23.5

@pytest.mark.parametrize("height,weight", [(None, 68), (170, None), (None, None)])
def test_bmi_incomplete_inputs_return_none(height, weight):
    assert bmi(height, weight) is None

@pytest.mark.parametrize("height,weight", [(49, 60), (251, 60), (170, 9), (170, 501)])
def test_bmi_rejects_out_of_range_values(height, weight):
    with pytest.raises(ValueError):
        bmi(height, weight)

def test_protein_reference():
    assert protein_reference(70) == 56

def test_protein_missing_weight():
    assert protein_reference(None) is None

def test_profile_completeness_partial():
    assert profile_completeness({"age": 30, "diet": "Vegan"}) == 33
