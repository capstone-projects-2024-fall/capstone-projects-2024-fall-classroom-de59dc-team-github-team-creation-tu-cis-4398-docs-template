#include <Arduino.h>
#include <Wire.h>
#include <BH1750.h>
#include <WiFi.h>
#include <HTTPClient.h>  // Include HTTPClient for POST requests
#include <Adafruit_seesaw.h>
#include <FS.h>

// I2C pins
#define I2C_SDA 21 
#define I2C_SCL 22 

// Create instances of sensors
BH1750 lightsensor(0x23);
Adafruit_seesaw soilSensor;

// WiFi credentials
const char* ssid = "tuguestwireless";
const char* password = "";

// Your API endpoint URL
const char* apiUrl = "https://zxk89h80gg.execute-api.us-east-1.amazonaws.com/dev/data";

// Function to send POST request
bool sendPostRequest(String jsonPayload) {
  HTTPClient http;
  http.begin(apiUrl);  // Specify the API URL
  http.addHeader("Content-Type", "application/json");  // Set the content type

  int httpResponseCode = http.POST(jsonPayload);  // Send the POST request

  if (httpResponseCode > 0) {
    String response = http.getString();  // Get the response
    Serial.println("HTTP Response code: " + String(httpResponseCode));
    Serial.println("Response: " + response);
    http.end();  // End the HTTP connection
    return true;
  } else {
    Serial.println("Error sending POST: " + String(httpResponseCode));
    http.end();
    return false;
  }
}

// Setup function
void setup() {
  // Initialize the Serial Monitor
  Serial.begin(115200); 

  // Initialize the I2C communication
  Wire.begin(I2C_SDA, I2C_SCL); 

  // Seed the random number generator
  randomSeed(analogRead(0));

  // Connect to the WiFi network
  WiFi.begin(ssid, password); 
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // Initialize the BH1750 sensor
  if (lightsensor.begin(BH1750::CONTINUOUS_HIGH_RES_MODE)) {
    Serial.println("BH1750 Enabled");
  } else {
    Serial.println("BH1750 Error");
  }

  // Initialize the Soil Moisture Sensor
  if (!soilSensor.begin(0x36)) { 
    Serial.println("Soil Moisture Sensor not found!");
  } else {
    Serial.println("Soil Moisture Sensor Enabled");
  }
}

// Loop function
void loop() {
  // Check if WiFi is connected
  if (WiFi.status() == WL_CONNECTED) {
    // Read sensor data
    float lux = lightsensor.readLightLevel();
    uint16_t soil_moisture = soilSensor.touchRead(0);

    // Randomly generate temperature value between 20.0 and 30.0 degrees Celsius
    float temp = random(2000, 3000) / 100.0;

    // Create JSON string to send
    String jsonPayload = "{\"lux\": " + String(lux) + ", \"soil_moisture\": " + String(soil_moisture) + ", \"temp\": " + String(temp) + "}";

    // Send the POST request
    if (sendPostRequest(jsonPayload)) {
      Serial.println("Data sent successfully");
      Serial.println("Data: " + jsonPayload);
    } else {
      Serial.println("Failed to send data");
    }
  }

  // Wait for 5 seconds before sending the next data
  delay(5000);
}

