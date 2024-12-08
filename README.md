[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=15806178)
<div align="center">

# Devs and Dragons
[![Report Issue on Jira](https://img.shields.io/badge/Report%20Issues-Jira-0052CC?style=flat&logo=jira-software)](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/DT/issues)
[![Deploy Docs](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml/badge.svg)](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml)
[![Documentation Website Link](https://img.shields.io/badge/-Documentation%20Website-brightgreen)](https://capstone-projects-2024-fall.github.io/project-techtrek/docs/intro)


</div>


## Keywords

Section 001, React, Flask, MongoDB, GPT Grading, Sockets, Server Hosting Multiplayer, Full Stack Game

## Project Abstract

Devs and Dragons is a multiplayer web-based application that's designed as a gamified learning platform for Computer Science students. Users can form parties of two to four members to tackle quests involving coding challenges. Team members take turns solving problems within a time limit determined by the selected difficulty level. Quests and their coding problems are generated and graded by a GPT bot based on user(s) input, problem type, difficulty, and quest description.

## High Level Requirement

### Group Dynamics
- **Party:** Small group of 2 to 4 members.
- **Create Room:**  User can create a quest and invite others to join by sharing a unique room code.
- **Join Room:**  User can join an existing quest by entering the shared room code.

### Game Mechanics
![Timer](https://github.com/user-attachments/assets/ab9dd4d5-2544-461d-a894-28ed702d74bf)             
**Figure 1.**
**Timed Challenge:** The party is given a set amount of time (based on the selected difficulty) to solve each problem. The amount of time is divided equally among the party members.

![visualConcept_battle](https://github.com/user-attachments/assets/e323bf35-b6bb-4b4e-91dd-a4346f2886f7)
**Figure 2.**

**Turn-based coding:** Each party member takes turns writing code by picking up where their party members left off. If the answer is incorrect after cycling through all of the party, then the party loses health. The timer restarts and the member who went first will start again. This repeats until the party fixes their solution to solve the problem, or the party's health reaches zero (which means the party lost).

### Grading User Input
- GPT grades user(s) input.
- GPT grading does not start until all members have taken a turn.
- GPT ensures and verifies correct logic is used to solve problems. E.g., for a problem which the solution is 10, GPT will not accept a function with a one liner being "return 10" (for the answer).
- GPT rates answers from 1 to 5 stars, based on a 10-point grading scale:
  - **1 star**: Rating of 0% - 30% signfies a solution which is extremely inefficient, irrelevant, or incorrect.
  - **2 stars**: Rating of 40% – 50% signifies a solution which is generally inefficient, partially helpful, but still unclear or incomplete.
  - **3 stars**: Rating of 60% to 70% signifies a solution which is efficient clear, relevant, and generally complete.
  - **4 stars**: Rating of 80% to 90% signifies a solution which is highly efficient and exceeds expectations.
  - **5 stars**: Rating of 100% signfies an exceptional and perfect solution.

### Quest Creation
All users can create a quest by filling out a form that specifies the difficulty, number of problems, topic of problems (Computer Science related), enemy, and background.

### Starting a Quest
In multiplayer mode, a party of two or more users are needed in order to start a multiplyer (or "Two Player") quest. The user who created the quest can provide a unique code for others to join the quest.

## Conceptual Design

The frontend of Devs and Dragons is developed using React JS to build UI components and manage the application state. The backend is powered by Flask, API requests, and an integration with OpenAI's GPT (Model 4) for generating and grading users' answers to coding challenges (quests). The MongoDB database stores the user data, quest configurations, and coding submissions. WebSockets manage the multiplayer connections to allow players to collaborate in real-time during ongoing quests.

## Background

Educators often face the challenge of addressing differences in students’ preparedness as coding experience can vary widely among Computer Science freshmen. This range of difference in initial knowledge makes it difficult to teach in a way that is engaging and effective for everyone. Additionally, the importance of soft skills, particularly teamwork and collaboration, can be hard to implement when some students may feel discouraged due to many students choosing to work alone or within their circle. Devs and Dragons addresses these challenges by combining the multiplayer dynamic of video games with the rigor of programming challenges. By fostering a collaborative environment, the platform not only aims to aid individual learning but also to enhance group problem-solving skills.

## Required Resources

https://capstone-projects-2024-fall.github.io/project-techtrek/docs/requirements/general-requirements

## Collaborators

[//]: # ( readme: collaborators -start )
<table>
<tr>
    <td align="center">
        <a href="https://github.com/AnimishTemple">
            <img src="https://avatars.githubusercontent.com/u/143827597?v=4" width="100;" alt="Animish"/>
            <br />
            <sub><b>Animish Tenneti</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Prince-Nahar">
            <img src="https://avatars.githubusercontent.com/u/97692251?v=4" width="100;" alt="Prince"/>
            <br />
            <sub><b>Prince Nahar</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/JCreasy00">
            <img src="https://avatars.githubusercontent.com/u/93548948?v=4" width="100;" alt="Jake"/>
            <br />
            <sub><b>Jake Creasy</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/bhoiwalapreet">
            <img src="https://avatars.githubusercontent.com/u/123014725?v=4" width="100;" alt="Preet"/>
            <br />
            <sub><b>Preet Bhoiwala</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Jericho-R-Orienza">
            <img src="https://avatars.githubusercontent.com/u/93217801?v=4" width="100;" alt="Jericho"/>
            <br />
            <sub><b>Jericho Orienza</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/IshanAgg125">
            <img src="https://avatars.githubusercontent.com/u/143641776?v=4" width="100;" alt="Ishan"/>
            <br />
            <sub><b>Ishan Aggarwal</b></sub>
        </a>
    </td>
</tr>
</table>

[//]: # ( readme: collaborators -end )
