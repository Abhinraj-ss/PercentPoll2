from operator import index
from flask import Flask, jsonify, request
import mysql.connector
import datetime
import json

app = Flask(__name__)

connection = mysql.connector.connect(host="localhost",user = "root", passwd ="root", auth_plugin='mysql_native_password')

cur = connection.cursor(buffered=True)

#cur.execute('''CREATE DATABASE percentpoll;''')
cur.execute('''USE percentpoll;''' )


dateTimeNow = datetime.datetime.now()



@app.route("/members")
def server():
    return {"members": ["member1", "member2"]}


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
    
        
@app.route("/createPoll", methods=["POST"])
def createPoll():
    pollData = request.get_json()
    dataPollsInfo = (pollData['user_id'],pollData['Title'],pollData['openingDate'],pollData['openingTime'],pollData['closingDate'],pollData['closingTime'])
    openingDateTime =  datetime.datetime.fromisoformat(pollData['openingDate']+" "+pollData['openingTime'])
    print(openingDateTime,type(openingDateTime))

    if(openingDateTime>=dateTimeNow):
        insertQueryUpcomingPollsInfo = '''INSERT INTO upcoming_polls_info(user_id,title ,open_date,open_time,close_date, close_time) VALUES(%s,%s,%s,%s,%s,%s);'''
        cur.execute(insertQueryUpcomingPollsInfo,dataPollsInfo)
        poll_id = cur.lastrowid
        insertQueryLivePollOptions = '''INSERT INTO upcoming_poll_options(poll_id, poll_option) VALUES(%s,%s);'''
        for pollOption in pollData['pollOptions']:
            dataPollOptions = (poll_id,pollOption['pollOption'])
            cur.execute(insertQueryLivePollOptions,dataPollOptions)

    else:
        insertQueryLivePollsInfo = '''INSERT INTO live_polls_info(user_id,title ,open_date,open_time,close_date, close_time) VALUES(%s,%s,%s,%s,%s,%s);'''
        cur.execute(insertQueryLivePollsInfo,dataPollsInfo)
        poll_id = cur.lastrowid
        insertQueryLivePollOptions = '''INSERT INTO live_poll_options(poll_id, poll_option) VALUES(%s,%s);'''
        for pollOption in pollData['pollOptions']:
            dataPollOptions = (poll_id,pollOption['pollOption'])
            cur.execute(insertQueryLivePollOptions,dataPollOptions)

    connection.commit()
    return "Done",201

@app.route('/upcoming',methods=['POST'])
def upcomingPolls():
    data = request.get_json()
    user_id =(data['user_id'],)
    print(user_id,type(user_id))
    jsonObjPollInfo = '''SELECT JSON_ARRAYAGG(JSON_OBJECT('poll_id',poll_id,'title',title,'open_date',open_date,'open_time',open_time,'close_date',close_date,'close_time',close_time)) from upcoming_polls_info WHERE user_id = %s'''
    cur.execute(jsonObjPollInfo,user_id)
    print(cur)
    upcomingList = json.loads(cur.fetchone()[0])
    print(upcomingList,type(upcomingList))
    if upcomingList != None:
        index =0
        for obj in upcomingList:
            print(index,obj)
            poll_id = (obj['poll_id'],)
            jsonArrPollOptions = '''SELECT JSON_ARRAYAGG(poll_option) FROM upcoming_poll_options WHERE poll_id = %s;'''
            cur.execute(jsonArrPollOptions,poll_id)
            pollOptions = cur.fetchone()[0]
            print(pollOptions)
            upcomingList[index]['pollOptions']=pollOptions
            print(upcomingList) 
            index+=1
        return jsonify(upcomingList),201
    else :
        return "no upcoming polls",200

@app.route('/live',methods=['POST'])
def livePolls():
    data = request.get_json()
    user_id =(data['user_id'],)
    print(user_id,type(user_id))
    jsonObjPollInfo = '''SELECT JSON_ARRAYAGG(JSON_OBJECT('poll_id',poll_id,'title',title,'open_date',open_date,'open_time',open_time,'close_date',close_date,'close_time',close_time)) from live_polls_info WHERE user_id = %s'''
    cur.execute(jsonObjPollInfo,user_id)
    liveList = json.loads(cur.fetchone()[0])
    print(liveList,type(liveList))
    if liveList != None:
        index =0
        for obj in liveList:
            print(index,obj)
            poll_id = (obj['poll_id'],)
            jsonArrPollOptions = '''SELECT JSON_ARRAYAGG(poll_option) FROM live_poll_options WHERE poll_id = %s;'''
            cur.execute(jsonArrPollOptions,poll_id)
            pollOptions = cur.fetchone()[0]
            print(pollOptions)
            liveList[index]['pollOptions']=pollOptions
            print(liveList) 
            index+=1
        return jsonify(liveList),201
    else :
        return "no live polls",200

@app.route('/closed',methods=['POST'])
def closedPolls():
    data = request.get_json()
    user_id =(data['user_id'],)
    print(user_id,type(user_id))
    jsonObjPollInfo = '''SELECT JSON_ARRAYAGG(JSON_OBJECT('poll_id',poll_id,'title',title,'open_date',open_date,'open_time',open_time,'close_date',close_date,'close_time',close_time)) from closed_polls_info WHERE user_id = %s'''
    cur.execute(jsonObjPollInfo,user_id)
    print(cur)
    closedList = json.loads(cur.fetchone()[0])
    print(closedList,type(closedList))
    if closedList != None:
        index =0
        for obj in closedList:
            print(index,obj)
            poll_id = (obj['poll_id'],)
            jsonArrPollOptions = '''SELECT JSON_ARRAYAGG(poll_option) FROM closed_poll_options WHERE poll_id = %s;'''
            cur.execute(jsonArrPollOptions,poll_id)
            pollOptions = cur.fetchone()[0]
            print(pollOptions)
            closedList[index]['pollOptions']=pollOptions
            print(closedList) 
            index+=1
        return jsonify(closedList),201
    else :
        return "no upcoming polls",200
    

if __name__ ==" __main__":
    app.run(debug= True)