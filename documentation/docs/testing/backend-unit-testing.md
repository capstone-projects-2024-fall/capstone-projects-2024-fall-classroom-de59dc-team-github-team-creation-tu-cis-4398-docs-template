---
sidebar_position: 1
---
# Backend unit tests  
### Overview
This section outlines the unit tests for backend functionalities to ensure API endpoints, services, and database operations are working as expected. The tests focus on the following areas:

1. **API Endpoints:** Validating requests and responses.
2. **Database Operations:** Ensuring CRUD operations execute correctly.
3. **Service Logic:** Verifying that services handle business logic as expected.
4. **Error Handling:** Testing that appropriate errors are returned for edge cases.

### General Testing Guidelines
* **Mocking External Services:** Use mocks for external API calls (e.g., Canvas API) to simulate responses.
* **Test Database:** Use an in-memory database (SQLite) to run tests without affecting production data.
* **Coverage Requirements:** Aim for 90%+ coverage of key backend functions.
* **Input Validation:** Verify that invalid inputs are properly handled with appropriate error responses.

### SignUp/Login Tests

**`test_signup()`**:
   - Tests the `/signup` endpoint by registering a new user with valid details.  
   - Verifies that a successful signup returns a **201** status code and the message `'User registered successfully'`.  
   - Checks for proper handling of duplicate signups by reattempting to register the same user, expecting a **400** status code and the message `'User already exists'`.

**`test_login()`**:
   - First, registers a user to enable testing of login functionality.
   - Validates that logging in with correct credentials returns a **200** status code and the message `'Login successful'`.
   - Ensures that incorrect login attempts (e.g., with an invalid password) return a **401** status code and the message `'Invalid credentials'`.


For each method, one or more test cases.

A test case consists of input parameter values and expected results.

All external classes should be stubbed using mock objects.
