import pytest
import requests

BASE_URL = "http://localhost:5000"

# Utility function to reset the database for consistent tests
def reset_db():
    requests.post(f"{BASE_URL}/reset-db")

# @pytest.fixture(scope="module")
# def setup_module():
#     reset_db()

# Test user registration

def test_signup_success():
    payload = {
        "name": "Test",
        "lastName": "User",
        "nickname": "Testy",
        "email": "testuser@example.com",
        "password": "securepass",
        "canvasKey": "testcanvaskey",
        "selectedMotto": "Learning is fun!"
    }
    response = requests.post(f"{BASE_URL}/signup", json=payload)
    assert response.status_code == 201
    assert response.json()["message"] == "User registered successfully"

# def test_signup_duplicate():
#     payload = {
#         "name": "Test",
#         "lastName": "User",
#         "nickname": "Testy",
#         "email": "testuser@example.com",
#         "password": "securepass",
#         "canvasKey": "testcanvaskey",
#         "selectedMotto": "Learning is fun!"
#     }
#     response = requests.post(f"{BASE_URL}/signup", json=payload) pytest integration_tests_api.py --html=report.html --self-contained-html
#     assert response.status_code == 400
#     assert response.json()["message"] == "User already exists"

# Test login

def test_login_success():
    payload = {
        "email": "testuser@example.com",
        "password": "securepass"
    }
    response = requests.post(f"{BASE_URL}/login", json=payload)
    assert response.status_code == 200
    assert response.json()["message"] == "Login successful"

def test_login_invalid_password():
    payload = {
        "email": "testuser@example.com",
        "password": "wrongpass"
    }
    response = requests.post(f"{BASE_URL}/login", json=payload)
    assert response.status_code == 401
    assert response.json()["message"] == "Invalid password"

# Test account age

def test_account_age():
    params = {"email": "testuser@example.com"}
    response = requests.get(f"{BASE_URL}/account-age", params=params)
    assert response.status_code == 200
    assert "years" in response.json()

# Test fetching user data

def test_get_user_by_email():
    params = {"email": "testuser@example.com"}
    response = requests.get(f"{BASE_URL}/api/user", params=params)
    assert response.status_code == 200
    assert response.json()["email"] == "testuser@example.com"

# Test assignments

def test_get_assignments_empty():
    params = {"email": "testuser@example.com"}
    response = requests.get(f"{BASE_URL}/getUnsubmittedAssignmentsFromDb", params=params)
    assert response.status_code == 404
    assert response.json()["message"] == "No assignments found for the user"

# Test item purchase and retrieval

def test_buy_items():
    payload = {
        "email": "testuser@example.com",
        "items": [
            {"id": "item001", "name": "Sword", "description": "A sharp blade.", "price": 50},
            {"id": "item002", "name": "Shield", "description": "Protects against attacks.", "price": 75}
        ]
    }
    response = requests.post(f"{BASE_URL}/api/buyItems", json=payload)
    assert response.status_code == 200
    assert response.json()["message"] == "Items successfully purchased and added to inventory"

def test_get_user_items():
    params = {"email": "testuser@example.com"}
    response = requests.get(f"{BASE_URL}/api/getUserItems", params=params)
    assert response.status_code == 200
    assert len(response.json()) == 2

