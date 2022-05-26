from crypt import methods
from flask import Flask, request
import mysql.connector

app = Flask(__name__)

connection = mysql.connector.connect(host="localhost",user = "root", passwd ="root", auth_plugin='mysql_native_password')

cur = connection.cursor()

#cur.execute('''CREATE DATABASE percentpoll;''')
#cur.execute('''USE percentpoll''' )





@app.route("/members")
def server():
    return {"members": ["member1", "member2"]}

@app.route("/newpoll", methods=["POST"])
def newPoll():
    pollData = request.get_json()
    print(pollData)

    return "Done",201

if __name__ ==" __main__":
    app.run(debug= True)