---
sidebar_position: 2
---

# System Block Diagram


# High-level design of the “AI Study RPG”.
This system block diagram illustrates the flow and interaction between different components of the AI Study RPG project. Users interact with the frontend (built with React) to log in, view assignments, and customize their avatars. The frontend communicates with the backend (Python) for data processing, which integrates with the Canvas API to gather assignments and deadlines. The backend also uses ChatGPT for prioritizing tasks and gamifying the user's experience. A SQL database stores and retrieves user-related data, such as avatar details and progress, supporting both data storage and display functionalities in the system.

![Diagram](System_Block_Diagram.webp) 
