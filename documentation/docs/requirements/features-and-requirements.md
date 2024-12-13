---
sidebar_position: 4
---

# Features and Requirements
# Functional Requirements
- Progam will save allow the user to create an account they can log into

- Progam will allow user to connect to their canvas account to the game

- Program will save game and assignment progress

- Users will be able to view in-progress assignments and start assignments on the game map 

- Users will be able to change assignment status to done in the game map

- changes to assignments in game will be reflected on dashboard

- Users will earn gold for completing assignments

- New buildings and map features will be added to the map as players complete more of their assignments

- Users will be able to move around the map

- Users will be able to interact with characters on the map

- Users will be able to buy inventory at the shop

- Users will be able to view the inventory they purchased in the game map

- users will be able to use the inventory they purchased in the game map

- Program  will display information about canvas assignments to user on the dashboard

- Users will be able to adjust assignment status on the dashboard

- Users will be able to get hints to help them complete their assignments on the dashboard

- Program will display information about canvas assignments on assignment page


# Nonfunctional Requirements
- The App will have a Practical and Comprehensible user interface
    - There will be clear messaging during interactions with the app
        - When a user fails to connect their canvas account due to improper credentials, or their account isn’t registered in any graded courses on canvas, then the app will alert them of the issue
        - Users will be able to see due dates clearly and icons will indicate the type of assignment/task
- user's should be able to move to different tabs quickly
- game map should allow users to move around in real time
- npc dialogue should be updated when user gets close to different npcs
- changes to gold, or inventory the character has in the game should be applied immediately
- pages should not take more than 1-2 seconds to load when user clicks on them
- system should save updated user data and load it up when user logs in

- system will use a canvas token to connect to the Canvas API and grab assignment information 
- user, assignments and game information will be stored in and SQLite database
- python and flask will be used to put data into and take data out of the user database