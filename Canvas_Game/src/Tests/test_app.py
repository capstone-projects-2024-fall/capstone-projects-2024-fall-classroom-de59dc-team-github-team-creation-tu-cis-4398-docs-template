import pytest
import json
from app import app, init_db

@pytest.fixture
def client():
    # Set up the test client
    app.config['TESTING'] = True
    app.config['DATABASE'] = ':memory:' 
    init_db() 
    with app.test_client() as client:
        yield client  

def test_signup(client):
    # Test user signup
    response = client.post('/signup', json={
        'name': 'John',
        'lastName': 'Doe',
        'email': 'alex.doe@example.com',
        'password': '123'
    })
    assert response.status_code == 201


 