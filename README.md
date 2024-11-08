[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=15801588)
<div align="center">

# PlantParent
[![Report Issue on Jira](https://img.shields.io/badge/Report%20Issues-Jira-0052CC?style=flat&logo=jira-software)](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/DT/issues)
[![Deploy Docs](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml/badge.svg)](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml)
[![Documentation Website Link](https://img.shields.io/badge/-Documentation%20Website-brightgreen)](https://capstone-projects-2024-fall.github.io/project-automated-plant-caregiver/)

</div>


## Keywords

Section 02, React, Figma, Node.js, Javascript, IoT, Smart Home, Automation, Home Gardening, Sensors, Embedded Systems, Cloud Integration, AWS, Amplify, Machine Learning, AI 

## Project Abstract

This document proposes an application for automating the care of home plants using the Internet of Things. The system will monitor soil moisture, light levels, and temperature using sensors connected to a microcontroller. Data will be processed and analyzed to optimize plant care, with automatic watering, lighting adjustments, and climate control. The user can control and monitor the system remotely via a web interface, with real-time alerts and recommendations provided through push notifications.


## High-Level Requirement

The product will automate plant care by monitoring environmental conditions and adjusting watering, lighting, and temperature control as needed. Users will interact with the system through a web browser, receiving real-time updates and recommendations based on data analysis. The system will also have a manual override feature to allow users to control the environment directly.

## Conceptual Design

The system will consist of a microcontroller connected to various sensors. The microcontroller will process the sensor data. The programming language used will be Javascript. The web browser will be developed using a framework like React, and the backend will be hosted on a cloud platform such as AWS Amplify. LLM AI will also be integrated into the application to aid users in monitoring their plant as the AI will have context about the plants that are being taken care of by the user.

## Background

This project will compare existing open-source projects, like the OpenAg initiative. The system I propose improves upon existing solutions, particularly in the areas of real-time monitoring, machine learning integration for predictive care, and ease of use for non-technical users.

## Required Resources
### Hardware Resources: 
- ESP32 DevKit V1
- Adafruit STEMMA Soil Sensor - I2C Capacitive Moisture Sensor
- BH1750FVJ Light Sensor
- AM2320 Digital Temperature and Humidity Sensor
- Submersible 3V DC Water Pump 
- WS2812B LED Pixel Strip
### Software Resources: 
- AWS Amplify
- AWS EC2
- AWS S3/DynamoDB
- Node.js
- React
- PlatformIO
- CSS

## How to run locally
- Download the ZIP

  ![image](https://github.com/user-attachments/assets/d9d6f791-1456-403b-bcfa-dffb266402e8)

- Extract ZIP files
- Navigate to plantparent folder (cd plantparent)

  ![image](https://github.com/user-attachments/assets/33d64c27-5304-4ee3-b55a-e05ebe68e6b7)

- Run these commands
    - npm install
    - npm start
- The development server starts automatically
- If not a link should also have been provided:

  ![image](https://github.com/user-attachments/assets/2ffb84e7-91e7-4f8f-8de5-cb50ba40f146)



