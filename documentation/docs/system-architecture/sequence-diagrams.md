---
sidebar_position: 3
---

# Sequence Diagrams

## Use Case 1 - Account Creation
**A user wants to create a new account.**

```mermaid
sequenceDiagram
    actor User
    participant DevsAndDragonsApp as LandingPage
    participant RegistrationForm
    participant Backend
    participant Database

    
    User->>DevsAndDragonsApp: Opens application for the first time
    activate User
    activate DevsAndDragonsApp
    DevsAndDragonsApp-->>User: Displays home screen with "Create Account" button
    DevsAndDragonsApp->>RegistrationForm: Selects "Create Account" button
    deactivate DevsAndDragonsApp

    
    activate RegistrationForm
    RegistrationForm-->>User: Displays account registration form
    User->>RegistrationForm: Fills out form (username, password, email)
    RegistrationForm->>Backend: Sends form data to backend
    deactivate RegistrationForm

    activate Backend
    Backend->>Database: Checks if username or email already exists
    activate Database
    Database-->>Backend: Returns validation result
    deactivate Database
    Backend-->>RegistrationForm: Returns success or error message
    deactivate Backend
    activate RegistrationForm
    RegistrationForm-->>User: Displays success message or prompts to try again (if fields are incorrect)
    deactivate RegistrationForm
    deactivate User
```

  1. The user opens the Devs & Dragons application for the first time.
  2. The user selects the ‘Create Account’ button to begin the account registration process.
  3. The user enters the desired username, password, and email into the form.
  4. If any fields are filled out incorrectly, the user is notified and asked to try again.

## Use Case 2 - Logging in
**A user wants to log in to an account they created**

```mermaid
sequenceDiagram
    actor User
    participant HomePage as LandingPage
    participant LoginForm
    participant Backend
    participant EmailService
    participant Database as MongoDB

    User->>HomePage: Navigates to landing page
    activate User
    activate HomePage
    HomePage-->>User: Displays home page
    HomePage->>LoginForm: Selects "Login" button
    deactivate HomePage

    activate LoginForm
    LoginForm-->>User: Displays login form
    User->>LoginForm: Enters username and password
    LoginForm->>Backend: Verifies credentials
    activate Backend
    Backend->>Database: Checks credentials
    activate Database
    Database-->>Backend: Credentials verified
    deactivate Database
    Backend->>EmailService: Request to send 2FA code
    activate EmailService
    EmailService-->>User: Sends email with 2FA code
    deactivate EmailService
    User->>LoginForm: Enters 2FA code
    LoginForm->>Backend: Verifies 2FA code
    Backend->Database: Confirms 2FA
    activate Database
    Database-->>Backend: 2FA code is valid
    deactivate Database
    Backend-->>LoginForm: 2FA verified
    deactivate Backend
    LoginForm-->>User: Redirects to home page
    deactivate LoginForm

    LoginForm-->>User: Sends 2FA code to email
    activate LoginForm
    LoginForm->>EmailService: Request to send 2FA code
    activate EmailService
    EmailService-->>User: Sends email with 2FA code
    deactivate EmailService
    deactivate LoginForm

    User->>LoginForm: Enters 2FA code
    activate LoginForm
    LoginForm->>Backend: Verifies 2FA code
    activate Backend
    Backend->>Database: Confirms 2FA
    activate Database
    Database-->>Backend: 2FA code is valid
    deactivate Database
    Backend-->>LoginForm: 2FA verified
    deactivate Backend
    LoginForm-->>User: Redirects to home page
    deactivate LoginForm
    deactivate User
```
1. The user navigates to the site's landing page
2. The user selects the ‘login’ button
3. The user enters their username and password
4. After providing the correct credentials, the user will receive a 2FA code in their email
5. The user enters the 2FA code
6. After providing the correct 2FA code, the user is brought to the home page

## Use Case 3 - Quest Creation
**A user wants to create a new quest.**

