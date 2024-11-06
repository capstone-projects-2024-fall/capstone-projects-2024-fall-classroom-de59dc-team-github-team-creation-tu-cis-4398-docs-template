const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const app = express();
const port = 3001; 

// Global variable to store the latest sensor reading
let currentLux = 0;

// Initialize Serial Connection
async function initializeSerial() {
    try {
        const serialPort = new SerialPort({
            path: 'COM5',  // Fixed COM port
            baudRate: 115200
        });

        const parser = serialPort.pipe(new ReadlineParser());

        // Handle incoming data
        parser.on('data', (line) => {
            try {
                const value = parseFloat(line);
                if (!isNaN(value) && value >= 0) {
                    currentLux = value;
                    console.log(`Updated light level: ${currentLux} lux`);
                }
            } catch (error) {
                // Skip invalid data
            }
        });

        serialPort.on('error', (err) => {
            console.error('Serial port error:', err);
        });

        serialPort.on('open', () => {
            console.log('Serial port COM5 is open');
        });

    } catch (error) {
        console.error('Error initializing serial port:', error);
    }
}

// Enable CORS for development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Middleware to parse JSON requests
app.use(express.json());

// Simple route to test the server
app.get('/', (req, res) => {
    res.send('Hello from the backend server!');
});

// Endpoint for light sensor data
app.get('/lightsensor', (req, res) => {
    res.json({
        lux: currentLux,
        timestamp: Date.now()
    });
});

// Endpoint for mclass.js functionality
const mclass = require('./client/src/mclass');
app.get('/class', (req, res) => {
    res.json({ message: mclass() });
});

// Start the server and initialize serial connection
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    initializeSerial();
});