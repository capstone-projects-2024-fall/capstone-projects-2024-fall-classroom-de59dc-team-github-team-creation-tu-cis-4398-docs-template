[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=15801588)
<div align="center">

# Automated Plant Caregiver
[![Report Issue on Jira](https://img.shields.io/badge/Report%20Issues-Jira-0052CC?style=flat&logo=jira-software)](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/DT/issues)
[![Deploy Docs](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml/badge.svg)](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml)
[![Documentation Website Link](https://img.shields.io/badge/-Documentation%20Website-brightgreen)](https://capstone-projects-2024-fall.github.io/project-automated-plant-caregiver/)

</div>


## Keywords

Section 02, Python, IoT, Smart Home, Automation, Home Gardening, Sensors, Embedded Systems, Cloud Integration, Machine Learning

## Project Abstract

This document proposes an application for automating the care of home plants using the Internet of Things. The system will monitor soil moisture, light levels, and temperature using sensors connected to a microcontroller. Data will be processed and analyzed to optimize plant care, with automatic watering, lighting adjustments, and climate control. The user can control and monitor the system remotely via a mobile app or web interface, with real-time alerts and recommendations provided through push notifications.


## High-Level Requirement

The product will automate plant care by monitoring environmental conditions and adjusting watering, lighting, and temperature control as needed. Users will interact with the system through a mobile app, receiving real-time updates and recommendations based on data analysis. The system will also have a manual override feature to allow users to control the environment directly.

## Conceptual Design

The system will consist of an embedded microcontroller connected to various sensors. The microcontroller will process the sensor data and control actuators (such as water pumps and lights). The programming language used will be Python. The mobile app will be developed using a framework like Flutter or React Native, and the backend will be hosted on a cloud platform such as AWS or Google Cloud.

## Background

This project will compare existing open-source projects, like the OpenAg initiative. The system I propose improves upon existing solutions, particularly in the areas of real-time monitoring, machine learning integration for predictive care, and ease of use for non-technical users.

## Required Resources
### Hardware Resources: 
- Microcontroller (Raspberry Pi)
- Sensors (moisture, light, temperature)
- Actuators (water pump, lights)
- Wi-Fi module.
### Software Resources: 
- Python
- IoT libraries
- Mobile app development framework
- Cloud services (AWS/Google Cloud).
