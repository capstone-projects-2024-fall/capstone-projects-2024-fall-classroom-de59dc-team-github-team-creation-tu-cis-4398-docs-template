---
sidebar_position: 6
---

## Sequence Diagram

## Use case 1 
**As a user, I want to finish a challenging operating systems lab assignment. (Boss battle)**

```mermaid
sequenceDiagram
    actor Student
    Student ->> Web App: Log on to web app
    activate Web App
    actor Canvas
    Web App ->> Canvas: Connect to Canvas
    Canvas -->> Web App: Connection made
    Web App -->> Student: Successful login
    Dashboard-->>Student: Menu displayed
    activate Dashboard
    Student ->> Dashboard: Go to map
    Dashboard ->> Map: Transfer to map
    deactivate Dashboard
    activate Map
    Map -->> Student: Map displayed to student
    Student ->> Map: Travel Map, find quest giver, quest given
    actor ChatGPT
    Map ->> ChatGPT: Retrieve story from gpt
    ChatGPT -->> Map: Story retrieved 
    Map-->> Student: Story displayed on map
    Student ->> Map: Navigate map, find boss/assignment
    Canvas ->> Map: retrieve assignment
    Map-->> Student: Assignment displayed on map
    deactivate Map
    deactivate Web App
```
```
1. After logging into the app and Canvas, the user clicks on a rpg theme to start.
2. User is then directed to a map with their avatar to navigate the world 
3. User taps on the quest finder to help reach the npc quest giver .
4. Users can read the story dialogue made from ChatGPT or choose to skip .
5. The user then navigates around the map trying to get to the Boss aka the OS lab .
6. Once the user gets to the boss, a pomodoro timer will be shown and activated.
```

## Use case 2 
**As a user, I want to buy some gear and items for my character. **

```mermaid
sequenceDiagram
    actor Student
    Student ->> Dashboard: Successful login
    activate Dashboard
    Dashboard-->>Student: Board shown to student
    Student->> Store: User clicks on store
    deactivate Dashboard
    activate Store
    Store-->> Student: Two options displayed
    Student->> Item shop: user goes to item shop, buys items
    activate Item shop
    Item shop--> Student: Go back to Store.
    deactivate Item shop
    Student ->> Character: User goes to character to customize
    activate Character
    Character-->> Student: Changes shown
    deactivate Character
    deactivate Store
```
```
1. The user accumulates enough gold to buy the desired items/gear that they want. 
2. User clicks on a button icon on the map to get to the shop.
3. The user buys the items and gear that they want. Items and gears are based on different themes. 
4. User backs out of the shop and goes to their character through a different button.
5. They equip what they just bought onto their character.
6. The changes made are reflected onto the user character, including stats, and on the map. Looking fancy.

```

## Use case 3 
**As a user, I want to start up the application and prepare to start a quest.**

```mermaid
sequenceDiagram
    actor Student
    Student->>Dashboard: Successful login
    Dashboard-->> Student: Menu displayed
    Student->>Assignments: Click on Assignments
    activate Assignments
    actor Canvas
    Assignments->>Canvas: Call to get Assignments
    Canvas-->>Assignments: Send back assignments and their info
    Assignments-->>Student: Assignments shown, including class and deadline
    deactivate Assignments
    Student->> Character: Customize Characer
    activate Character
    Character-->>Student: Changes shown on screen
    deactivate Character
    Student->>Map: Go to map and choose theme
    activate Map
    Map-->>Student: Theme reflected and show
    deactivate Map
```
```
1. The user logs in to the app and connects to Canvas.
2. They download their assignments from Canvas onto a board to be organized.
3. The user organizes their assignments based on what they are in order to group them and make it more readable.
4. The user creates their basic avatar, customizing looks.
5. Afterwards, a game theme is chosen by the user to reflect the map, quests, and shop items.
```

## Use case 4 
**As a user, I want to complete a quest and go to the next one.**

```mermaid
sequenceDiagram
    actor Student
    Student->>Map: Student goes to map to find quest giver.
    activate Map
    actor ChatGPT
    Map->>ChatGPT: Request for story once quest giver is found
    ChatGPT-->>Map: Story made and given to quest giver
    Map-->>Student: Quest Giver tells user story involving quest/assignment.
    Student->>Map: User completes quest
    Map-->>Student: Minigame shown for user to complete.
    Student->>Map: Minigame completed
    Map-->>Student: User allowed to move onto the next quest.
    deactivate Map
```
```
1. The user goes to the map.
2. Using their character, the user finds a quest giver through the quest finder.
3. A bit of dialogue concerning the story made by the language model.
4. The user goes to the assignment and completes it within the given time limit.
5. After an assignment is completed, the user plays a short minigame where they can earn coins before moving onto the next assignment on the map.
```


