# Sample Test Cases

| ID | Scenario | Steps / data | Expected result |
|---|---|---|---|
| THM-001 | Empty profile | Open app without entering profile | Dashboard loads; missing metrics show a prompt, not an error |
| THM-002 | Valid BMI | Height 170 cm, weight 68 kg | BMI estimate displays about 23.5 |
| THM-003 | Missing height | Enter weight only | BMI remains unavailable; protein reference may display |
| THM-004 | Height below range | Enter 49 cm | Validation message; profile is not saved |
| THM-005 | Height above range | Enter 251 cm | Validation message; profile is not saved |
| THM-006 | Water tracker | Add 250 ml | Dashboard and tracker show 250 ml |
| THM-007 | Sleep lower boundary | Reduce sleep below zero | Value remains zero |
| THM-008 | Dietary filter | Select Vegan | Food list excludes foods tagged only for vegetarian/egg/meat diets |
| THM-009 | Offline assistant | Ask about fibre with no network | Local knowledge response is displayed |
| THM-010 | Persistence | Save profile and reload | Saved profile remains available |
| THM-011 | Export | Click Export data | JSON file download starts |
| THM-012 | Delete | Confirm delete | App profile and tracker data reset |
| THM-013 | Dark mode | Toggle theme | Dark theme is applied and preference persists |
| THM-014 | Invalid API height | POST height 300 | API returns HTTP 422 |
