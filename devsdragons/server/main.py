import pymongo
import random
import openai
from flask import Flask, request, jsonify
from pymongo import MongoClient
from contact import Contact
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


password = "testKey125"
cluster = MongoClient("mongodb+srv://User1:" + password + "@cluster0.1edn5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
openai.api_key = ""
db = cluster["techQuest"]
collection = db["userInfo"]

    

@app.route('/get_credentials', methods=["POST"])
def create_contact():
    data = request.get_json()
    new_contact = Contact(
        id = collection.count_documents({}) + 1, 
        name = data["name"],
        password = data["password"],
        email = data["email"]
    )
    # id = contact._id
    # name = contact.name
    # email = contact.email
    # password = contact.password

    if collection.find_one({"email": new_contact.email}):
        print("Contact already exists")
        return jsonify({"message": "Email already exists"}), 400
    # if not eligiblePassword(password):
    #     print("The password must be 8 digits, must contain a number, and must be all alphanumeric characters")
        # return jsonify({"message": "Password is too weak"}), 400
    else:
        collection.insert_one({"_id": new_contact.id, 'name': new_contact.name, 'email': new_contact.email, 'password': new_contact.password, 'guildsIn': 0, "questMade": 0})
        return jsonify({"message": "User created successfully"}), 201


@app.route("/match_user", methods=["POST"])
def doesTheUserExist():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    print(f"Looking for user with email: {email} and password: {password}")

    if collection.find_one({"email": email, "password": password}):
        print("User exists")
        return jsonify({"message": "User exists"}), 200
    else:
        print("User does not exist")
        return jsonify({"message": "User does not exist"}), 404


# def eligiblePassword(password):
#     # Add more conditions here to check if password is strong
#     return len(password) >= 8 and any(char.isdigit() for char in password) and any(char.isalpha() for char in password)


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
    data = request.get_json()
    answer = data.get('answer')
    return jsonify({"answer": answer})
    

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




