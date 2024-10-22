---
sidebar_position: 1
---
# Unit tests

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



