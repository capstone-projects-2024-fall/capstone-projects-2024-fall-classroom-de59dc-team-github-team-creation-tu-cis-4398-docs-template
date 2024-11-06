// #include <Arduino.h>
// #include <Wire.h>
// #include <BH1750.h>
// #include <Adafruit_seesaw.h>

// // I2C pins
// #define I2C_SDA 21
// #define I2C_SCL 22

// // Create an instance of the BH1750 sensor
// BH1750 lightsensor(0x23);
// Adafruit_seesaw soilSensor;

// void setup() {
//   // Initialize Serial at 115200 baud rate
//   Serial.begin(115200);
  
//   // Initialize I2C
//   Wire.begin(I2C_SDA, I2C_SCL);

//   // Initialize BH1750
//   if (lightsensor.begin(BH1750::CONTINUOUS_HIGH_RES_MODE)) {
//     Serial.println("BH1750 Enabled");
//   } else {
//     Serial.println("BH1750 Error");
//   }
//   // Initialize Soil Moisture Sensor
//   if (!soilSensor.begin(0x36)) { // Default I2C address for Adafruit STEMMA Soil Moisture Sensor
//     Serial.println("Soil Moisture Sensor not found!");
//   } else {
//     Serial.println("Soil Moisture Sensor Enabled");
//   }
// }

// void loop() {
//   // Read and display light level
//   float lux = lightsensor.readLightLevel();
//   if (lux >= 0) {
//     Serial.print("Light Level (lux): ");
//     Serial.println(lux);
//   } else {
//     Serial.println("Error reading BH1750");
//   }

//   // Read and display soil moisture level
//   uint16_t soil_moisture = soilSensor.touchRead(0);  // Reads capacitive touch value for moisture
//   Serial.print("Soil Moisture Level: ");
//   Serial.println(soil_moisture);

//   // Delay between readings
//   delay(1000);
// }
