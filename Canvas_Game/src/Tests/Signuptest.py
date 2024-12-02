import pytest
from app import app, init_db
import sqlite3
import json
import os

# Change the working directory to the backend folder
os.chdir(os.path.join(os.path.dirname(__file__), '..', 'Canvas_Game\src\app.py'))

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['DATABASE'] = 'test_users.db'  # Use a separate test database
    with app.test_client() as client:
        with app.app_context():
            init_db()
        yield client
    # Clean up the test database after tests
    os.remove('test_users.db')

def test_signup_success(client):
    response = client.post('/signup', json={
        'name': 'John',
        'lastName': 'Doe',
        'email': 'john.doe@example.com',
        'password': 'securepassword123'
    })
    assert response.status_code == 201
    assert b'User registered successfully' in response.data

def test_signup_duplicate_email(client):
    # First signup
    client.post('/signup', json={
        'name': 'John',
        'lastName': 'Doe',
        'email': 'john.doe@example.com',
        'password': 'securepassword123'
    })

    # Attempt to signup with the same email
    response = client.post('/signup', json={
        'name': 'Jane',
        'lastName': 'Doe',
        'email': 'john.doe@example.com',
        'password': 'anotherpassword123'
    })
    assert response.status_code == 400
    assert b'User already exists' in response.data

def test_signup_missing_fields(client):
    response = client.post('/signup', json={
        'name': 'John',
        'lastName': 'Doe'
        # Missing email and password
    })
    assert response.status_code == 400
    assert b'Missing required fields' in response.data

def test_signup_invalid_email(client):
    response = client.post('/signup', json={
        'name': 'John',
        'lastName': 'Doe',
        'email': 'not_an_email',
        'password': 'securepassword123'
    })
    assert response.status_code == 400
    assert b'Invalid email format' in response.data

def test_login_success(client):
    # First, sign up a user
    client.post('/signup', json={
        'name': 'John',
        'lastName': 'Doe',
        'email': 'john.doe@example.com',
        'password': 'securepassword123'
    })

    # Then, try to login
    response = client.post('/login', json={
        'email': 'john.doe@example.com',
        'password': 'securepassword123'
    })
    assert response.status_code == 200
    assert b'Login successful' in response.data

def test_login_invalid_credentials(client):
    response = client.post('/login', json={
        'email': 'nonexistent@example.com',
        'password': 'wrongpassword'
    })
    assert response.status_code == 401
    assert b'Invalid credentials' in response.data