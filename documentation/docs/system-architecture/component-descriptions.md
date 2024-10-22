---
sidebar_position: 1
---

# Component Descriptions

**OpenAI**

OpenAI’s ChatGPT will be used with the basic 3.5 version to generate coding problems and a storyline sequencing the two together. An API key will be needed for this and the ChatGPT will be integrated with the Flask backend to receive prompts. Flask will send a request to the API with the prompt and other details, like how long the response should be. OpenAI will process the prompt and send back a response in JSON format, which contains the generated coding challenge or storyline which Flask will then format to send it to React for display. Using ChatGPT”s API key costs around $0.0015 per 1,000 tokens.

**MongoDB**

MongoDB is an open source database management database program designed to handle structured and unstructured data, making it usable for storing dynamic game data. MongoDB can store user data such as progress, avatar customization and chatbot interactions. This will be done by setting the MongoDB environment, designing the database scheme and connecting MongoDB to Flask Backend. 

**React.js**

React.js is a JavaScript framework for building user interfaces. React.js will handle the visual components of the platform. It will be installed through Node.JS. Components will be created for each part of the game interface like avatar customization, buttons, and score display. These components will be reusable across different sections of the game. Each React component that requires data, such as user progress or avatar details, will send HTTP requests to Flask and get the necessary data, which will be used to update the component's state to reflect real-time changes like a user's score after completing a quest.

**React-Game-Kit**

Component library for making games with React & React Native.The library will be installed using npm which will import the pre-built components. It can handle character movement, battle animations, and environment interactions within the React framework. To handle character movement, React’s input module will listen for keyboard or mouse events, tracking player actions. Animations are handled using the Sprite component, which displays frames from a sequence of images based on game events.  Loop component of the library ensures real-time updates of player actions and environment interactions.

**Restful API with Flask**

Python framework used to build web APIs. The restful api is designed for interacting with React through HTTP requests to handle data exchange between the client and server. It will process user actions by receiving API requests from React. Flask will be used to set up API routes that handle requests from the front end. Each route will handle specific tasks, like saving user progress or retrieving coding challenges. Flask will process the requests, interact with MongoDB to store or retrieve data, and send responses back to React. There are libraries such as pyMongo to connect to MongoDB. It will store or retrieve data as needed, format the response in JSON, and send it back to React via the API route for updating the interface.
