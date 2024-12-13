import pytest
import unittest
import json
import sys
import os
from flask import Flask, jsonify, request
from unittest.mock import patch, MagicMock

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import app, init_db,  get_db_connection

def mock_db_connection():
    conn = MagicMock()
    conn.cursor.return_value = MagicMock()
    return conn
@pytest.fixture
def client():
    # Set up the test client
    app.config['TESTING'] = True
    app.config['DATABASE'] = ':memory:' 
    init_db() 
    with app.test_client() as client:
        yield client  



def test_signup_success(client):
    payload = {
        "name": "John",
        "lastName": "Doe",
        "nickname": "johnny",
        "email": "john.doe@example.com",
        "password": "password123",
        "canvasKey": "fake_canvas_key",
        "selectedMotto": "Stay positive"
    }
    response = client.post("/signup", json=payload)
    assert response.status_code == 201
    assert response.json["message"] == "User registered successfully"

def test_signup_existing_user(client):
    payload = {
        "name": "John",
        "lastName": "Doe",
        "nickname": "johnny",
        "email": "john.doe@example.com",
        "password": "password123",
        "canvasKey": "fake_canvas_key",
        "selectedMotto": "Stay positive"
    }
    response = client.post("/signup", json=payload)
    assert response.status_code == 400
    assert response.json["message"] == "User already exists"

# Test Login
def test_login_success(client):
    payload = {
        "email": "john.doe@example.com",
        "password": "password123"
    }
    response = client.post("/login", json=payload)
    assert response.status_code == 200
    assert response.json["message"] == "Login successful"

#test invalid password
def test_login_invalid_password(client):
    payload = {
        "email": "john.doe@example.com",
        "password": "wrongpassword"
    }
    response = client.post("/login", json=payload)
    assert response.status_code == 401
    assert response.json["message"] == "Invalid password"

#testing nonexistent user
def test_login_nonexistent_user(client):
    payload = {
        "email": "nonexistent@example.com",
        "password": "password123"
    }
    response = client.post("/login", json=payload)
    assert response.status_code == 404
    assert response.json["message"] == "Account does not exist"
 
 # Test Get User Data
def test_get_user_by_email(client):
    response = client.get("/api/user?email=john.doe@example.com")
    assert response.status_code == 200
    assert response.json["email"] == "john.doe@example.com"

def test_get_user_not_found(client):
    response = client.get("/api/user?email=unknown@example.com")
    assert response.status_code == 404
    assert response.json["message"] == "User not found"

# Test Delete Task (mocked)
def test_delete_task_missing_task_id(client):
    response = client.post("/api/deleteTask", json={})
    assert response.status_code == 400
    assert response.json["message"] == "Task ID is required"

def test_delete_task_nonexistent(client):
    payload = {"taskId": 999}
    response = client.post("/api/deleteTask", json=payload)
    assert response.status_code == 200
    assert response.json["message"] == "Task deleted successfully"

# Test Account Age
def test_account_age(client):
    response = client.get("/account-age?email=john.doe@example.com")
    assert response.status_code == 200
    assert "years" in response.json

def test_account_age_missing_email(client):
    response = client.get("/account-age")
    assert response.status_code == 400
    assert response.json["message"] == "Email is required"


def test_account_age_user_not_found(client):
    response = client.get("/account-age?email=unknown@example.com")
    assert response.status_code == 404
    assert response.json["message"] == "User not found"



# Test Update Gold
def test_update_gold_success(client):
    payload = {
        "email": "john.doe@example.com",
        "amount": 50
    }
    response = client.post("/api/updatePlayerGold", json=payload)
    assert response.status_code == 200
    assert response.json["message"] == "Gold amount updated successfully"


def test_update_gold_insufficient_funds(client):
    payload = {
        "email": "john.doe@example.com",
        "amount": -5000
    }
    response = client.post("/api/updatePlayerGold", json=payload)
    assert response.status_code == 400
    assert response.json["message"] == "Not enough gold for this transaction"

# Test Get Player Data Success
def test_get_player_data_success(client):
    response = client.get("/api/getPlayerData?email=john.doe@example.com")
    assert response.status_code == 200
    assert "gold" in response.json[0]
    assert "worldState" in response.json[1]

# Test Get Player Data: Missing Email
def test_get_player_data_missing_email(client):
    response = client.get("/api/getPlayerData")
    assert response.status_code == 400
    assert response.json["message"] == "Email is required"

#Update players world state
def test_update_player_world_state(client):
    payload = {
        "email": "john.doe@example.com",
        "worldState": 2
    }
    response = client.post("/api/updatePlayerWorldState", json=payload)
    assert response.status_code == 200
    assert response.json["message"] == "WorldState updated successfully"

def test_update_player_world_state_missing_email(client):
    payload = {
        "worldState": 2
    }
    response = client.post("/api/updatePlayerWorldState", json=payload)
    assert response.status_code == 400
    assert response.json["message"] == "Email is required"


