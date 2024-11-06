---
sidebar_position: 2
---

# PlantParent Integration Test Cases

---

## Use Case 1: Keeping plants watered while away on vacation
### Test Steps:
1. User opens the app.
2. User selects the plants to water.
3. App sends notification: "Watering basin is low."
4. User refills the water basin.
5. App reads data from soil moisture monitors.
6. App distributes water based on soil dryness.
7. User receives notification when watering is complete.
   
### Expected Results:
- Correct plants are selected and watering initiated.
- App correctly detects low water basin.
- Water is distributed to plants based on moisture levels.
- User receives timely notifications.

---

## Use Case 2: Keeping plants under light for a specified time
### Test Steps:
1. User opens the app.
2. User selects plants that need light.
3. User inputs the duration for which lights should stay on.
4. Alternatively, user selects the plant type and app automatically recommends light duration.
5. App adjusts light sensitivity based on plant needs.
   
### Expected Results:
- Lights turn on and off based on user input or app recommendation.
- Light sensitivity is adjusted according to plant's needs.
- Plants receive correct amount of light.

---

## Use Case 3: AI-assisted plant species identification
### Test Steps:
1. User opens the app.
2. User uploads a picture to the AI plant identifier.
3. AI identifies the plant species and provides potential answers if ambiguous.
   
### Expected Results:
- AI identifies the plant species or provides a list of possible matches.
- User is satisfied with the plant identification.

---

## Use Case 4: Learning how to take care of plants using AI
### Test Steps:
1. App offers instructions on setting up the camera to capture a plant picture.
2. User takes a photo and uploads it to the AI for identification.
3. AI identifies the plant species and provides care recommendations (water, light, moisture, temperature, humidity).
4. User can ask further questions about plant care.
5. User submits feedback and ratings for AI suggestions.

### Expected Results:
- AI correctly identifies the plant and suggests optimal care.
- User can ask and receive detailed plant care instructions.
- Feedback is successfully submitted and recorded.

---

## Use Case 5: Keeping plants safe from the outside environment
### Test Steps:
1. User follows guidelines to place plant in a container.
2. User places the plant in a safe space inside the home.
3. User remotely monitors and cares for the plant through the app.

### Expected Results:
- Plant is safely placed and monitored remotely.
- App correctly sends notifications for plant care while ensuring plant safety.

---

## Use Case 6: Custom scheduling for plant care
### Test Steps:
1. User selects a plant from the database.
2. App displays a visual calendar for scheduling care.
3. User specifies the necessary watering, lighting, and control schedule.
4. App saves the schedule and automatically adjusts settings based on time.
5. User receives notifications when care is needed.

### Expected Results:
- App correctly displays a calendar and saves custom schedules.
- Settings are adjusted according to schedule.
- Notifications are sent as per schedule.

---

## Use Case 7: Managing a group of plants of the same type
### Test Steps:
1. User groups plants of the same species together in the app.
2. User sets common care settings for the group.
3. App monitors each plant individually but applies group-wide settings.
4. App notifies the user if any plant needs special attention.

### Expected Results:
- Grouped plants receive common care instructions.
- Individual plants are monitored, and notifications are sent for special attention.

---

## Use Case 8: Adjusting care schedule based on seasonal changes
### Test Steps:
1. User inputs the current season in the app.
2. App recommends adjustments for the season (e.g., less water, more light).
3. User reviews and approves changes.
4. App adjusts care routine and informs the user about changes (e.g., water usage, light exposure).

### Expected Results:
- Seasonal changes are reflected in the plant care schedule.
- App adjusts water, light, and other factors accordingly.
- Notifications are sent with updates on the new routine.

---

## Use Case 9: Assisting a new user with plant care
### Test Steps:
1. User opens the app and accesses the AI chat box.
2. User provides background information and plant care experience.
3. AI chat delivers a personalized care plan.
4. User receives additional advice and tips.
5. User enables notifications for reminders.

### Expected Results:
- AI provides a tailored care plan based on user input.
- User receives advice and tips from the chat.
- Notifications are enabled successfully.
---


