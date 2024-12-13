---
sidebar_position: 1
---
# Back End Unit Tests  
### Overview
This section outlines the unit tests for Back End functionalities to ensure API endpoints, services, and database operations are working as expected. The tests focus on the following areas:

1. **API Endpoints:** Validating requests and responses.
2. **Database Operations:** Ensuring CRUD operations execute correctly.
3. **Service Logic:** Verifying that services handle business logic as expected.
4. **Error Handling:** Testing that appropriate errors are returned for edge cases.

### Setup and Configuration
* **Testing Frameworks:** `pytest`, `unittest`
* **Database:** SQLite in-memory (`:memory:`)
* **Mocking Tools:** `unittest.mock`, `pytest-mock

### General Testing Guidelines
* **Mocking External Services:** Use mocks for external API calls (e.g., Canvas API) to simulate responses.
* **Test Database:** Use an in-memory database (SQLite) to run tests without affecting production data.
* **Coverage Requirements:** Aim for 85%+ coverage of key Back End functions.
* **Input Validation:** Verify that invalid inputs are properly handled with appropriate error responses.

## Test Coverage

<details>
  <summary>Covarage Report</summary>

  [View Coverage Report PDF](Coverage-report.pdf)

</details>

<details>
  <summary>Test Covarage</summary>

  ![Alt Text](backend-test-coverage.png)

</details>
## Test Categories

### 1. **User Management Tests**
#### **Signup Tests:**
- `test_signup_success`: Verifies successful user registration.
- `test_signup_existing_user`: Tests registration with an already existing user.

#### **Login Tests:**
- `test_login_success`: Verifies successful login.
- `test_login_invalid_password`: Tests login with incorrect password.
- `test_login_nonexistent_user`: Tests login for a non-existent user.

#### **User Data Retrieval:**
- `test_get_user_by_email`: Retrieves user details by email.
- `test_get_user_not_found`: Checks response when the user is not found.

---

### 2. **Task Management Tests**
#### **Task Deletion:**
- `test_delete_task_missing_task_id`: Verifies error when task ID is missing.
- `test_delete_task_nonexistent`: Simulates deleting a non-existent task.

#### **Task Status Update:**
- `test_update_task_status_success`: Updates task status successfully.
- `test_update_task_status_missing_fields`: Tests missing fields for task updates.
- `test_update_task_status_invalid_task_id`: Simulates invalid task ID input.
- `test_update_task_status_invalid_email`: Tests update with invalid email.

---

### 3. **Player Management Tests**
#### **Gold Management:**
- `test_update_gold_success`: Successfully updates player gold.
- `test_update_gold_insufficient_funds`: Tests insufficient funds handling.

#### **Player Data Retrieval:**
- `test_get_player_data_success`: Retrieves player data successfully.
- `test_get_player_data_missing_email`: Verifies missing email error.

#### **World State Management:**
- `test_update_player_world_state`: Updates player world state.
- `test_update_player_world_state_missing_email`: Tests missing email for world state update.

---

### 4. **Assignment Management Tests**
#### **Assignment Retrieval:**
- `test_get_assignments_missing_email`: Checks missing email handling.
- `test_get_assignments_user_not_found`: Tests response for nonexistent user.

#### **Unsubmitted Assignments:**
- `test_get_Unsubmitted_assignments_missing_email`: Checks missing email error.
- `test_get_unsubmitted_assignments_user_not_found`: Simulates a user not found scenario.

---

### 5. **Item Management Tests**
#### **Buying Items:**
- `test_buy_items_success`: Tests successful item purchase.
- `test_buy_items_missing_data`: Verifies missing purchase data.

#### **Retrieving Items:**
- `test_get_user_items_success`: Retrieves items successfully.
- `test_get_user_items_not_found`: Tests no items found scenario.

---

### 6. **Canvas Integration Tests**
#### **Canvas Key Management:**
- `test_log_canvas_key_success`: Tests successful Canvas key submission.
- `test_log_canvas_key_invalid`: Tests invalid Canvas key.

#### **Fetching Assignments from Canvas:**
- `test_get_all_assignments_form_Canvas_api_failure`: Simulates Canvas API failure.
- `test_get_all_assignments_from_Canvas_success`: Tests successful assignment fetch.

---

### 7. **Course Management Tests**
- `test_get_courses_success`: Successfully fetches courses.
- `test_get_courses_not_found`: Tests no courses found scenario.
- `test_fetch_courses_invalid_email`: Checks invalid email handling.

---

### 8. **Error Handling and Edge Cases**
- `test_invalid_endpoint`: Tests accessing an invalid endpoint.
- `test_missing_email_on_buy_items`: Verifies email requirement for buying items.
- `test_update_player_gold_negative_amount`: Simulates negative gold update.

---

## Conclusion
This test suite comprehensively covers expected functionality, input validation, and integration behavior for the Flask-based application. It ensures system reliability, stability, and proper error handling across various endpoints.
For each method, one or more test cases.