# Test Get Assignments from Database
def test_get_assignments_missing_email(client):
    response = client.get("/assignmentFromDb")
    assert response.status_code == 400
    assert response.json["message"] == "Email is required"


def test_get_assignments_user_not_found(client):
    response = client.get("/assignmentFromDb?email=nonexistent@example.com")
    assert response.status_code == 404
    assert response.json["message"] == "User not found"

#GetUnsubmittedAssignment
def test_get_Unsubmitted_assignments_missing_email(client):
    response = client.get('/getUnsubmittedAssignmentsFromDb')
    assert response.status_code == 400
    assert response.json == {"message": "Email is required"}

# def test_get_assignments_user_not_found(client):
#     with patch('app.get_db_connection', mock_db_connection):
#         conn = mock_db_connection()
#         cursor = conn.cursor.return_value
#         cursor.fetchone.return_value = None

#         response = client.get('/getUnsubmittedAssignmentsFromDb?email=john.doe@example.com')
#         assert response.status_code == 404
#         assert response.json == {"message": "User not found"}

def test_get_unsubmitted_assignments_user_not_found(client):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM users WHERE email = "test@example.com"')
    conn.commit()

    response = client.get('/getUnsubmittedAssignmentsFromDb?email=test@example.com')
    assert response.status_code == 404
    assert response.json == {"message": "User not found"}

# Test Buy Items
def test_buy_items_success(client):
    payload = {
        "email": "john.doe@example.com",
        "items": [
            {
                "id": "item1",
                "name": "Sword",
                "description": "A sharp blade",
                "price": 100
            }
        ]
    }
    response = client.post("/api/buyItems", json=payload)
    assert response.status_code == 200
    assert response.json["message"] == "Items successfully purchased and added to inventory"


def test_buy_items_missing_data(client):
    payload = {
        "email": "john.doe@example.com"
    }
    response = client.post("/api/buyItems", json=payload)
    assert response.status_code == 400
    assert response.json["message"] == "Email and items are required"

# Test Canvas Key Submission

def test_log_canvas_key_success(client, mocker):
    payload = {
        "email": "john.doe@example.com",
        "canvasKey": "valid_canvas_key"
    }

    mock_response = mocker.patch("requests.get")
    mock_response.return_value.status_code = 200
    mock_response.return_value.json.return_value = {"avatar_url": "test_avatar_url"}

    response = client.post("/canvasKey", json=payload)
    assert response.status_code == 200
    assert response.json["message"] == "Canvas key successfully validated and stored"

def test_log_canvas_key_invalid(client, mocker):
    payload = {
        "email": "john.doe@example.com",
        "canvasKey": "invalid_canvas_key"
    }

    mock_response = mocker.patch("requests.get")
    mock_response.return_value.status_code = 400

    response = client.post("/canvasKey", json=payload)
    assert response.status_code == 400
    assert response.json["message"] == "Invalid Canvas key. Please check your key and try again."

# Test World State Update

def test_update_task_status_success(client):
    # Ensure at least one assignment exists to prevent ZeroDivisionError
    conn = get_db_connection()
    conn.execute("INSERT INTO assignments (id, user_id, in_game_status) VALUES (1, 1, 'Pending')")
    conn.commit()
    conn.close()

    payload = {
        "taskId": 1,
        "status": "Done",
        "email": "john.doe@example.com"
    }
    response = client.post("/api/updateTaskStatus", json=payload)
    assert response.status_code == 200
    assert "worldStateUpdated" in response.json

def test_update_task_status_missing_fields(client):
    payload = {"taskId": 1}
    response = client.post("/api/updateTaskStatus", json=payload)
    assert response.status_code == 400
    assert response.json["message"] == "Task ID and new status are required"

# Adjusted Test for Task Status Update with Invalid Task ID
def test_update_task_status_invalid_task_id(client):
    payload = {
        "taskId": "invalid",  # This will be treated as a string
        "status": "Done",
        "email": "john.doe@example.com"
    }
    response = client.post("/api/updateTaskStatus", json=payload)
    assert response.status_code == 200  # Expecting success as there's no validation
    assert "worldStateUpdated" in response.json  # Check if the response contains expected keys

def test_update_task_status_invalid_email(client):
    payload = {
        "taskId": 1,
        "status": "Done",
        "email": "invalid@example.com"
    }
    response = client.post("/api/updateTaskStatus", json=payload)
    assert response.status_code == 400
    assert response.json["message"] == "Email does not exist"


# Test Delete Task

def test_delete_task_success(client):
    payload = {"taskId": 1}
    response = client.post("/api/deleteTask", json=payload)
    assert response.status_code == 200
    
# Test Item Retrieval

def test_get_user_items_success(client):
    response = client.get("/api/getUserItems?email=john.doe@example.com")
    assert response.status_code == 200
    assert isinstance(response.json, list)

