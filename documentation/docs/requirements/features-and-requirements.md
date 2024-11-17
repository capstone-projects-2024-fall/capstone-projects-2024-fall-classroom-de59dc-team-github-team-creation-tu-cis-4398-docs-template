---
sidebar_position: 4
---

# Features and Requirements

## Functional Requirments

* Users must be able to create quests through filling out a form that takes in
  * Quest title
  * Coding topic
  * Amount of problems
  * Difficulty level
  * Enemy
  * Background
* Users must be able to create and customize an Avatar
* Game must include a timer for each party member
* Game must be able to generate coding problems based on topic and difficulty chosen
* Game must be able grade answers based on correct output
* Users must be able to seek guidance through the helper-bot
* Users must make an account
* Users must be able to log in created account
* Users must be able to log into existing accounts
* Users can opt to abandon a started quest
* All user data must be stored in MongoDB
 

## Non-Functional Requirements

* Users can track their progress
  * Dashboard with KPIs (Key performance indicators)
* The backend must generate questions based on the topic the user selected
* The backend must generate a storyline for the quest based on the quest form filled out by the user
* The game must sequence through each question utilizing the storyline generated
* The helper-bot must only provide guidance and never give the user the answers out right
* GPT reponses time during grading must be within 1 to 5 seconds
* Automated daily backups must be performed

