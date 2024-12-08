import pytest
from main import app, collection  
from flask import json
import bcrypt

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

# Function to insert a user into the database
def add_user_to_db(email, name="Test User", password="TestPassword"):
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    user = {
        'name': name,
        'email': email,
        'password': hashed_password,
        'guildsIn': 0,
        'questMade': 0
    }
    collection.insert_one(user)

# Cleanup function to remove users created during testing
def cleanup_db(email):
    collection.delete_one({'email': email})

def test_create_user_success(client):
    """Test creating a new user successfully."""

    # Cleanup any existing user with the same email
    cleanup_db("testuser@example.com")

    # User data for the test
    new_user_data = {
        "name": "Test User",
        "email": "testuser@example.com",
        "password": "TestPassword123!" # Special Password
    }
    
    # Send a POST request to /create_contact
    response = client.post('/create_contact', data=json.dumps(new_user_data), content_type='application/json')

    # Check the response
    assert response.status_code == 201  # Check for success
    json_data = response.get_json()
    assert json_data['message'] == 'User created successfully'

    # Cleanup: remove user from the database
    cleanup_db("testuser@example.com")


def test_create_user_duplicate_email(client):
    """Test creating a user with an email that already exists."""
    # Add a user to the database
    add_user_to_db("existinguser@example.com")

    # Attempt to create a new user with the same email
    new_user_data = {
        "name": "Duplicate User",
        "email": "existinguser@example.com",
        "password": "AnotherPassword123!"
    }

    # Send a POST request to /create_contact
    response = client.post('/create_contact', data=json.dumps(new_user_data), content_type='application/json')

    # Check the response
    assert response.status_code == 400  # Expecting failure due to duplicate email
    json_data = response.get_json()
    assert json_data['message'] == 'Email already exists'

    # Cleanup: remove user from the database
    cleanup_db("existinguser@example.com")


def test_create_user_weak_password(client):
    """Test creating a user with a weak password."""
    weak_password_user = {
        "name": "Weak Password User",
        "email": "weakpassword@example.com",
        "password": "123"  # Intentionally weak password
    }

    response = client.post('/create_contact', data=json.dumps(weak_password_user), content_type='application/json')
    
    assert response.status_code == 400
    json_data = response.get_json()
    assert json_data['message'] == 'Password does not meet security requirements.'

def test_create_user_invalid_email(client):
    """Test creating a user with an invalid email."""
    invalid_email_user = {
        "name": "Invalid Email User",
        "email": "invalid-email",  # Missing '@' and domain part
        "password": "ValidPassword123!"
    }

    response = client.post('/create_contact', data=json.dumps(invalid_email_user), content_type='application/json')
    
    assert response.status_code == 400  # Expecting failure due to invalid email
    json_data = response.get_json()
    assert json_data['message'] == 'Invalid email format.'


def test_user_exists_and_password_correct(client):
    """Test user exists and the password is correct."""
    # First, add a test user to the database
    add_user_to_db("testuser@example.com", password="CorrectPassword123")
    
    # Data for the login attempt
    login_data = {
        "email": "testuser@example.com",
        "password": "CorrectPassword123"
    }
    
    # Send a POST request to /match_user
    response = client.post('/match_user', data=json.dumps(login_data), content_type='application/json')
    
    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data['message'] == 'User exists'
    
    # Cleanup: remove the test user from the database
    cleanup_db("testuser@example.com")


def test_user_exists_and_password_incorrect(client):
    """Test user exists but the password is incorrect."""
    # Add a test user to the database
    add_user_to_db("testuser@example.com", password="CorrectPassword123")
    
    # Data for the login attempt with incorrect password
    login_data = {
        "email": "testuser@example.com",
        "password": "WrongPassword123"
    }
    
    # Send a POST request to /match_user
    response = client.post('/match_user', data=json.dumps(login_data), content_type='application/json')
    
    assert response.status_code == 403
    json_data = response.get_json()
    assert json_data['message'] == 'Incorrect password'
    
    # Cleanup: remove the test user from the database
    cleanup_db("testuser@example.com")


def test_user_does_not_exist(client):
    """Test user does not exist."""
    # Data for the login attempt
    login_data = {
        "email": "nonexistentuser@example.com",
        "password": "SomePassword123"
    }
    
    # Send a POST request to /match_user
    response = client.post('/match_user', data=json.dumps(login_data), content_type='application/json')
    
    assert response.status_code == 404
    json_data = response.get_json()
    assert json_data['message'] == 'User does not exist'