```mermaid
sequenceDiagram
    actor User
    participant HomePage
    participant QuestTab
    participant Backend
    participant GPTBot
    participant Database as MongoDB

    User->>HomePage: Navigates to home page
    activate User
    activate HomePage
    HomePage-->>User: Displays home page
    deactivate HomePage

    User->>QuestTab: Selects "Quests" tab
    activate QuestTab
    QuestTab-->>User: Displays "Create Quest" button
    User->>QuestTab: Selects "Create Quest" button
    QuestTab-->>User: Displays quest creation form
    User->>QuestTab: Fills out form 
    QuestTab-->>User: Displays review input option
    User->>QuestTab: Selects "Confirm" button
    QuestTab->>Backend: Sends form data to backend
    deactivate QuestTab

    activate Backend
    Backend->>GPTBot: Processes request to generate quest
    activate GPTBot
    GPTBot-->>Backend: Returns generated quest
    deactivate GPTBot

    Backend->>Database: Stores generated quest
    activate Database
    Database-->>Backend: Quest stored
    deactivate Database

    Backend-->>QuestTab: Displays the new quest line
    deactivate Backend
    activate QuestTab
    QuestTab-->>User: Displays the new quest line
    deactivate QuestTab
    deactivate User
```

1. From the home page, the user selects the “Quests” tab.
2. The user selects the “Create Quest” button.
3. The user fills out a form for the following:
   - Quest Title
   - Coding Topic
   - Amount of problems
   - Difficulty level
   - Enemy
   - Background
4. User reviews their input and selects the “Confirm” button.

## Use Case 4 - Create Avatar
**A user wants to create their Avatar.**
```mermaid
sequenceDiagram
    actor User
    participant HomePage
    participant AvatarTab
    participant AvatarForm
    participant Backend
    participant Database

    User->>HomePage: Navigates to home page
    activate User
    activate HomePage
    HomePage-->>User: Displays home screen with "Avatar" button
    HomePage->>AvatarTab: Selects "Avatar" button
    deactivate HomePage

    activate AvatarTab
    AvatarTab-->>User: Displays "Create Avatar" button
    User->>AvatarTab: Selects "Create Avatar" button
    AvatarTab->>AvatarForm: Opens avatar creation form
    deactivate AvatarTab

    activate AvatarForm
    AvatarForm-->>User: Displays avatar customization options (hair color, skin color, armor color)
    User->>AvatarForm: Chooses customization options
    AvatarForm->>Backend: Sends avatar details to backend
    deactivate AvatarForm

    activate Backend
    Backend->>Database: Stores avatar details
    activate Database
    Database-->>Backend: Confirms avatar creation
    deactivate Database
    Backend-->>AvatarTab: Sends success message to avatar tab
    deactivate Backend

    activate AvatarTab
    AvatarTab-->>User: Displays success message and updated avatar preview
    deactivate AvatarTab
    deactivate User
    
```
1. From the homepage, the user selects "Avatar" tab.
2. The user selects between three avatar options.
3. The user selects the different customization options for the following:
   - Hair color
   - Skin color
   - Armor color
4. User selects "Save Changes" button.

## Use Case 5 - Adding a Friend
**Two users want to add one another to their friends list.**

```mermaid
sequenceDiagram
    actor User1
    actor User2
    participant HomePage
    participant FriendsTab
    participant Backend
    participant Database
  
    User1->>HomePage: Navigates to home page
    activate User1
    activate HomePage
    HomePage-->>User1: Displays home page
    deactivate HomePage
    
    User1->>FriendsTab: Selects "Friends" button
    activate FriendsTab
    FriendsTab-->>User1: Displays search bar
    User1->>FriendsTab: Searches for User2's username
    FriendsTab-->>User1: Displays User2's profile
    User1->>FriendsTab: Selects "Add Friend" button
    deactivate FriendsTab

    FriendsTab->>Backend: Sends friend request to backend
    activate Backend
    Backend->>Database: Stores pending friend request
    activate Database
    Database-->>Backend: Confirms storage of friend request
    deactivate Database
    Backend-->>User2: Displays friend request notification
    activate User2
    deactivate Backend

    User2->>Backend: Selects "Accept" button
    activate Backend
    Backend->>Database: Updates friend status in database
    activate Database
    Database-->>Backend: Confirms updated friend status
    deactivate Database
    Backend-->>FriendsTab: Confirms friend request for both users
    deactivate Backend

    activate FriendsTab
    FriendsTab-->>User1: Displays User2 as friend
    deactivate User1
    FriendsTab-->>User2: Displays User1 as friend
    deactivate User2
    deactivate FriendsTab

```

1. From the home page, the user selects the “Friends” button.
2. User 1 navigates to the search bar and types User 2’s username.
3. User 1 selects User 2’s profile.
4. User 1 selects the “Add Friend” button.
5. User 2 receives the request and selects “Accept”.

## Use Case 6 - Creating a Party to Start a Quest Outside of a Guild
**A user wants to start a quest outside of a guild.**

