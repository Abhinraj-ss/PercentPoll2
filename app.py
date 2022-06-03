import json
from flask import Flask, jsonify, request
import mysql.connector
import requests

app = Flask(__name__)

connection = mysql.connector.connect(host="localhost",user = "root", passwd ="root", auth_plugin='mysql_native_password')

cur = connection.cursor(buffered=True)

#cur.execute('''CREATE DATABASE percentpoll;''')
cur.execute('''USE percentpoll;''' )





@app.route("/members")
def server():
    return {"members": ["member1", "member2"]}

@app.route("/newpoll", methods=["POST"])
def newPoll():
    pollData = request.get_json()
    insertQueryPollsInfo = '''INSERT INTO polls_info(user_id,title ,open_date,open_time,close_date, close_time) VALUES(%s,%s,%s,%s,%s,%s);'''
    dataPollsInfo = (1,pollData['Title'],pollData['openingDate'],pollData['openingTime'],pollData['closingDate'],pollData['closingTime'])
    cur.execute(insertQueryPollsInfo,dataPollsInfo)
    #cur.execute('''SELECT LAST_INSERT_ID();''')
    poll_id = cur.lastrowid
    insertQueryPollOptions = '''INSERT INTO poll_options(poll_id, poll_option) VALUES(%s,%s);'''
    for pollOption in pollData['pollOptions']:
        dataPollOptions = (poll_id,pollOption['pollOption'])
        cur.execute(insertQueryPollOptions,dataPollOptions)
    
    connection.commit()
    return "Done",201

@app.route("/register", methods=['POST'])
def register():
    registerData = request.get_json()
    print(registerData)
    registerUserQuery = "INSERT INTO users_data(name,email_id,password) VALUES(%s,%s,%s);"
    searchUserQuery = "SELECT * FROM users_data WHERE email_id = %s;"
    userInfo = (registerData['name'],registerData['email'],registerData['password'])
    email = registerData['email']
    cur.execute(searchUserQuery,(email,))
    userData = cur.fetchone()
    if (userData == None):
        cur.execute(registerUserQuery,userInfo)
        connection.commit()
        return "user added", 201
    else:
        return "user exists", 200

@app.route("/login",methods=['POST'])
def login():
    loginData = request.get_json()
    email = loginData['email']

    print(loginData)
    
    if request.method == 'POST':
        selectUserIdPasswordQuery="SELECT user_id,password FROM users_data WHERE email_id = %s;"
        cur.execute(selectUserIdPasswordQuery,(email,))
        result = cur.fetchone()
        user_id= result[0]
        password = result[1]
        print(password)
        if (password != None):
            if(password==loginData["password"]):
                return jsonify({"user_id":user_id}),201
        else :
            return "userNotPresent",200
    
        

if __name__ ==" __main__":
    app.run(debug= True)