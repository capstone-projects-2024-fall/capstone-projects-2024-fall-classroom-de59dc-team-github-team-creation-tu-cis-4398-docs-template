import pymongo
import random
import openai
from flask import Flask, request, jsonify
from pymongo import MongoClient
from contact import Contact
from flask_cors import CORS
import bcrypt
import re
import certifi
import uuid

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 


password = "testKey125"
# For better readability
connection = "mongodb+srv://User1:" + password + "@cluster0.1edn5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
cluster_connection = MongoClient(connection, tlsCAFile=certifi.where())
openai.api_key = "" 
db = cluster_connection["techQuest"]
collection = db["userInfo"]
sequence_collection = db["sequences"]
quests_collection = db["quests"] 
quests_store = {}


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
        "questMade": 0,
        "mock_field": 0
    }

    try:
        # Insert new contact into the database
        collection.insert_one(new_contact)
        return jsonify({"message": "User created successfully", "user_id": custom_id}), 201
    except Exception as e:
        print(f"Error inserting user into MongoDB: {e}")
        return jsonify({"message": "Account creation failed due to server error"}), 500   

@app.route('/update_mock_field', methods=["POST"])
def update_mock_field():
    data = request.get_json()
    user_id = data.get("user_id")
    increment_value = data.get("increment_value", 1)  # Default increment value is 1

    if not user_id:
        return jsonify({"message": "User ID is required"}), 400

    try:
        result = collection.update_one(
            {"_id": user_id},
            {"$inc": {"mock_field": increment_value}}
        )
        if result.modified_count == 1:
            return jsonify({"message": "Mock field updated successfully"}), 200
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        print(f"Error updating mock field: {e}")
        return jsonify({"message": "Failed to update mock field"}), 500
    
@app.route('/get_user_data', methods=["GET"])
def get_user_data():
    user_id = request.args.get("user_id")

    if not user_id:
        return jsonify({"message": "User ID is required"}), 400

    try:
        user_data = collection.find_one({"_id": user_id})
        if user_data:
            return jsonify({"user_id": user_data["_id"], "mock_field": user_data["mock_field"]}), 200
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        print(f"Error fetching user data: {e}")
        return jsonify({"message": "Failed to fetch user data"}), 500



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
            return jsonify({"message": "User exists", "user_id": str(stored_user["_id"])}), 200
        else:
            print("Incorrect password")
            return jsonify({"message": "Incorrect password"}), 403
    else:
        print("User does not exist")
        return jsonify({"message": "User does not exist"}), 404
    

@app.route("/quest-parameters", methods=["POST", "GET"])
def getResponse():
    if request.method == "POST":
        data = request.get_json()
        print(data)

        user_id = data.get("user_id")  # Retrieve the user ID
        if not user_id:
            return jsonify({"message": "User ID is required"}), 400

        # Extracting quest details
        questTitle = data.get('questTitle')
        codingTopic = data.get("codingTopic")
        problemCount = data.get("problemCount")
        difficultyLevel = data.get("difficultyLevel")
        enemy = data.get("enemy")
        background = data.get("background")
        description = data.get("description")
        programmingLanguage = data.get("programmingLanguage")

        # Generating user input for OpenAI
        user_input = (f"You're a quest master guiding me on a coding adventure titled '{questTitle}' with the difficulty level '{difficultyLevel}'. "
                      f"I need {problemCount} computer science coding challenges on the topic '{codingTopic}', each in the language {programmingLanguage}. "
                      f"Please provide a quest story in the '{background}' setting, where I am battling the enemy '{enemy}'. "
                      f"Each question should progress the story, incorporating a short description of how each coding challenge helps me defeat '{enemy}' "
                      f"or overcome a specific obstacle in the journey. **Do not provide solutions or hints for any question**.\n"
                      f"Format the output as:\n"
                      f"Background: (Description of the scene)\n"
                      f"Question 1: (Describe a scenario where I encounter '{enemy}' or an obstacle, followed by a coding question related to '{codingTopic}' "
                      f"that must be solved in {programmingLanguage} to progress)\n"
                      f"Question 2: (Next coding question in {programmingLanguage}, with another part of the story building on my progress or another encounter with '{enemy}')\n"
                      f"… and so on up to Question {problemCount}.\n"
                      f"Example question format:\n"
                      f"'The enemy blocks your path with a wall of encrypted data. To proceed, write a function in {programmingLanguage} that can decrypt the data. If possible provide input and expected output as an example'\n"
                      f"Use this storyline description for context: {description}")

        # Send request to OpenAI
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant"},
                    {"role": "user", "content": user_input}
                ]
            )
            messageFromChatGpt = response['choices'][0]['message']['content']
            questions = messageFromChatGpt.split("Question")[1:]
            quest_id = str(uuid.uuid4())

            # Save the quest in the database
            quest_data = {
                "quest_id": quest_id,
                "user_id": user_id,
                "questTitle": questTitle,
                "codingTopic": codingTopic,
                "problemCount": problemCount,
                "difficultyLevel": difficultyLevel,
                "enemy": enemy,
                "background": background,
                "description": description,
                "programmingLanguage": programmingLanguage,
                "questions": questions
            }

            db["quests"].insert_one(quest_data)  # Save to the database

            print("Quest ID: ", quest_id)
            return jsonify({"quest_id": quest_id}), 200

        except Exception as e:
            print(f"Error generating quest: {e}")
            return jsonify({"message": "Failed to generate quest"}), 500

    elif request.method == "GET":
        quest_id = request.args.get('quest_id')
        print("Received quest ID:", quest_id)

        try:
            # Fetch the quest from the database
            quest = db["quests"].find_one({"quest_id": quest_id}, {"_id": 0})
            if quest:
                return jsonify(quest), 200
            else:
                return jsonify({"message": "No quest found for the provided quest_id"}), 404
        except Exception as e:
            print(f"Error fetching quest: {e}")
            return jsonify({"message": "Failed to fetch quest"}), 500

            

@app.route("/user-quests", methods=["GET"])
def get_user_quests():
    user_id = request.args.get("user_id")
    
    if not user_id:
        return jsonify({"message": "User ID is required"}), 400

    try:
        user_quests = list(db["quests"].find({"user_id": user_id}, {"_id": 0}))  # Fetch quests for the user
        return jsonify(user_quests), 200
    except Exception as e:
        print(f"Error fetching quests for user {user_id}: {e}")
        return jsonify({"message": "Failed to fetch user quests"}), 500

            
            


    
# @app.route("/get_questions", methods=["GET"])
# def solutionFromTheUser():
    #answerFromUser = request.json.get('answer')

@app.route("/check_answer", methods=["POST"])
def checkAnswer():
    data = request.get_json()
    question = data.get('question')
    answer = data.get('answer')
    print(answer)
    language = data.get('language')
    sendToOpenAI = f"This is the question: {question}, and based on that grade my solution: {answer}, on a scale 1-10, 1 being the worst code and 10 being the best code, in this programming language: {language}. Be an easy grader. Focus more on the logic than the syntax of the code. The return output should be: Grade, advice"
    
    response = openai.ChatCompletion.create(
        model = "gpt-4",
        messages = [
            {"role": "system", "content": "You are a helpful assitant"},
            {"role": "user", "content": sendToOpenAI}
        
        ]
    )
    messageFromChatGpt = response['choices'][0]['message']['content']
    
    print(messageFromChatGpt)
    
    return jsonify(messageFromChatGpt)


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