```mermaid
sequenceDiagram
    actor User as User 1
    actor Peer as User 2
    participant HomePage
    participant QuestTab
    participant Backend
    participant Database as MongoDB

    User->>HomePage: Navigates to home page
    activate User
    activate HomePage
    HomePage-->>User: Displays home page
    deactivate HomePage

    User->>QuestTab: Selects "Quests" tab
    activate QuestTab
    QuestTab-->>User: Displays "My Quests"
    User->>QuestTab: Selects "My Quests"
    QuestTab-->>User: Displays available quests
    User->>QuestTab: Selects the quest to start
    QuestTab-->>User: Displays "Start Quest" button
    User->>QuestTab: Selects "Start Quest" button
    QuestTab-->>User: Asks to create a party code
    User->QuestTab: Creates party code
     QuestTab->>Backend: Sends party code
    deactivate QuestTab

    activate Backend
    Backend->>Database: Stores party code
    activate Database
    deactivate Database
    deactivate Backend

    User->>Peer: Shares party code with peer(s)
    activate Peer

    Peer->>Backend: Joins party using code
    activate Backend
    Backend->>Database: Updates party members count
    activate Database
    Database-->>Backend: Party size updated
    deactivate Database
    Backend-->>User: Displays party size
    deactivate Backend

    User->>QuestTab: Selects "Start Quest" button when party is 2-4 members
    activate QuestTab
    QuestTab->>Backend: Starts the quest
     deactivate QuestTab
    activate Backend
    Backend->>Database: Updates quest status
    activate Database
    Database-->>Backend: Quest Started set to true
    deactivate Database

    Backend-->>User: Quest has started
    deactivate User
    Backend-->>Peer: Quest has started
    deactivate Peer
    deactivate Backend
```
1. From the home page, the user selects the “Quests” tab.
2. The user selects “My Quests”.
3. The user selects the quest they want to do.
4. The user selects the “Start Quest” button.
5. The user creates a party code and shares it with their peer(s).
6. The user waits for party size to be at two to four members, then clicks the “Start Quest” button.

## Use Case 7 - Join a Party
**A user wants to join another user’s party.**

```mermaid
sequenceDiagram
    actor User
    participant HomePage
    participant JoinPartyForm
    participant Backend
    participant Database as MongoDB

    User->>HomePage: Navigates to home page
    activate User
    activate HomePage
    HomePage-->>User: Displays home page with "Join Party" button
    HomePage->>JoinPartyForm: Clicks "Join Party" button
    deactivate HomePage

    activate JoinPartyForm
    JoinPartyForm-->>User: Displays form to enter party code
    JoinPartyForm-->>User: Displays "join" button
    User->>JoinPartyForm: Enters party code
    User->>JoinPartyForm: Selects "Join" button
    JoinPartyForm->>Backend: Sends party code to backend
    activate Backend
    Backend->>Database: Validates party code and updates party members
    activate Database
    Database-->>Backend: Party code valid, member added
    deactivate Database
    Backend-->>JoinPartyForm: Confirms successful party join
    deactivate Backend
    JoinPartyForm-->>User: Displays confirmation of joining the party
    deactivate User
    deactivate JoinPartyForm
```
1. From the home page, the user clicks on the “Join Party” button.
2. The user enters the party code.
3. The user selects the “Join” button.

## Use Case 8 - Guild Creation
**A user wants to create a guild.**

```mermaid
sequenceDiagram
    actor User
    participant HomePage
    participant GuildsTab
    participant CreateGuildForm
    participant Backend
    participant Database as MongoDB

    User->>HomePage: Navigates to home page
    activate User
    activate HomePage
    HomePage-->>User: Displays home page
    HomePage->>GuildsTab: Selects "Guild" tab
    deactivate HomePage


    activate GuildsTab
    GuildsTab-->>User: Displays "Create Guild" button

    GuildsTab->>CreateGuildForm: Selects "Create Guild" button
    deactivate GuildsTab

    activate CreateGuildForm
    CreateGuildForm-->>User: Displays form (Guild name, description, symbol, code)
    User->>CreateGuildForm: Fills out form
    User->>CreateGuildForm: Selects "Confirm" button
    CreateGuildForm->>Backend: Sends form data to backend
    deactivate CreateGuildForm

    activate Backend
    Backend->>Database: Stores new guild details
    activate Database
    Database-->>Backend: Confirms guild creation
    deactivate Database
    Backend-->>GuildsTab: Confirms successful guild creation
    deactivate Backend

    activate GuildsTab
    GuildsTab-->>User: Displays confirmation of guild creation
    deactivate User
    deactivate GuildsTab
```