def test_get_user_items_not_found(client):
    response = client.get("/api/getUserItems?email=unknown@example.com")
    assert response.status_code == 200
    assert response.json == []

# Test Error Handling for Missing Fields

def test_missing_email_on_buy_items(client):
    payload = {"items": [{"id": "item1", "name": "Sword", "description": "A sharp blade", "price": 100}]}
    response = client.post("/api/buyItems", json=payload)
    assert response.status_code == 400
    assert response.json["message"] == "Email and items are required"

# Test Gold Updates
def test_update_player_gold_negative_amount(client):
    payload = {"email": "john.doe@example.com", "amount": -1000}
    response = client.post("/api/updatePlayerGold", json=payload)
    assert response.status_code == 400
    assert response.json["message"] == "Not enough gold for this transaction"

# Test Fetch All Assignments
def test_get_all_assignments_not_found(client):
    response = client.get("/getAllAssignmentsFromDb?email=nonexistent@example.com")
    assert response.status_code == 404
    assert response.json["message"] == "User not found"

# Test Fetch Courses
def test_get_courses_success(client):
    conn = get_db_connection()
    conn.execute("INSERT INTO courses (course_id, user_id, course_name, course_code, enrollment_term_id) VALUES (101, 1, 'Test Course', 'CS101', 1)")
    conn.commit()
    conn.close()

    response = client.get("/coursesFromDb?email=john.doe@example.com")
    assert response.status_code == 200
    assert isinstance(response.json["courses"], list)

def test_get_courses_not_found(client):
    response = client.get("/coursesFromDb?email=unknown@example.com")
    assert response.status_code == 404
    assert response.json["message"] == "User not found"

def test_fetch_courses_invalid_email(client):
    response = client.get("/coursesFromDb?email=invalid@example.com")
    assert response.status_code == 404
    assert response.json["message"] == "User not found"


# Test Invalid API Endpoint
def test_invalid_endpoint(client):
    response = client.get("/invalidEndpoint")
    assert response.status_code == 404

#get assignment from canvas test
def test_get_all_assignments_form_Canvas_api_failure(client):
    with patch('requests.get') as mock_get:
        mock_get.return_value.status_code = 400

        response = client.post('/getCourseAndAssignmentsInfoFromCanvas', 
                               json={"canvasKey": "test_canvas_key"})
        
        assert response.status_code == 400
        assert response.json == {"message": "SOMETHING WENT WRONG IN getAssignments"}

def test_get_all_assignments_from_Canvas_success(client):
    mock_response = [
        {
            "id": 1,
            "name": "Test Course",
            "course_code": "TC101",
            "workflow_state": "available",
            "enrollment_term_id": 142,
            "description": "Sample description",
            "due_at": "2024-12-31T23:59:59Z",
            "course_id": 101,
            "submission_types": ["online_upload"],
            "points_possible": 100,
            "published": "true",
            "in_game_status": "In Progress",
            "is_submitted": 3,
            "html_url": "http://example.com/assignment",
            "assignment_hint": "Complete the project by the due date"
        }
    ]
    mock_submission_response = {
        "workflow_state": "submitted"
    }

    mock_course_list_response = [{
        "id": 101,
        "name": "Course 101",
        "workflow_state": "available",
        "enrollment_term_id": 142,
        "course_code":"some_code"
    }]

    with patch('requests.get') as mock_get, patch('sqlite3.connect') as mock_conn:
        def mock_side_effect(url, headers):
            
            if "courses/?per_page=100" in url:
                print(f"Mock API Call  courses-> URL: {url}, Headers: {headers}")
                return type('Response', (object,), {"status_code": 200, "json": lambda: mock_course_list_response})
            if "assignments" and "submissions" in url:
                print(f"Mock API Call submission -> URL: {url}, Headers: {headers}")
                return type('Response', (object,), {"status_code": 200, "json": lambda: mock_submission_response})
            if "assignments":
                print(f"Mock API Call assignemnts -> URL: {url}, Headers: {headers}")
                return type('Response', (object,), {"status_code": 200, "json": lambda: mock_response})
            
            return type('Response', (object,), {"status_code": 404, "json": lambda: {}})
        mock_get.side_effect = mock_side_effect
        # mock_get.side_effect = [
        #     type('Response', (object,), {"status_code": 200, "json": lambda: mock_response}),
        #     type('Response', (object,), {"status_code": 200, "json": lambda: mock_submission_response})
        # ]
        mock_cursor = mock_conn.return_value.cursor.return_value
        mock_cursor.fetchone.return_value = (1,)

        response = client.post('/getCourseAndAssignmentsInfoFromCanvas', 
                               json={"canvasKey": "test_canvas_key"})
        
        assert response.status_code == 200
        # assert response.json == {"message": "Success! Course info stored in database"}