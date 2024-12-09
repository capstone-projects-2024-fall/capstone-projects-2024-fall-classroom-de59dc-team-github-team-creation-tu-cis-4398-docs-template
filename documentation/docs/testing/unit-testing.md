---
sidebar_position: 1
---
# Unit tests

## Unit Test Reports
You can find the generated unit test report [here](https://docs.google.com/document/d/1LXl8B6zVj_wNwBaXmDyHSxlF1FM4JaUEBZPb5mn5QmY/edit?usp=sharing).

## Frontend Unit Tests

### Application
#### Test Case 1: Authorize User Login
Goal: Verify that a user is able to log into an account created.

- **User Action**
  - A user inputs **username** and **password** in the login form.
  - The user clicks the **"login"** button.
- **Expected Behavior**
  - The frontend calls **loginUser()**, which will send a **POST request** to the backend with the user's credentials.
  - The backend queries the **MongoDB** to find a matching user.
  - On **success**, the user is authorized and redirected to the **home page**.



### Home Page
#### Test Case 1: Dropdown Menu
Goal: Verify that a user can open the dropdown menu.

- **User Action:**
  - User clicks the **Quests** button to open the dropdown menu.
- **Expected Behavior:**
  - The dropdown menu opens and displays the following options:
    - **My Quests**
    - **Create Quest**
  - Both options are visible and can be clicked.
  - The dropdown menu remains open until the user selects an option or clicks outside the menu.



### Create Quest Page
#### Test Case 1: Quest Title Input
Goal: Verify that the user can enter a **quest title** in the input field.

- **User Action:**
  - A user inputs the desired title name in the text field provided.
  - User enters "My First Quest".
- **Expected Behavior:**
  - The **quest title** input field updates to display the entered quest title.
  - The value in the input field reflects the text: **"My First Quest"**.


#### Test Case 2: Topic Selection
Goal: Verify that the user can select one of the provided topics.

- **User Action:**
  - User clicks the **Topic Selection Dropdown** to open it.
  - User selects the **"Arrays"** option from the dropdown.  
- **Expected Behavior:**
  - The topic dropdown displays the text "**Arrays**" after selection.
  - The correct topic value is stored in the dropdown state.


#### Test Case 3-6: Number of Problems, Difficulty, Enemy, and Background Selection
The remaining selections above follow the same test as **Test Case 2**.


## Backend Unit Test

### User Registration

#### Test Case 1: Create a New User Successfully
Goal: Verify that a new user can be created successfully.

- **User Action**
  - Clean up any existing user with the same email to ensure a clean slate.
  - Provide the following new user data:
    - Name: "Test User"
    - Email: "testuser@example.com"
    - Password: "TestPassword123!"
  - Send a POST request to the /create_contact endpoint with the user data in JSON format.
- **Expected Behavior**
  - The backend should process the request and create a new user in the database.
  -  The server responds with a 201 status code, indicating success.
  - The response message should be "User created successfully."
  - Cleanup should be performed after the test, removing the test user from the database.

#### Test Case 2: Create a User with Duplicate Email
Goal: Verify that attempting to create a user with an already existing email address results in an error.

- **User Action**
  - Add an existing user to the database with the email "existinguser@example.com."
  - Attempt to create a new user with the following data:
    - Name: "Duplicate User"
    - Email: "existinguser@example.com"
    - Password: "AnotherPassword123!"
  - Send a POST request to the /create_contact endpoint with the user data in JSON format.
- **Expected Behavior**
  - The backend should reject the request due to the duplicate email.
  - The server responds with a 400 status code, indicating failure.
  - The response message should be "Email already exists."
  - Cleanup should be performed after the test, removing the user with "existinguser@example.com" from the database.

#### Test Case 3: Create a User with a Weak Password
Goal: Verify that attempting to create a user with a weak password results in an error. 

- **User Action**
  - Provide the following new user data with a weak password:
    - Name: "Weak Password User"
    - Email: "weakpassword@example.com"
    - Password: "123" (intentionally weak)
  - Send a POST request to the /create_contact endpoint with the user data in JSON format.
- **Expected Behavior**
  - The backend should reject the request due to the weak password not meeting security requirements.
  - The server responds with a 400 status code, indicating failure.
  - The response message should be "Password does not meet security requirements."

#### Test Case 4: Create a User with an Invalid Email
Goal: Verify that attempting to create a user with an invalid email format results in an error.

- **User Action**
  - Provide the following new user data with an invalid email:
    - Name: "Invalid Email User"
    - Email: "invalid-email" (missing '@' and domain part)
    - Password: "ValidPassword123!"
  - Send a POST request to the /create_contact endpoint with the user data in JSON format.
**Expected Behavior**
  - The backend should reject the request due to the invalid email format.
  - The server responds with a 400 status code, indicating failure.
  - The response message should be "Invalid email format."



### Strong Credential Validation
#### Test Case 1: User Exists and Password is Correct
Goal: Verify that a user with the correct email and password can authenticate successfully.

- **User Action**
  - Add a test user to the database with the following data:
    - Email: "testuser@example.com"
    - Password: "CorrectPassword123"
  - Provide the following login credentials:
    - Email: "testuser@example.com"
    - Password: "CorrectPassword123"
  - Send a POST request to the /match_user endpoint with the login data in JSON format.
- **Expected Behavior**
  - The backend should verify that the user exists and that the password is correct.
  - The server responds with a 200 status code, indicating success.
  - The response message should be "User exists."
  - Cleanup should be performed after the test, removing the test user from the database.

#### Test Case 2: User Exists, but Password is Incorrect
Goal: Verify that a user with an incorrect password is denied authentication.

- **User Action**
  - Add a test user to the database with the following data:
    - Email: "testuser@example.com"
    - Password: "CorrectPassword123"
  - Provide the following login credentials with an incorrect password:
    - Email: "testuser@example.com"
    - Password: "WrongPassword123"
  - Send a POST request to the /match_user endpoint with the login data in JSON format.
- **Expected Behavior**
  - The backend should verify the user exists but reject the login due to the incorrect password.
  - The server responds with a 403 status code, indicating failure.
  - The response message should be "Incorrect password."
  - Cleanup should be performed after the test, removing the test user from the database.

#### Test Case 3: User Does Not Exist
Goal: Verify that attempting to log in with an email that does not exist results in an error.

- **User Action**
  - Provide the following login credentials for a non-existent user:
    - Email: "nonexistentuser@example.com"
    - Password: "SomePassword123"
  - Send a POST request to the /match_user endpoint with the login data in JSON format.
- **Expected Behavior**
  - The backend should verify that the user does not exist in the database.
  - The server responds with a 404 status code, indicating failure.
  - The response message should be "User does not exist."


