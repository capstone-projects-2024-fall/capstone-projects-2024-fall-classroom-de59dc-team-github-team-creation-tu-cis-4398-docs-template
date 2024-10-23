import pymongo
import random
import openai
from flask import Flask, request, jsonify
from pymongo import MongoClient
from contact import Contact
from flask_cors import CORS
import bcrypt
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 


password = "testKey125"
cluster = MongoClient("mongodb+srv://User1:" + password + "@cluster0.1edn5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
openai.api_key = ""
db = cluster["techQuest"]
collection = db["userInfo"]
sequence_collection = db["sequences"]


# Initialize the sequence counter (this is done only once when setting up)
if sequence_collection.find_one({"_id": "user_id"}) is None:
    sequence_collection.insert_one({"_id": "user_id", "seq_value": 0})

# Email validation function
def valid_email(email):
    return re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", email) is not None

# Function to enforce strong password requirements
def eligible_password(password):
    return (len(password) >= 8 and 
            any(char.isdigit() for char in password) and 
            any(char.isalpha() for char in password) and 
            any(char.isupper() for char in password) and 
            any(not char.isalnum() for char in password))

# Function to get the next sequence value for user_id
def get_next_sequence_value(sequence_name):
    sequence_doc = sequence_collection.find_one_and_update(
        {"_id": sequence_name},
        {"$inc": {"seq_value": 1}},
        return_document=True
    )
    return sequence_doc["seq_value"]

# Function to generate a custom ID like USER001, USER002, etc.
def generate_custom_id():
    next_id = get_next_sequence_value("user_id")
    return f"USER{next_id:03d}"  # This will create IDs like USER001, USER002, etc.
    

@app.route('/create_contact', methods=["POST"])
def create_contact():
    data = request.get_json()
    print("Received data:", data)  # Log to check if data is received
    
    # Check if all required fields are present
    if not data or not data.get("name") or not data.get("email") or not data.get("password"):
        return jsonify({"message": "Missing required fields"}), 400

    # Validate email
    if not valid_email(data["email"]):
        return jsonify({"message": "Invalid email format."}), 400

    # Validate password
    if not eligible_password(data["password"]):
        return jsonify({"message": "Password does not meet security requirements."}), 400

    # Check if email already exists in the database
    if collection.find_one({"email": data["email"]}):
        return jsonify({"message": "Email already exists"}), 400
    
    # Hash the password using bcrypt
    hashed_password = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt())

    # Generate a custom ID
    custom_id = generate_custom_id()

    # Create a new contact with a custom _id
    new_contact = {
        '_id': custom_id,
        'name': data["name"],
        'email': data["email"],
        'password': hashed_password.decode('utf-8'),  # Store hashed password
        'guildsIn': 0,
        "questMade": 0
    }

    try:
        # Insert new contact into the database
        collection.insert_one(new_contact)
        return jsonify({"message": "User created successfully", "user_id": custom_id}), 201
    except Exception as e:
        print(f"Error inserting user into MongoDB: {e}")
        return jsonify({"message": "Account creation failed due to server error"}), 500         


@app.route("/match_user", methods=["POST"])
def doesTheUserExist():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    # Input Validation
    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400
    
    print(f"Looking for user with email: {email}")

    stored_user = collection.find_one({"email": email})
    if stored_user:
        # Compare the hashed password with the provided password
        if bcrypt.checkpw(password.encode('utf-8'), stored_user["password"].encode('utf-8')):
            print("User exists")
            return jsonify({"message": "User exists"}), 200
        else:
            print("Incorrect password")
            return jsonify({"message": "Incorrect password"}), 403
    else:
        print("User does not exist")
        return jsonify({"message": "User does not exist"}), 404
    

@app.route("/generate_question", methods=["GET"])
def getResponse(difficulty):
    diff = {1: "easy", 2: "medium", 3: "hard"}
    
    print("Difficulty picked", diff[difficulty])
    
    TypeOfTopics = ["for loops", "while loops", "arrays"]
    
    randomTopic = random.randint(0, len(TypeOfTopics) - 1)
    
    user_input = f"Given the difficulty level {diff[difficulty]}, provide me with a computer science coding questions on this topic: {TypeOfTopics[randomTopic]}"
    
    print(user_input)
    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = [
            {"role": "system", "content": "You are a helpful assitant"},
            {"role": "user", "content": user_input}
        
        ]
    )
    
    #print(response)
    messageFromChatGpt = response['choices'][0]['message']['content']
    # The returned response is in json format, so we go inside choices and then inside choices, we look, at the 0 th element and then inside that
    # the message and then acessing the content.
    
    return jsonify(messageFromChatGpt)

@app.route("/get_answer", methods=["POST"])
def solutionFromTheUser():
    #answerFromUser = request.json.get('answer')
    data = request.json()
    answer = data.get('answer')
    #print("Answer from the user: ", answerFromUser)
    return answer
    

def checkAnswer(question, userAnswer):
    sendToOpenAI = "This is the question" + question  + "and based on that grade my solution " + userAnswer + " on a scale 1-10. Focus more on the logic than the syntax of the code."
    
    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = [
            {"role": "system", "content": "You are a helpful assitant"},
            {"role": "user", "content": sendToOpenAI}
        
        ]
    )
    messageFromChatGpt = response['choices'][0]['message']['content']
    
    return messageFromChatGpt


# can insert multiple posts at once
# collection.insert_many([post1, post2])

# results = collection.find({"name": "Lola"})
# for result in results:
#     print(result)

"""

# to find a specifc person's in the DB

we will use result = colleciton.find({"name": "bill})

for result in results:


"""

if __name__ == '__main__':

    app.run(debug=True)




