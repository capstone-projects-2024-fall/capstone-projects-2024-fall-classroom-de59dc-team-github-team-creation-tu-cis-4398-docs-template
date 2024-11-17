---
sidebar_position: 1
---

# System Overview

## Project Abstract

Devs and Dragons is a single-player web-based application designed for computer science education. It utilizes a GPT bot to generate unique quests tailored to the individual learning needs of each user. The application includes an AI helper bot that provides guidance during quests. Users can track and review completed quests to reinforce their learning.

## High Level Requirements

### Game Mechanics

**Timed Challenge:** The user is prompted one question at a time. A timer is set based on the difficulty chosen and starts to tick down after a question is prompted. When the timer runs out, the solution inputted by the user, finished or not, will be graded. 

**How to Win:** The user wins after completing all questions in the quest correctly.

**How to Lose:** The user loses health after submitting no answer or getting a question wrong. The user has an oppurtunity to continue to solve the question. After loosing all health, the user loses. There are no oppurtunities during the quest to regain lost health.

### Grading User Input
- Ensures that proper logic is being used to solve
  - A problem expecting an output of "10" will not accept "return 10" as a correct input
- GPT grades input based on output
- GPT rates successful answers from 1 to 3 stars
  - 1 being extremely inefficient
  - 2 being decently efficient
  - 3 being the most efficient

### Quest Creation
All users can create a quest by filling out a form that specifies the difficulty, number of problems, computer science related topic(s), enemy, and background.

## Conceptual Design

The frontend of Devs and Dragons will be developed using React.js to build UI components and manage the application state. The backend will be powered by Flask, handling user authentication, API requests, and integrating with the OpenAI GPT model for generating and grading coding challenges. MongoDB will be the database, storing user data, quest configurations, and coding submissions. Pygames will be used to create the game portion where it will handle the animations, game mechanics, and overall visuals of the quest expereince.

## Background

Educators face the challenge of students’ differences in preparedness. Students vary in coding experience when entering the computer science program. This makes it difficult to teach in a way that is engaging and effective for everyone. 

Devs and Dragons addresses this challenge by leveraging AI to generate a peronal gamified learning experience aimed to strengthen and reinforce a student's coding skills.
