





[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=15801643)
<div align="center">

![WizardLogo](https://github.com/user-attachments/assets/96ef04d5-8bae-4201-9c32-174cab6bf3e4)
# Canvas Quest
[![Report Issue on Jira](https://img.shields.io/badge/Report%20Issues-Jira-0052CC?style=flat&logo=jira-software)](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/DT/issues)
[![Deploy Docs](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml/badge.svg)](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml)
[![Documentation Website Link](https://img.shields.io/badge/-Documentation%20Website-brightgreen)](https://applebaumian.github.io/tu-cis-4398-docs-template/)


</div>


## Keywords

Section 02, web application, JavaScript, HTML, CSS, Python, Flask, SQL, education, learning, studying, Canvas, RPG game

## Project Abstract
Canvas Quest will streamline the assignment process and enhance student engagement through gamification of coursework. This application is catered towards students who often struggle with organizing, prioritizing, and finishing assignments. 

The software will integrate Canvas API  by gathering students’ assignments, deadlines, and coursework details from Canvas. Once all of this data has been collected, it will then pass information to our website allowing users to have an overview of their assignments, and help prioritize specific assignments. Users will have the ability to sort assignments based on different criteria such as difficulty, due dates, and the amount of effort to complete an assignment. The difficulty will be calculated by the length of the due date for the assignment and effort required to finish a task. 

What makes this app unique is the gamification aspect for canvas assignments. The app will turn task completion into an RPG gaming experience. The theme of the game is set in a fantasy world of edo period Japan where players can gain experience points and in-game currency (gold), buy gear for their character, and build up the world by completing assignments on time. This can help students stay organized and also transforms studying into a more engaging and enjoyable process.

## High Level Requirement

This app requires an internet connection to function and is accessible on any device with a modern web browser. Users must have Python 3.11 (any version), SQLite, Node.js, and Flask installed on their devices. Additionally, users can connect their Canvas accounts to the app for seamless integration.

The app incorporates a reward system inspired by RPG mechanics. Users earn gold for completing assignments, with the amount awarded based on the size of the assignment. As users complete more assignments, the in-game world evolves—new NPCs (non-playable characters) and buildings are introduced, enhancing the experience.

By integrating directly with Canvas, the app enables users to access, track, and manage their assignments in an engaging and interactive way.

## Conceptual Design

The app will be available on through a webpage on a desktop or laptop. We will be using React to build the app. The app will help walkthrough new and returning users to sign up or  login. New users will have to input their Canvas Key, name, nickname, email, password, and a motto.

There will be a dashboard upon login where it will show all current semester assignments. Students will be greeted with a customizable dashboard. The dashboard will offer the ability to personalize the layout; not only that, but students can also navigate through different sections such as Assignments, Store, Profile, and view current tasks, deadlines, and progress at a glance. Users will also be able to get ai generated hints on their assignments if they need help. 

In the game map, users will be able to interact with npcs, view what they have in their inventory, attack enemies, take damage and view the progress they've made on worldbuilding. When the users complete a certain percentage of the assignments they have to do, more features will be added to the game. 

Python will power the backend, managing user interactions, data processing, and integration with external APIs. Another technology that will be utilized is SQL, SQL will be used to store users data, including their avatar's gear, experience points, achievements, and progression within the RPG game. Flask will be used to manage this input and output from this database. Students will have an avatar that can earn XP by completing assignments, unlock new gear that could drop randomly by again, completing assignments, or purchase it through the shop. There will be achievements based on their academic performance and task completion. As the app evolves, new features like study groups, competitive leaderboards, and in-app study challenges could be added to enhance both individual and group motivation.

## Background

To differentiate from an existing platform like Habitica, we are trying to push the gamification aspect even further and focus specifically on helping students achieve educational goals. The main goal is to be more immersive and deepen engagement while maintaining a focus on academic productivity. Instead of simple lists, each assignment could be part of an evolving quest where the student can freely move around the map and talk to an NPC to start an assignment. Users will earn gold upon completion of tasks and they will contribute to building up the map. Students can earn customizable gear that directly influences their avatar’s strength in the game. The state of their map and inventory can be tied directly to long-term academic growth, encouraging students to not only complete tasks but also reflect on their learning progress. Ultimately, the Study RPG Game Organizer app offers a more immersive, engaging, and adaptive experience than Habitica, deeply integrating academic tasks with RPG gameplay for long-term motivation and productivity. 

## Required Resources
This project leverages a diverse set of software technologies and frameworks, including JavaScript, React, HTML/CSS, Flask, SQLite, the Canvas API, and the OpenAI API. The front-end will be built using React for an interactive and responsive user experience, while the back-end will be powered by Flask, seamlessly integrated with SQLite for efficient data management. 


## Instructions
Ensure you have <a href = 'https://nodejs.org/en/download/package-manager'>NPM/Node.js</a> and python installed before attempting to run the website.

    1. Clone a local copy of CanvasQuest
    2. Open a terminal window and navigate to the cloned copy's root directory
    3. Run the following command: cd Canvas_Quest
    4. Then run: npm install
    5. Finally, run: npm run dev
    6. Next, open a new terminal window and navigate to the project's src folder (Canvas_Quest/src)
    7. Run the following command: pip install requests flask flask-cors
    8. Finally, run: Python app.py
    9. In a browser, navigate to http://localhost:5173/ and the site will display.

## Website
Link: https://subtle-chimera-6e4cea.netlify.app/ 
Backend not integrated!!

## Collaborators


[//]: # ( readme: collaborators -start )
<table>
<tr>
    <td align="center">
        <a href="https://github.com/tug94192">
            <img src="https://avatars.githubusercontent.com/tug94192" width="100;" alt="ApplebaumIan"/>
            <br />
            <sub><b>Jordan Santoli</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/mikey6002">
            <img src="https://avatars.githubusercontent.com/mikey6002" width="100;" alt="Barry"/>
            <br />
            <sub><b>Barry Lin</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Lyss1303">
            <img src="https://avatars.githubusercontent.com/Lyss1303" width="100;" alt="ApplebaumIan"/>
            <br />
            <sub><b>Alyssa Richner</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/IskraLlupa25">
            <img src="https://avatars.githubusercontent.com/IskraLlupa25" width="100;" alt="ApplebaumIan"/>
            <br />
            <sub><b>Iskra Lupa</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/MTruong5">
            <img src="https://avatars.githubusercontent.com/MTruong5" width="100;" alt="ApplebaumIan"/>
            <br />
            <sub><b>Madison Truong</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/ApplebaumIan">
            <img src="https://avatars.githubusercontent.com/u/9451941?v=4" width="100;" alt="ApplebaumIan"/>
            <br />
            <sub><b>Ian Applebaum</b></sub>
        </a>
    </td>
</tr>
</table>

[//]: # ( readme: collaborators -end )
