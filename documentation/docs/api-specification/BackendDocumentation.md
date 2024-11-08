---
sidebar_position: 1
description: What should be in this section.
---

# Backend Documentation

## Overview

The backend architecture for the **PlantParent** application consists of several components that manage user data, plant care presets, AI interactions, and hardware control. The backend handles the following tasks:
- User authentication and registration.
- Management of plant care presets.
- Interaction with hardware components like lights, sensors, and water pumps.
- AI recommendations based on plant data.
- Database management for users, presets, and hardware configurations.

---

## Database Models

### **User**
- **Description**: Represents a user of the application.
- **Attributes**:
  - `username: String`: The username of the user.
  - `password: String`: The password of the user, typically hashed.
  - `email: String`: The user's email address for communication and authentication.
- **Methods**:
  - `register()`: Registers the user in the system.
  - `login()`: Authenticates the user's login credentials.
  - `logout()`: Logs the user out of the system.

---

### **Preset**
- **Description**: Represents a set of saved configurations for plant care calculations.
- **Attributes**:
  - `presetName: String`: The name of the preset.
  - `createdBy: String`: The user who created the preset.
  - `calculationValues: List<Float>`: The list of values (e.g., water amount, light exposure) saved in the preset.
- **Methods**:
  - `savePreset()`: Saves the preset data to the database.
  - `deletePreset()`: Deletes the preset from the system.

---

### **Database**
- **Description**: The main database for storing users, presets, and hardware component data.
- **Attributes**:
  - `users: List<User>`: A list of registered users in the system.
  - `presets: List<Preset>`: A list of saved presets for plant care configurations.
- **Methods**:
  - `addUser(user: User)`: Adds a new user to the database.
  - `removeUser(user: User)`: Removes a user from the database.
  - `savePreset(preset: Preset)`: Saves a preset to the database.
  - `loadPresets(username: String): List<Preset>`: Loads all presets for a specific user.

---

## Hardware Models

### **HardwareComponent**
- **Description**: The base class for hardware components that interact with the system.
- **Attributes**:
  - `componentName: String`: The name of the hardware component (e.g., Light, Sensor, WaterPump).
  - `componentType: String`: The type of hardware (e.g., sensor, actuator).
  - `isActive: Boolean`: Whether the component is currently active.
- **Methods**:
  - `updateSettings(settings: String)`: Updates the hardware settings.
  - `activate()`: Activates the hardware component.
  - `deactivate()`: Deactivates the hardware component.
  - `getStatus()`: Retrieves the current status of the hardware component.

---

### **Light**
- **Description**: A hardware component class representing a light that can be controlled by the system.
- **Attributes**:
  - `brightnessLevel: int`: The brightness level of the light.
- **Methods**:
  - `setBrightness(level: int)`: Adjusts the brightness level of the light.

---

### **LightSensor**
- **Description**: A sensor class that monitors light intensity.
- **Attributes**:
  - `lightIntensity: float`: The current light intensity value.
- **Methods**:
  - `readLightIntensity(): float`: Reads and returns the current light intensity level.

---

### **MoistureSensor**
- **Description**: A sensor class that monitors soil moisture levels.
- **Attributes**:
  - `moistureLevel: float`: The current soil moisture value.
- **Methods**:
  - `readMoistureLevel(): float`: Reads and returns the current soil moisture level.

---

### **TemperatureHumiditySensor**
- **Description**: A sensor class that monitors temperature and humidity levels.
- **Attributes**:
  - `temperature: float`: The current temperature value.
  - `humidity: float`: The current humidity value.
- **Methods**:
  - `readTemperature(): float`: Reads and returns the current temperature.
  - `readHumidity(): float`: Reads and returns the current humidity level.

---

### **WaterPump**
- **Description**: A hardware component class for controlling the water pump used in plant care.
- **Attributes**:
  - `flowRate: int`: The water flow rate from the pump.
- **Methods**:
  - `setFlowRate(rate: int)`: Sets the flow rate of the water pump.

---

This backend documentation provides an overview of the system architecture, including database models, backend logic, hardware interaction, and AI integration. It can be extended or modified based on specific requirements as the project evolves.
