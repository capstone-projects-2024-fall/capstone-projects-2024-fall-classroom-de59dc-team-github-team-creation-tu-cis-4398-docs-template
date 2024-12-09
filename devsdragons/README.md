# Devs and Dragons (Project - CIS 4398)

### How To Install Required Technologies

### Requirements

Using MongoDB-server for backend: python.
Using React frontned: node/npm.

### Install Dependencies

```bash
cd devsdragons
npm install
pip install pygame
pip install pymongo
pip install flask
pip install bcrypt
pip install uuid
pip install certifi
pip install re
pip install flask_cors
pip install opeanai
```
### Run MongoDB Backend before Vite Frontend

```bash
cd devsdragons
cd server
python main.py
```

### Run Prototype PyGame locally
```bash
cd devsdragons
cd src
cd GAME
python main.py
```

### Run Vite Frontend

React will run on http://localhost:3000

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Tests

To run all tests
```bash
npm test
```

To run a specific test file
```bash
npx vitest run {file path}
```
