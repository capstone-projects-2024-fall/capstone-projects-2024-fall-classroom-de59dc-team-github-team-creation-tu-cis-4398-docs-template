---
sidebar_position: 4
---

# Features and Requirements

## Functional Requirements (sourced from Use Cases)

[//]: # (Use case 1 functional requirement, Create Account)

* Users must be able to create accounts.

* Users must be able to log into created accounts.

* Users must be able to create and customize an Avatar for themselves.

* Users must be able to create "single-player" or "solo" quests to play them by themselves.
* Users must be able to create "multiplayer" or "two-player" quests to play them with others.
* For single-player and multiplayer quests: A user must be able to create quests by filling out a form that takes in:
  * Quest Title
  * Coding Topic
  * Amount of Problems (3 - 8)
  * Difficulty Level
  * Enemy 
  * Background
  * Programming Language
  * Quest Description
* A party code must be generated for every created multiplayer quest. The code is needed so others can form/join a party with the original user (who created the quest).
* Users must be able to join existing parties/rooms with the correct code.
* Users can create guilds to host multiple guild parties and assign multiple quests.
* Users can start, play, and finish a quest solo or with a party.
* For multiplayer quests, users must take turns answering a question/problem within a quest.


* The quest/game component must be loaded and presented on a 2D plane covering the entire screen.

* The quest/game component must include a timer for each party member.

* The quest/game component must be able to generate coding problems based on the topic and the difficulty selected in the quest form.

* The quest/game component must display the selected background in the quest form.

* Users can opt-out or leave a started quest.


* Users must be able to view, access, and modify a code editor component to submit their answers.

* Users must be able to toggle between dark and light mode on the code editor during ongoing quests (depending on their preference).

* The dragon sprite, representing the enemy, should be able to:
  * Take damage (its health bar decreasing).

  * Animate actions (taking or inflicting damage, idle).

* The user sprite, representing the user, should be able to:

  * Take damage (its health bar decreasing).

  * Animate actions (taking or inflicting damage, idle).


* The GPT component of the game must be able to grade answers based on correct and incorrect user(s) input:
  
  * Users must be able to see GPT's grading feedback during an ongoing quest so they may know if they can continue to the next question.

  * GPT must not mark an incorrect answer (such as a blank answer, an answer with content irrelevant to the question, or an answer without an actual algorithm) as a valid solution. 
    * Inaccurately marking answers as valid would let users wrongly move on to the next question.

  * GPT must rate the answers as valid or invalid, determining the course of the quest/game.

  * Answer quality must be indicated/viewable to the user using five stars.

  * User(s) must only be able to move on to the next question after they submit a "valid" answer. Invalid answers must not allow the user(s) to continue to the next set of questions of the quest.

  * Answers that are not at least 50% correct are marked invalid by GPT.

  * Answers that are at least 50% correct are marked valid by GPT.

* The game timer reaching 0 must produce a defeat result unless the dragon's/enemy's health bar reaches 0 by that time (context: all questions have not been correctly answered yet).

* The health bar of a dragon reaching 0 must trigger a victory result.

* The health bar of the user(s) reaching 0 must trigger a defeat result.

* Users must see a quest result at the end of each quest (either victory or defeat).

* Users must be able to log out.

* All user data must be stored in and retrieved from the MongoDB database using the Flask backend.


## Non-Functional Requirements
* The application must support multiple users via WebSockets.
* The backend must generate questions based on the topic the user selected.
* The backend must generate a storyline for the quest based on the quest form filled out by the user.
* The game must sequence through each question utilizing the storyline generated.
* GPT response time during grading must be within 1 to 5 seconds.
* Automated daily backups must be performed.