1. From the home page, the user selects the “Guilds” tab.
2. The user selects the “Create Guild” button.
3. The user fills out a form for the following:
   - Guild name
   - Guild description
   - Guild symbol
   - Guild Code
4. The user reviews their input and selects “confirm”.

## Use Case 9 - Assign Quest to Guild
**A user wants to assign a quest for their guild to complete**

```mermaid
sequenceDiagram
    actor User
    participant HomePage
    participant QuestTab
    participant GuildsTab
    participant Backend
    participant Database as MongoDB

    User->>HomePage: Navigates to home page
    activate User
    activate HomePage
    HomePage-->>User: Displays home page
    HomePage->>QuestTab: Selects "Quests" tab
    deactivate HomePage

    activate QuestTab
    QuestTab-->>User: Displays "My Quests"
    User->>QuestTab: Selects "My Quests"
    QuestTab-->>User: Displays available quests
    User->>QuestTab: Selects quest to assign
    QuestTab-->>User: Displays "Assign to Guild" button
    User->>QuestTab: Selects "Assign to Guild" button
    QuestTab-->>GuildsTab: Displays available guilds
    deactivate QuestTab

    activate GuildsTab
    User->>GuildsTab: Selects guild to assign quest
    GuildsTab->>Backend: Sends assignment details to backend
    deactivate GuildsTab

    activate Backend
    Backend->>Database: Updates quest assignment to selected guild
    activate Database
    Database-->>Backend: Confirms quest assignment
    deactivate Database
    Backend-->>GuildsTab: Confirms assignment to guild
    deactivate Backend

    activate GuildsTab
    GuildsTab-->>User: Displays confirmation of quest assignment
    deactivate User
    deactivate GuildsTab
```
1. From the home page, the user selects the “Quests” tab.
2. The user selects “My Quests”.
3. The user selects the quest they want to assign.
4. The user selects the “Assign to Guild” button.
5. The user selects the guild to assign the quest to.

## Use Case 10 - Join a Guild
**A user wants to join another user’s guild.**

```mermaid
sequenceDiagram
    actor User
    participant HomePage
    participant JoinGuildForm
    participant Backend
    participant Database as MongoDB

    User->>HomePage: Navigates to home page
    activate User
    activate HomePage
    HomePage-->>User: Displays home page with "Join Guild" button
    HomePage->>JoinGuildForm: Clicks "Join Guild" button
    deactivate HomePage

    activate JoinGuildForm
    JoinGuildForm-->>User: Displays form to enter guild code
    JoinGuildForm-->>User: Dispalys "Join" button
    User->>JoinGuildForm: Enters guild code
    User->>JoinGuildForm: Selects "Join" button
    JoinGuildForm->>Backend: Sends guild code to backend
    deactivate JoinGuildForm

    activate Backend
    Backend->>Database: Validates guild code and adds user to guild
    activate Database
    Database-->>Backend: Guild code valid, user added to guild
    deactivate Database
    Backend-->>JoinGuildForm: Confirms successful guild join
    deactivate Backend

    activate JoinGuildForm
    JoinGuildForm-->>User: Displays confirmation of joining the guild
    deactivate User
    deactivate JoinGuildForm
```

1. From the home page, the user clicks on the “Join Guild” button.
2. The user enters the guild code.
3. The user selects “Join” button.

## Use Case 11 - Creating a Guild Party To Start a Quest
**A user wants to start a quest inside a guild.**

```mermaid
sequenceDiagram
    actor User
    actor GuildMember as Guild Members
    participant HomePage
    participant GuildsTab
    participant QuestBoard
    participant Backend
    participant Database as MongoDB

    User->>HomePage: Navigates to home page
    activate User
    activate HomePage
    HomePage-->>User: Displays home page
    HomePage->>GuildsTab: Selects "Guilds" tab
    deactivate HomePage

    activate GuildsTab
    GuildsTab-->>User: Displays "My Guilds"
    User->>GuildsTab: Selects "My Guilds" and chooses a guild
    GuildsTab-->>User: Displays guild page with "Quest Board" button
    GuildsTab->>QuestBoard: Selects "Quest Board"
    deactivate GuildsTab

    activate QuestBoard
    QuestBoard-->>User: Displays available quests
    QuestBoard-->>User: Displays available quests
    User->>QuestBoard: Selects quest to start
    QuestBoard-->>User: Displays "Start Quest" button
    User->>QuestBoard: Selects "Start Quest" and enters guild party name
    QuestBoard->>Backend: Creates guild party
    deactivate QuestBoard

    activate Backend
    Backend->>Database: Stores guild party details
    activate Database
    Database-->>Backend: Confirms party created
    deactivate Database
    deactivate Backend

    User->>GuildMember: Shares party details with guild members
    activate GuildMember

    GuildMember->>Backend: Joins guild party
    deactivate GuildMember
    activate Backend
    Backend->>Database: Updates party members count
    activate Database
    Database-->>Backend: Party size updated
    deactivate Database
    Backend-->>User: Displays updated party size
    deactivate Backend

    User->>QuestBoard: Selects "Start Quest" when party size is 2-4 members
    activate QuestBoard
    QuestBoard->>Backend: Starts quest
    activate Backend
    Backend->>Database: Updates quest status
    activate Database
    Database-->>Backend: Quest Started set to True
    deactivate Database
    deactivate QuestBoard
    Backend-->>User: Quest has started
    deactivate User
    deactivate Backend
```

