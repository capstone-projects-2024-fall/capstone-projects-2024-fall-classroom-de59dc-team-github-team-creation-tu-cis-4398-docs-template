---
sidebar_position: 1
---

# System Overview
## Keywords
Section 02, Python, IoT, Smart Home, Automation, Home Gardening, Sensors, Embedded Systems, Cloud Integration, Machine Learning

## Project Abstract
This document proposes an application for automating the care of home plants using the Internet of Things. The system will monitor soil moisture, light levels, and temperature using sensors connected to a microcontroller. Data will be processed and analyzed to optimize plant care, with automatic watering, lighting adjustments, and climate control. The user can control and monitor the system remotely via a mobile app or web interface, with real-time alerts and recommendations provided through push notifications.

The app will also feature an AI chat box where the user will have access to a few features. They will be able to submit a picture to the AI and the chat will connect to an API of either chat gpt or a similar plant search API by sending a query, and help decipher what plant type that is based off the picture. If the picture is a little ambiguous the chat will list a few potential types that it can be. If a user does not have a picture to upload the user can describe the plant to the AI chat box by listing its traits, and the AI can deliver with potential types based on the description given. 

In addition, the AI chat box can help answer the users questions regarding plant care, health, etc. by the same process. It will deliver personalized plant care assistance to the user directly based on the information given. It can handle support in the following: 

- Watering Needs: The AI will provide personalized watering advice based on the species of the plant and its current environment taken from the sensors that we will attach and incorporate 
  
- Light Requirements: Based on the plant type the chat box can offer guidance on the best lighting conditions, whether it needs direct sunlight, shade, a mix of both or whatever needed
  
- Soil/Moisture Suggestions: The chat can also recommend appropriate soil/moisture  types for the plant’s needs so it can optimize the growing and health, etc. 


## High-Level Requirement
The product will automate plant care by monitoring environmental conditions and adjusting watering, lighting, and temperature control as needed. Users will interact with the system through a mobile app, receiving real-time updates and recommendations based on data analysis. The system will also have a manual override feature to allow users to control the environment directly.

## Conceptual Design
The system will consist of an embedded microcontroller connected to various sensors. The microcontroller will process the sensor data and control actuators (such as water pumps and lights). The programming language used will be Python. The mobile app will be developed using a framework like Flutter or React Native, and the backend will be hosted on a cloud platform such as AWS or Google Cloud.

## Background
This project will compare existing open-source projects, like the OpenAg initiative. The system proposed improves upon existing solutions, particularly in real-time monitoring, machine learning integration for predictive care, and ease of use for non-technical users.

## Required Resources
### Hardware Resources:
- Microcontroller (Raspberry Pi)
- Sensors (moisture, light, temperature)
- Actuators (water pump, lights)
- Wi-Fi module.
### Software Resources:
- Python
- IoT libraries
- Cloud services (AWS)

## Example Design of Product
Below is a sample design created using AI software to create a visual of the possible final product, with more updates and fine-tuning to come with design updates.

![image0_0](https://github.com/user-attachments/assets/5995adcd-a03c-4d9a-ab93-44084b5e6620)

