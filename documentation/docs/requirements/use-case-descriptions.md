---
sidebar_position: 5
---

# Use-case descriptions

## Use Case 1 - Account Creation
Intention: A user wants to create a new account.
1. The user opens the Devs and Dragons application for the first time.
2. The user selects the "Sign Up" button to begin the account registration process.
3. The user enters the desired username, password, and email into the form.
4. If any of the fields are filled out incorrectly, then the user is notified and asked to try again.
5. The user creates an account.

## Use Case 2 - Logging In
Intention: A user wants to log in to an account they created.
1. The user navigates to the site's landing page.
2. The user enters their username and password.
3. The user selects the "Begin Quest" button to log in.
4. After providing the correct credentials, the user will receive a 2FA code in their email.
5. The user enters the 2FA code.
6. After providing the correct 2FA code, the user is brought to the home page.
7. After the user clicks "Begin Quest", an alert confirms a successful login.

## Use Case 3 - Create Avatar
A user wants to create their Avatar.
1. From the homepage, the user selects "Avatar" tab.
2. The user selects between six avatar options.
3. The user selects a color-scheme for the selected avatar.
4. User selects "Save Changes" button.
5. User creates a valid account.

## Use Case 4 - Creating a Quest to Play Solo ("One Player")
Intention: A user wants to start a quest for one player and play alone.
1. From the homepage, the user selects the "Create Quests" button.
2. A “Create Quests” section is present. The user selects "One Player".
3. The user is prompted with the quest form. The user fills out the form for the following fields:
   - Quest Title
   - Coding Topic
   - Amount of Problems (3 - 8)
   - Difficulty Level
   - Enemy
   - Background
   - Programming Language
   - Quest Description
4. The user reviews their input and selects the “Create Quest” button.
5. There is a confirmation dialog of a quest created.
6. The user selects the "Start Quest" button.

## Use Case 5 - Playing a "One Player" (aka Solo) Quest
Intention: After a user starts a quest in **Use Case 4**, they want to play and try to complete the quest.
1. The game screen is now displayed to the user where they can see:
   - User's avatar
   - User's health bar
   - Enemy
   - Enemy's health bar
   - Timer
   - Background
   - Code Editor (Answer Space)
   - Question
2. The user is prompted with a question.
3. The timer begins to tick down.
4. The user can toggle to dark mode if wanted by pressing "Toggle Dark Mode".
5. The user writes code in the provided code editor.
6. The user clicks the "Submit" button.
7. The GPT-bot analyzes the user's submission and provides feedback with a rating out of 10, but the user is shown an equal result out of 5 so they may digest it easily.
8. Based on the GPT-bot’s rating:

   - **Feedback is provided to the user**:

     - If the rating is less than 5 / 10, the answer is not recognized as a valid solution. The answer's rating is correctly shown (around 40% stars filled at a maximum), the user is given tips, and the user’s health bar decreases. They have the option to reattempt and click submit after modifying their answer in the code editor.

     - The "continue" button to go to the next question will only appear for valid solutions (answer must be at least rated as 5 / 10).

     - If the rating is greater than or equal to 5 / 10, the answer's rating is correctly shown (at least 60% stars filled), The user's answer is recognized as a valid solution. The user receives tips on improving their solution, and the user can continue to the next question as it will become available. The user successfully damages the enemy, and the enemy’s health bar decreases.

9. The user continues to engage with the quest until all questions are answered, the enemy is defeated (enemy's health bar reaching 0), the user quits, or the user’s health bar reaches zero.

## Use Case 6 - Creating a Quest to Play with a Party ("Two Player")
Intention: A user wants to form a party to undertake a quest together.

1. From the homepage, the user selects the "Create Quests" button.

2. A “Create Quests” section is present. The user selects "Two Player".

3. Selecting "Two Player", expands the "Create Quests" section to now ask the user if they want to join an existing party/room or create a new party/room. The user selects "Start Room" which automatically prompts a new quest form on screen.

4. The generated room code is now available for the user to share with others and have them join the user's party. The user fills out the form for the following fields:
   - Quest Title
   - Coding Topic
   - Amount of Problems (3 - 8)
   - Difficulty Level
   - Enemy
   - Background
   - Programming Language
   - Quest Description
5. The user reviews their input and selects the “Create Quest” button.
6. There is a confirmation dialog of a quest created.
7. The user selects the "Start Quest" button to start the "Two Player" quest.

## Use Case 7 - Join an Existing Party for a "Two Player Quest" (needs at least 2 players)
Intention: A user wants to join another user’s party.
1. From the home page, the user clicks on the “Create Quests” button.
2. The user selects the "Two Player" option in the Create Quest Section.
3. The user inputs the room code and selects the "Join Room" button.
4. The user is automatically navigated to the room.

## Use Case 8 - Playing a "Two Player" Quest with a Party (of at least two people)
Intention: Context is Use Case 6 (quest created for at least two players) and 7 (one or more players join the existing quest created by user in use case 6). At least two users want to solve a coding problem together during a quest.

1. The game screen is now displayed to the users where they can see:
   - User's avatar
   - User's health bar
   - Enemy
   - Enemy's health bar
   - Timer
   - Background
   - Code Editor (Answer Space)
   - Question
   - Party/Room code

3. The users are prompted with a question.

4. The timer begins to tick down.

   - If the user does not submit an answer before the timer reaches 0, then the user's health bar decreases.

5. The user writes code in the provided code editor.

6. The user clicks the "Submit" button.

7. The second user in the party adds onto the code editor to solve the problem if needed.

8. The second user clicks the "Submit" button.

9. The GPT-bot analyzes the user's submission and provides feedback with a rating from 1 to 3.

10. Based on the GPT-bot’s rating:

   - **Feedback is provided to the user**:
     
     - If the rating is 1, the user’s health bar decreases, and the quest continues with the timer reset for a new attempt.

     - If the rating is 2, the user receives tips on improving their solution and chooses to try again or continue.
     
     - If the rating is 3, the user successfully damages the enemy, the enemy’s health bar decreases, and the user proceeds to the next question if available.

11. The two users continue to engage with the quest until all questions are answered, the user quits, or the user’s health bar reaches zero.