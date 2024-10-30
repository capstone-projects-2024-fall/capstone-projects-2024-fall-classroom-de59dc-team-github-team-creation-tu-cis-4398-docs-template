---
sidebar_position: 1
---

# PlantParent Unit Test Cases

### 1. **Class: WebApplication**
#### Method: `startApp()`
- **Description**: Verifies the app starts without issues.
- **Test Case 1**: 
  - **Input**: No input
  - **Expected Result**: Application starts successfully, and `version` and `appName` are correctly initialized.
  - **Mock Objects**: None

#### Method: `stopApp()`
- **Description**: Verifies the app stops without issues.
- **Test Case 1**: 
  - **Input**: No input
  - **Expected Result**: Application stops successfully.
  - **Mock Objects**: None

---

### 2. **Class: PageDisplay**
#### Method: `showPage(page: String)`
- **Description**: Checks whether a specified page is displayed.
- **Test Case 1**:
  - **Input**: `"LoginPage"`
  - **Expected Result**: `LoginPage` is displayed.
  - **Mock Objects**: None

#### Method: `openTutorial()`
- **Description**: Ensures the tutorial page opens properly.
- **Test Case 1**:
  - **Input**: No input
  - **Expected Result**: Tutorial page content is displayed correctly.
  - **Mock Objects**: TutorialPage

---

### 3. **Class: FrontPage**
#### Method: `displayFeaturedContent()`
- **Description**: Verifies that featured content is displayed.
- **Test Case 1**:
  - **Input**: No input
  - **Expected Result**: Featured content (e.g., plant care tips) is displayed on the front page.
  - **Mock Objects**: None

---

### 4. **Class: CalculationsPage**
#### Method: `setSettings()`
- **Description**: Ensures settings for plant care are applied correctly.
- **Test Case 1**:
  - **Input**: Various plant details and input values
  - **Expected Result**: Settings are saved without errors.
  - **Mock Objects**: None

#### Method: `askAI()`
- **Description**: Verifies AI is consulted and provides a response.
- **Test Case 1**:
  - **Input**: Plant details
  - **Expected Result**: AI response is generated based on the plant details provided.
  - **Mock Objects**: AIPage

---

### 5. **Class: AIPage**
#### Method: `runAIModel()`
- **Description**: Ensures AI model runs and provides output.
- **Test Case 1**:
  - **Input**: Predefined user prompt
  - **Expected Result**: AI response is generated based on user input.
  - **Mock Objects**: None

#### Method: `displayResponse(userPrompt: String): String`
- **Description**: Verifies that the AI response is correctly displayed.
- **Test Case 1**:
  - **Input**: `"What is the best watering schedule?"`
  - **Expected Result**: AI's response is displayed, e.g., `"Water every 3 days."`
  - **Mock Objects**: None

---

### 6. **Class: LoginPage**
#### Method: `authenticate()`
- **Description**: Validates if the user login is successful.
- **Test Case 1**:
  - **Input**: Username and password
  - **Expected Result**: User is authenticated if credentials are correct.
  - **Mock Objects**: Database (for verifying user credentials)

#### Method: `forgotPassword()`
- **Description**: Ensures password recovery works.
- **Test Case 1**:
  - **Input**: User email
  - **Expected Result**: Password recovery email is sent.
  - **Mock Objects**: None

---

### 7. **Class: RegisterPage**
#### Method: `registerUser()`
- **Description**: Verifies user registration functionality.
- **Test Case 1**:
  - **Input**: User details
  - **Expected Result**: User is successfully registered.
  - **Mock Objects**: Database (for saving the new user)

#### Method: `validateInput()`
- **Description**: Checks that input fields are validated properly.
- **Test Case 1**:
  - **Input**: Invalid email format
  - **Expected Result**: Validation fails with an error message.
  - **Mock Objects**: None

---

### 8. **Class: Preset**
#### Method: `savePreset()`
- **Description**: Ensures the user's preset is saved.
- **Test Case 1**:
  - **Input**: Preset details
  - **Expected Result**: Preset is saved in the database.
  - **Mock Objects**: Database

#### Method: `deletePreset()`
- **Description**: Verifies that a preset is deleted.
- **Test Case 1**:
  - **Input**: Preset ID
  - **Expected Result**: Preset is deleted from the database.
  - **Mock Objects**: Database

---

### 9. **Class: Light**
#### Method: `setBrightness(level: int)`
- **Description**: Verifies that the light's brightness is set to the correct level.
- **Test Case 1**:
  - **Input**: Brightness level of `50`
  - **Expected Result**: Light brightness is set to `50`.
  - **Mock Objects**: HardwareComponent

---

### 10. **Class: LightSensor**
#### Method: `readLightIntensity(): float`
- **Description**: Ensures the light intensity reading is accurate.
- **Test Case 1**:
  - **Input**: No input
  - **Expected Result**: Returns current light intensity as a float value.
  - **Mock Objects**: None

---

### 11. **Class: WaterPump**
#### Method: `setFlowRate(rate: int)`
- **Description**: Verifies that the water pump's flow rate is correctly set.
- **Test Case 1**:
  - **Input**: Flow rate of `30`
  - **Expected Result**: Flow rate is set to `30`.
  - **Mock Objects**: HardwareComponent

---

### 12. **Class: Database**
#### Method: `addUser(user: User)`
- **Description**: Ensures that a new user is added to the database.
- **Test Case 1**:
  - **Input**: User object
  - **Expected Result**: User is added to the database.
  - **Mock Objects**: None

#### Method: `loadPresets(username: String): List<Preset>`
- **Description**: Verifies that the correct presets for a user are loaded.
- **Test Case 1**:
  - **Input**: Username
  - **Expected Result**: List of presets associated with the user is returned.
  - **Mock Objects**: None

---

