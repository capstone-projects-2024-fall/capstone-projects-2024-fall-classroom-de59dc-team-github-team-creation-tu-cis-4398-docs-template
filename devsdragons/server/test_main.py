import pytest
from main import app, collection  
from flask import json

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

# Function to insert a user into the database
def add_user_to_db(email, name="Test User", password="TestPassword"):
    user = {
        'name': name,
        'email': email,
        'password': password,
        'guildsIn': 0,
        'questMade': 0
    }
    collection.insert_one(user)

# Cleanup function to remove users created during testing
def cleanup_db(email):
    collection.delete_one({'email': email})

def test_create_user_success(client):
    """Test creating a new user successfully."""
    # User data for the test
    new_user_data = {
        "name": "Test User",
        "email": "testuser@example.com",
        "password": "TestPassword123"
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
        "password": "AnotherPassword123"
    }

    # Send a POST request to /create_contact
    response = client.post('/create_contact', data=json.dumps(new_user_data), content_type='application/json')

    # Check the response
    assert response.status_code == 400  # Expecting failure due to duplicate email
    json_data = response.get_json()
    assert json_data['message'] == 'Email already exists'

    # Cleanup: remove user from the database
    cleanup_db("existinguser@example.com")