## Use case 5

**The user wants to level up and/or aim for a specific skill in their skill tree for their character.**

```mermaid
sequenceDiagram
    actor User
    participant App
    participant Task
    participant Character
    participant SkillTree

    User->>App: Logs into the application
    App->>User: Shows map
    User->>Task: Selects a task from the map
    Task-->>User: Task available
    User->>Task: Completes task
    Task->>Character: Task completion data
    Character-->>App: XP added, check if level up
    alt Level up reached
        App-->>User: Character leveled up notification
    else
        App-->>User: More tasks needed
    end
    User->>SkillTree: Opens skill tree
    SkillTree-->>User: Displays skill options
    User->>SkillTree: Chooses new skills
    SkillTree->>Character: Updates character skills
    User->>Character: Tests new skill on map
```
```
1. The user gets into the application and goes to the map to get a task.
2. User completes the task which goes towards leveling up their character.
3. Once enough tasks have been completed the character will level up, with some indication to show the user this.
4. The user goes to the skill tree tied to their character.
5. User chooses the skills that they want from the tree.
6. User confirms the skills chosen and after confirmation, the skills are part of the character.
7. The user tests out one of the new skills on the map/quest
```
## Use case 6

**A student tries to complete an assignment but fails in the given time limit.**

```mermaid
sequenceDiagram
    actor User
    participant App
    participant Canvas
    participant Assignment
    participant Character

    User->>App: Logs into the application
    App->>User: Displays home screen
    User->>Canvas: Navigates to Canvas
    Canvas->>User: Shows assignment list
    User->>Assignment: Checks on an assignment
    Assignment-->>User: Assignment due by end of the day
    User->>Assignment: Accepts the quest/assignment
    User->>Assignment: Tries to complete it
    alt Assignment not completed in time
        Assignment-->>User: Assignment failed
        App-->>User: Displays failure message
        App->>Character: Applies penalty (e.g., losing gold)
    end
```

```
1. User logs into the app. They go to Canvas.
2. User goes to the map and checks on an assignment that is due by the end of the day.
3. The user accepts the quest/assignment and tries to complete it in time.
4. User fails to complete the assignment in time.
5. On the application, a message displays to the user that they failed.
6. A penalty is given to the user’s character due to the failure, such as losing gold.
```

## Use case 7

**User wants to trade earned points for merch.**

```mermaid
sequenceDiagram
    actor User
    participant App
    participant Rewards
    participant Prize

    User->>App: Opens account tab
    App-->>User: Displays account options
    User->>Rewards: Taps rewards icon
    Rewards-->>User: Shows available rewards
    User->>Prize: Taps redeem under a prize
    alt User has enough points
        Prize-->>User: Prompt to complete ship information
    else User does not have enough points
        Prize-->>User: Notifies insufficient points
    end
```
```
1. User wants to redeem points.
2. Goes to the account tab and taps the rewards icon.
3. Taps redeem under one of the prizes.
4. If user has necessary points then user will be prompted to fill out information on where to ship prize.
```

## Use case 8

**A student wants to put the new hat they just bought on their character.**

```mermaid
sequenceDiagram
    actor User
    participant App
    participant AvatarSystem
    participant Inventory

    User->>App: Taps on profile
    App->>User: Shows avatar image
    User->>App: Presses 'Edit Avatar'
    App->>AvatarSystem: Opens edit avatar screen
    AvatarSystem-->>User: Shows edit avatar screen with all items
    User->>Inventory: Drags hat from inventory to hat slot
    Inventory-->>AvatarSystem: Updates avatar with new hat
    User->>App: Clicks 'Save Avatar'
    App->>AvatarSystem: Saves avatar changes
```

```
1. User will tap on their profile
2. User will then be shown an image of their avatar
3. User then presses “Edit Avatar”
4. User will be shown an edit avatar screen and all their items
5. User drags the hat they want from their inventory into the hat slot
6. User clicks “Save Avatar”
```
