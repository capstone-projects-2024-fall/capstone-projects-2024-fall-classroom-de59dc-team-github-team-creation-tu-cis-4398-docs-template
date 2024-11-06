---
sidebar_position: 1
---
# Class Diagram
```mermaid
classDiagram
    class WebApplication {
        +String appName = "PlantParent"
        +String version = 1
        +startApp()
        +stopApp()
    }
    class PageDisplay {
        +String page
        +showPage(page: String)
        +openTutorial()
    }
    class FrontPage {
        +String featuredContent
        +displayFeaturedContent()
    }
    class CalculationsPage {
        +String plantDetails
        +List<Float> inputValues
        +List<Preset> savedPresets
        +setSettings()
        +askAI()
        +loadPresets()
        +selectPreset(preset: Preset)
        +displayPresets()
    }
    class AIPage {
        +String aiModel
        +String userPrompt
        +String aiResponse
        +runAIModel()
        +displayResponse(userPrompt: String): String
    }
    class LoginPage {
        +String username
        +String password
        +String email
        +authenticate()
        +forgotPassword()
    }
    class RegisterPage {
        +Map<String, String> userDetails
        +registerUser()
        +validateInput()
    }
    class NavBar {
        +List<String> menuItems
        +renderMenu()
    }
    class TutorialPage {
        +String tutorialContent
        +String tutorialURL
        +open()
    }
    class User {
        +String username
        +String password
        +String email
        +register()
        +login()
        +logout()
    }
    class Preset {
        +String presetName
        +String createdBy
        +List<Float> calculationValues
        +savePreset()
        +deletePreset()
    }
    class Database {
        +List<User> users
        +List<Preset> presets
        +addUser(user: User)
        +removeUser(user: User)
        +savePreset(preset: Preset)
        +loadPresets(username: String): List<Preset>
    }
    class HardwareComponent {
        +String componentName
        +String componentType
        +boolean isActive
        +updateSettings(settings: String)
        +activate()
        +deactivate()
        +getStatus()
    }
    class Light {
        +int brightnessLevel
        +setBrightness(level: int)
    }
    class LightSensor {
        +float lightIntensity
        +readLightIntensity(): float
    }
    class MoistureSensor {
        +float moistureLevel
        +readMoistureLevel(): float
    }
    class TemperatureHumiditySensor {
        +float temperature
        +float humidity
        +readTemperature(): float
        +readHumidity(): float
    }
    class WaterPump {
        +int flowRate
        +setFlowRate(rate: int)
    }
    WebApplication --> PageDisplay
    WebApplication --> Database
    PageDisplay <|-- LoginPage
    PageDisplay <|-- RegisterPage
    PageDisplay <|-- FrontPage
    PageDisplay <|-- CalculationsPage
    PageDisplay <|-- AIPage
    PageDisplay --> TutorialPage : All Pages have access
    PageDisplay --> NavBar: All Pages have access
    CalculationsPage --> Database : Access Presets and Hardware
    LoginPage --> Database : Access List of Users
    RegisterPage --> Database: Checks or Adds to List of Users
    AIPage --> CalculationsPage: Gives Recommendations
 
    Database --> User
    Database --> Preset
    Database --> HardwareComponent
    User "1" --> "0..*" Preset
    HardwareComponent <|-- Light
    HardwareComponent <|-- LightSensor
    HardwareComponent <|-- MoistureSensor
    HardwareComponent <|-- TemperatureHumiditySensor
    HardwareComponent <|-- WaterPump
```
# Descriptions of Each Class

### WebApplication
Manages the core functionality of the PlantParent app, with features to start and stop the application. It connects to both the page display and the database for managing the system.

### PageDisplay
Controls the visual interface of the app, displaying different pages such as the front page, calculation settings, AI recommendations, login, and register. It can also open the tutorial.

### FrontPage
Displays the featured content on the application’s homepage, showcasing primary information.

### CalculationsPage
Handles settings for plant care, allowing the user to input data, interact with saved presets, and request AI recommendations. It also manages settings for connected hardware.

### AIPage
Manages AI interactions, running the AI model based on user input and providing responses. It connects with the calculations page to give plant care advice.

### LoginPage
Authenticates users through their login credentials, with options for password recovery.

### RegisterPage
Registers new users by collecting and validating their details, and storing them in the database.

### NavBar
Renders a menu for navigating between the different pages in the application.

### TutorialPage
Displays instructional content, guiding users through app functionality and linking to external tutorials.

### User
Represents a user of the application, managing registration, login, and logout actions.

### Preset
Stores preset plant care configurations, allowing users to save and delete personalized settings.

### Database
Stores users, presets, and hardware components, facilitating data retrieval and storage for the application.

### HardwareComponent
Represents the different hardware devices used in the app, with functionality to activate, deactivate, and update settings.

### Light
A type of hardware component controlling the brightness level of a light source.

### LightSensor
A sensor hardware component that reads and returns the light intensity level.

### MoistureSensor
Reads and returns the soil moisture level for plant care.

### TemperatureHumiditySensor
Measures and reports the temperature and humidity levels in the environment.

### WaterPump
A component controlling the water flow rate to manage irrigation for the plants.


