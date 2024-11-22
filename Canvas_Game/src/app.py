from flask import Flask, request, jsonify
import sqlite3
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app,  resources={r"/*": {"origins": "http://localhost:5173"}})  # To allow cross-origin requests from your React frontend

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
            canvas_key TEXT,
            score INTEGER DEFAULT 0,
            picture_url TEXT DEFAULT EMPTY
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS assignments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            assignment_id INTEGER,
            course_id INTEGER,
            group_category_id INTEGER
            name TEXT,
            description TEXT,
            due_at TEXT
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

        canvasUrl = "https://templeu.instructure.com/api/v1/users/self/profile"

        # Validate the Canvas API token by calling an API endpoint
        headers = {"Authorization": f"Bearer {canvasKey}"}
        try:
            response = requests.get(canvasUrl, headers=headers)
            if response.status_code == 200:
                # Token is valid
                user_profile = response.json()
                print("Token is valid!")
                print("User Profile:", user_profile)
                picture=user_profile["avatar_url"]
                print("picture is" + picture)

                # Save the token in the database
                conn = sqlite3.connect('users.db')
                cursor = conn.cursor()
                cursor.execute("UPDATE users SET canvas_key = ?, picture_url = ? WHERE email = ?", (canvasKey, picture, email ))
                conn.commit()
                conn.close()
                return jsonify({"message": "Canvas key successfully validated and stored"}), 200
            else:
                # Token is invalid
                print("Token is invalid or expired.")
                return jsonify({"message": "Invalid Canvas key. Please check your key and try again."}), 400
        except Exception as e:
            print("Error validating Canvas key:", str(e))
            return jsonify({"message": "An error occurred while validating the Canvas key."}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    # Check if the account exists
    cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
    user = cursor.fetchone()

    if not user:
        conn.close()
        return jsonify({"message": "Account does not exist"}), 404

    # Validate the password for the existing account
    cursor.execute('SELECT * FROM users WHERE email = ? AND password = ?', (email, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid password"}), 401

def get_db_connection():
    conn = sqlite3.connect('users.db')
    conn.row_factory = sqlite3.Row  # Makes fetching rows easier with named columns
    return conn


if __name__ == '__main__':
    init_db()  # Initialize the database
    app.run(debug=True)