1. From the home page, the user selects “Guilds” tab.
2. The user selects “My Guilds” and then selects the guild they wish to start a quest in.
3. In the guild, the user selects the “Quest Board” button.
4. The user selects a quest they want to do.
5. The user selects “Start Quest” which creates a guild party.
6. The user enters a name for the guild party.
7. User waits for the guild party size to be at two to four members, then selects the “Start Quest” button.

## Use Case 12 - Solving a Problem in a Quest (gameplay)
**Two users want to solve a coding problem together during a quest.**

```mermaid
sequenceDiagram
    actor User1
    actor User2 
    participant GPTBot
    participant GameEngine as Game
    participant Backend
    participant Database as MongoDB

    activate User1
    activate User2
    activate Backend
    Backend->>GameEngine: Provides first problem
    activate GameEngine
    GameEngine-->>User1: Displays coding problem
    GameEngine-->>User2: Displays coding problem
    User1->>GameEngine: Presses "Begin" button
    
    GameEngine->>Backend: Starts timer
    Backend-->>GameEngine: Timer Ticks Down
    GameEngine-->>User1: Display Timer Tick Down
    GameEngine-->>User2: Display Timer Tick Down
    User1->>GameEngine: Writes code in text box
    User1->>GameEngine: Clicks "Submit" button
    GameEngine->>Backend: Receives code and ends User1's turn
    Backend->>Database: Stores User1's code submission
    activate Database
    deactivate Database
    GameEngine-->>User1: Displays current code entered
    GameEngine-->>User2: Displays current code entered
    GameEngine->Backend: Reset Timer for User 2
    GameEngine-->>User2: Display their turn starts now
    GameEngine->Backend: Start Timer
    Backend-->GameEngine: Timer Ticks Down
    GameEngine-->>User2: Display Time Tick Down
    GameEngine-->>User1: Display Time Tick Down
    User2->>GameEngine: Writes code in text box
    User2->>GameEngine: Clicks "Submit" button
    
    GameEngine->>Backend: Receives code and ends User2's turn
    
    Backend->>Database: Stores User2's code submission
    activate Database
    deactivate Database
    GameEngine-->>User1: Displays current code entered
    GameEngine-->>User2: Displays current code entered
    deactivate GameEngine
    Backend->>GPTBot: Sends final submission for analysis
    activate GPTBot
    GPTBot-->>Backend: Rates solution (1-3)
    deactivate GPTBot
    Backend-->>User1: Displays party's rating
    Backend-->>User2: Displays party's rating
    deactivate Backend
    deactivate User1
    deactivate User2
    alt Solution is incorrect
        activate User1
        Backend->>GameEngine: Party loses health
        activate GameEngine
        activate Backend
        GameEngine->>Backend: Resets timer for next turn
        deactivate GameEngine
        Backend-->>User1: User 1 goes again for another turn
        deactivate Backend
        deactivate User1
       
    end
```

1. The users are given their first problem.
2. User 1 is randomly selected and when the party is done reading the problem, user 1 presses the “Begin” button.
3. The timer begins and user 1 starts to write code in the provided text box.
4. User 1 clicks the “Submit” button.
5. User 1’s turn is done and the timer restarts.
6. The timer begins as it is now user 2's turn to write code in the provided text box.
7. User 2 clicks the “Submit” button.
8. GPT-bot analyzes the final submission and rates the party’s solution from 1 to 3.
9. If the final submission is incorrect, the party loses health, the timer resets, and user 1 starts a new turn.
