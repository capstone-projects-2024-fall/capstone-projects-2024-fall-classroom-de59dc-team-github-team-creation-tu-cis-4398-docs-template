---
sidebar_position: 2
---

# System Block Diagram

<iframe width="768" height="432" src="https://miro.com/app/embed/uXjVKgS0PLA=/?pres=1&frameId=3458764601497934026&embedId=647218527620" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>
**Figure 3.** High level design of the Tech Quest application

## Description
**Figure 3** above illustrates Devs and Dragons's full stack. The user interacts with the frontend that is built using **React**. The game component is created using a react library called, **React-Game-Kit**. The frontend will handle user actions and sends **RESTful API** requests to the backend.

The backend is built using **Flask**. It will process game logic, verify user inputs, and manage the game state. The backend communicates with the **MongoDB** database, hosted on **AWS,** to store and retrieve data such as quest made, guilds joined, and in-game answers. 

Multiplayer synchronization will be managed by using **AWS,** ensuring that all players remain in sync during a quest.

The back end will use **OpenAI API** calls to comunicate with the GPT bot. The GPT bot will be utilized for three tasks:
- generate code problems for quests
- generate a storyline to sequence problems within a quest
- grade user answers during a quest
