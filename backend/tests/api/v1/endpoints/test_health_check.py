from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check_success():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    
    data = response.json()
    assert data["message"] == "System is healthy"
    assert data["data"]["status"] == "healthy"

def test_health_check_error():
    response = client.get("/api/v1/health/error")
    assert response.status_code == 500
    
    data = response.json()
    assert data["message"] == "System is experiencing issues"
    assert data["errors"] == "System is experiencing issues" 