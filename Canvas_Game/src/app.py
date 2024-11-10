from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # To allow cross-origin requests from your React frontend

# Will Create SQLite database and table if not exists
def init_db():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            canvas_key TEXT
        )
    ''')
    conn.commit()
    conn.close()
#sign up logic here
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    name = data['name']
    last_name = data['lastName']
    email = data['email']
    password = data['password']

    try:
        conn = sqlite3.connect('users.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO users (name, last_name, email, password) VALUES (?, ?, ?, ?)', 
                       (name, last_name, email, password))
        conn.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"message": "User already exists"}), 400
    finally:
        conn.close()

@app.route('/canvasKey', methods=['POST'])
def logCanvasKey():
        data = request.json
        email = data['email']
        canvasKey = data['canvasKey']

        conn = sqlite3.connect('users.db')
        cursor = conn.cursor()
        resp = cursor.execute("UPDATE users SET canvas_key= ? where email = ?", (canvasKey, email))
        conn.close()
        
        if resp:
                return jsonify({"message": "Connection Successful"}), 200
        else:
                return jsonify({"message": "Connection not successful. Try re-submitting the key or generate a new key."}), 400


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE email = ? AND password = ?', (email, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401
def get_db_connection():
    conn = sqlite3.connect('users.db')
    conn.row_factory = sqlite3.Row  # Makes fetching rows easier with named columns
    return conn


if __name__ == '__main__':
    init_db()  # Initialize the database
    app.run(debug=True)
