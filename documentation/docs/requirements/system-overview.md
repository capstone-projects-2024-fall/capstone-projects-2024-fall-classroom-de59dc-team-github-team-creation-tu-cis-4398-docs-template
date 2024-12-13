---
sidebar_position: 1
---

# System Overview
# Project Abstract

Canvas Quest will streamline the assignment process and enhance student engagement through gamification of coursework. This application is catered towards students who often struggle with organizing, prioritizing, and finishing assignments. 

The software will integrate Canvas API  by gathering students’ assignments, deadlines, and coursework details from Canvas. Once all of this data has been collected, it will then pass information to our website allowing users to have an overview of their assignments, and help prioritize specific assignments. Users will have the ability to sort assignments based on different criteria such as difficulty, due dates, and the amount of effort to complete an assignment. The difficulty will be calculated by the length of the due date for the assignment and effort required to finish a task. 

What makes this app unique is the gamification aspect for canvas assignments. The app will turn task completion into an RPG gaming experience. The theme of the game is set in a fantasy world of edo period Japan where players can gain experience points and in-game currency (gold), buy gear for their character, and build up the world by completing assignments on time. This can help students stay organized and also transforms studying into a more engaging and enjoyable process.


# Conceptual Design 

The app will be available on through a webpage on a desktop or laptop. We will be using React to build the app. The app will help walkthrough new and returning users to sign up or  login. New users will have to input their Canvas Key, name, nickname, email, password, and a motto.

There will be a dashboard upon login where it will show all current semester assignments. Students will be greeted with a customizable dashboard. The dashboard will offer the ability to personalize the layout; not only that, but students can also navigate through different sections such as Assignments, Store, Profile, and view current tasks, deadlines, and progress at a glance. Users will also be able to get ai generated hints on their assignments if they need help. 

In the game map, users will be able to interact with npcs, view what they have in their inventory, attack enemies, take damage and view the progress they've made on worldbuilding. When the users complete a certain percentage of the assignments they have to do, more features will be added to the game. 

Python will power the backend, managing user interactions, data processing, and integration with external APIs. Another technology that will be utilized is SQL, SQL will be used to store users data, including their avatar's gear, experience points, achievements, and progression within the RPG game. Flask will be used to manage this input and output from this database. Students will have an avatar that can earn XP by completing assignments, unlock new gear that could drop randomly by again, completing assignments, or purchase it through the shop. There will be achievements based on their academic performance and task completion. As the app evolves, new features like study groups, competitive leaderboards, and in-app study challenges could be added to enhance both individual and group motivation.


# Background

To differentiate from an existing platform like Habitica, we are trying to push the gamification aspect even further and focus specifically on helping students achieve educational goals. The main goal is to be more immersive and deepen engagement while maintaining a focus on academic productivity. Instead of simple lists, each assignment could be part of an evolving quest where the student can freely move around the map and talk to an NPC to start an assignment. Users will earn gold upon completion of tasks and they will contribute to building up the map. Students can earn customizable gear that directly influences their avatar’s strength in the game. The state of their map and inventory can be tied directly to long-term academic growth, encouraging students to not only complete tasks but also reflect on their learning progress. Ultimately, the Study RPG Game Organizer app offers a more immersive, engaging, and adaptive experience than Habitica, deeply integrating academic tasks with RPG gameplay for long-term motivation and productivity. 
.
