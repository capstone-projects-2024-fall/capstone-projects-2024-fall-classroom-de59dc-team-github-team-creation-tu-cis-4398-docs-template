---
sidebar_position: 1
---

# System Overview

## Project Abstract

Devs and Dragons is a multiplayer web-based application that provides a gamified learning platform for computer science students and educators. Users must form parties of two to four members to take on quests that involve solving coding problems. Alternatively, users can create guilds to hold multiple parties and assign multiple quests. Each user in a party takes turns coding to solve the problem with a given time constraint based on difficulty. Each quest and the problems created for the quest are generated using user input and a GPT bot. 

## High Level Requirements

### Group Dynamics
- **Party:** Small group of 2 to 4 members
- **Guild:** Large group capable of holding up to 150 members, can be assigned multiple quests
- **Guild Party:** Similar to a _Party_, but are made within a guild

### Game Mechanics
![Timer](https://github.com/user-attachments/assets/ab9dd4d5-2544-461d-a894-28ed702d74bf)             
**Figure 1.**
**Timed Challenge:** The party is given a set amount of time that is based on difficulty to solve each problem. The amount of time is divided equally amongst the party members.

![visualConcept_battle](https://github.com/user-attachments/assets/e323bf35-b6bb-4b4e-91dd-a4346f2886f7)
**Figure 2.**

**Turn-based coding:** Each party member takes turns coding, picking back off where their members left off. After the last member is finished, if the final code is not correct, then the party loses health. The timer restarts and the member who went first will start.  This repeats until the party fixes their code to solve the problem, or the party's health reaches zero.

### Grading User Input
- Grading does not start until all members have taken a turn
- Ensures that proper logic is being used to solve
  - A problem expecting an output of "10" will not accept "return 10" as a correct input
- GPT rates successful answers from 1 to 3 stars
  - 1 being extremely inefficient
  - 2 being decently efficient
  - 3 being the most efficient

### Quest Creation
All users can create a quest by filling out a form that specifies the difficulty, number of problems, computer science related topic(s), enemy, and background.

### Starting a Quest
User must be in a party of two or more people in order to start a quest made by the user. Guild parties can start a quest that is assigned to their guild. Multiple guild parties can start and complete the same quest.

## Conceptual Design
The frontend of Devs and Dragons will be developed using React.js to build UI components and manage the application state. The backend will be powered by Flask, handling user authentication, API requests, and integrating with the OpenAI GPT model for generating and grading coding challenges. MongoDB will be the database, storing user data, quest configurations, and coding submissions. React Game Kit will develop the game component using its tools to create and manage animations and game mechanics.

## Background
Educators face the challenge of students’ differences in preparedness. Students vary in coding experience when entering the computer science program. This makes it difficult to teach in a way that is engaging and effective for everyone. Additionally, the importance of soft skills, particularly teamwork and collaboration, can be hard to implement when some students may feel discouraged due to many students choosing to work alone or within their circle.
Devs and Dragons addresses these challenges by combining the multiplayer dynamic of video games with the rigor of programming challenges. By fostering a collaborative environment, the platform not only aims to aid individual learning but also enhances group problem-solving skills.