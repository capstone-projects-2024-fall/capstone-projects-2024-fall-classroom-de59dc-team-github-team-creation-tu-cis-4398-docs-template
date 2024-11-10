---
sidebar_position: 4
---

# Features and Requirements
# Functional Requirements
- The application will require the user to have a Canvas account.

- Use of Canvas API.

- The Canvas home page will be shown first to the user. 

- User will be able to import assignments and information about them from canvas 
    - Assignments can be sorted into categories and given different weights according to data from canvas

- Program will sort assignments based on different criteria such as difficulty, due dates, and the amount of effort to complete an assignment. 

- Theme is chosen by the user to reflect the map and quests.
    - Various themes for the user to choose from

- A map showing the assignments for the user.
    - Multiple different areas on the map depending on the subjects and classes of the user.
    - Users will be able to move around the map however they want.

- User can create and customize avatar 

- Shop for the user to buy items and gear for their characters.
    - Multiple different items and gear for parts of the body.

- Rewards players for completing assignments via gold and experience points. 
    - Could gain skills from quests as well

- Tells the user a story through the quests.
    - Quests in an area are linked together to make a cohesive and coherent story line of sorts.

- User can sign out of the app.


# Nonfunctional Requirements

- The App will have a Practical and Comprehensible user interface
    - The main way users will interact with the app will be through the world map
        - Users can move their character around to different locations on the map and interact with different icons on the map to initiate different tasks. The map will have a legend for these icons that will tell the user what type of task/location is marked on the map 
        - The map background displayed will be based on what theme the user picks when they start.
    - There will be clear messaging during interactions with the app
        - When a user fails to connect their canvas account due to improper credentials, or their account isn’t registered in any graded courses on canvas, then the app will alert them of the issue
        - Users will be able to see due dates clearly and icons will indicate the type of assignment/task
- To ensure a consistent theme is kept, the requests and responses from the ChatGPT api will be kept to reference back to or re-generate responses for later.
- User login information will be tied to their canvas account and use SSO.
- A help button will be used to make sure users can log support tickets in the event that the ChatGPT api sends a bad response
