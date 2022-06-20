from flask import Flask, jsonify, request
import mysql.connector
import datetime
import json
from werkzeug.security import check_password_hash,generate_password_hash
import math
from flask_cors import cross_origin,CORS

app = Flask(__name__)

CORS(app)


#connection = mysql.connector.connect(host="localhost",user = "root", passwd ="root", auth_plugin='mysql_native_password')
def connectDb():
    connection = mysql.connector.connect(host="bhgmzdjldrdmbzrzwr6z-mysql.services.clever-cloud.com",database="bhgmzdjldrdmbzrzwr6z",user = "uz8lge1whj1jxeq9", passwd ="IZLg6ZLNzTvBdP3eMZ2T")
    if(connection):
        print("got connected!")
    else:
        print("not connected")
    return connection


@app.route("/register", methods=['POST'])
@cross_origin()
def register():
    connection=connectDb()
    cur = connection.cursor(buffered=True)
    registerData = request.get_json()
    print(registerData)
    hashedPassword= generate_password_hash(registerData['password'], method='pbkdf2:sha256', salt_length=12)
    registerUserQuery = "INSERT INTO users_data(name,email_id,password) VALUES(%s,%s,%s);"
    searchUserQuery = "SELECT * FROM users_data WHERE email_id = %s;"
    userInfo = (registerData['name'],registerData['email'],hashedPassword)
    email = registerData['email']
    cur.execute(searchUserQuery,(email,))
    userData = cur.fetchone()
    if (userData == None):
        cur.execute(registerUserQuery,userInfo)
        connection.commit()
        connection.close()
        return {"message":"user added"}, 201
    else:
        connection.close()
        return {"message":"user exists"}, 200

@app.route("/login",methods=['POST'])
@cross_origin()
def login():
    connection=connectDb()
    cur = connection.cursor(buffered=True)
    loginData = request.get_json()
    email = loginData['email']
    print(loginData)
    
    selectUserIdPasswordQuery="SELECT user_id,password FROM users_data WHERE email_id = %s;"
    cur.execute(selectUserIdPasswordQuery,(email,))
    result = cur.fetchone()
    if (result != None):
        user_id= result[0]
        password = result[1]
        if(check_password_hash(password,loginData["password"])):
            connection.close()
            return jsonify({"user_id":user_id}),201
    else :
        connection.close()
        return {"message":"userNotPresent"},200
    
        
@app.route("/createPoll", methods=["POST"])
@cross_origin()
def createPoll():
    connection=connectDb()
    cur = connection.cursor(buffered=True)
    dateTimeNow = datetime.datetime.now()
    pollData = request.get_json()
    dataPollsInfo = (pollData['user_id'],pollData['Title'],pollData['openingDate'],pollData['openingTime'],pollData['closingDate'],pollData['closingTime'])
    openingDateTime =  datetime.datetime.fromisoformat(pollData['openingDate']+" "+pollData['openingTime'])
    closingDateTime = datetime.datetime.fromisoformat(pollData['closingDate']+ " "+pollData['closingTime'])
    print(openingDateTime,dateTimeNow)

    if(openingDateTime>dateTimeNow):
        insertQueryUpcomingPollsInfo = '''INSERT INTO upcoming_polls_info(user_id,title ,open_date,open_time,close_date, close_time) VALUES(%s,%s,%s,%s,%s,%s);'''
        cur.execute(insertQueryUpcomingPollsInfo,dataPollsInfo)
        poll_id = cur.lastrowid
        insertQueryLivePollOptions = '''INSERT INTO upcoming_poll_options(poll_id, poll_option) VALUES(%s,%s);'''
        for pollOption in pollData['pollOptions']:
            dataPollOptions = (poll_id,pollOption['pollOption'])
            cur.execute(insertQueryLivePollOptions,dataPollOptions)

    elif(openingDateTime<=dateTimeNow and closingDateTime>dateTimeNow):
        insertQueryLivePollsInfo = '''INSERT INTO live_polls_info(user_id,title ,open_date,open_time,close_date, close_time) VALUES(%s,%s,%s,%s,%s,%s);'''
        cur.execute(insertQueryLivePollsInfo,dataPollsInfo)
        poll_id = cur.lastrowid
        insertQueryLivePollOptions = '''INSERT INTO live_poll_options(poll_id, poll_option) VALUES(%s,%s);'''
        for pollOption in pollData['pollOptions']:
            dataPollOptions = (poll_id,pollOption['pollOption'])
            cur.execute(insertQueryLivePollOptions,dataPollOptions)
    elif(closingDateTime<dateTimeNow):
        insertQueryClosedPollsInfo = '''INSERT INTO closed_polls_info(user_id,title ,open_date,open_time,close_date, close_time) VALUES(%s,%s,%s,%s,%s,%s);'''
        cur.execute(insertQueryClosedPollsInfo,dataPollsInfo)
        poll_id = cur.lastrowid
        insertQueryClosedPollOptions = '''INSERT INTO closed_poll_options(poll_id, poll_option) VALUES(%s,%s);'''
        for pollOption in pollData['pollOptions']:
            dataPollOptions = (poll_id,pollOption['pollOption'])
            cur.execute(insertQueryClosedPollOptions,dataPollOptions)
    connection.commit()
    connection.close()
    return {"message":"poll creation successful!"},201


@app.route('/modify',methods=['POST'])
@cross_origin()
def modifyPoll():
    connection=connectDb()
    cur = connection.cursor(buffered=True)
    dateTimeNow = datetime.datetime.now()
    pollData = request.get_json()
    print(pollData)
    poll_id_old = pollData['poll_id']
    user_id = pollData['user_id']
    dataPollsInfo = (user_id,pollData['Title'],pollData['openingDate'],pollData['openingTime'],pollData['closingDate'],pollData['closingTime'])
    openingDateTime =  datetime.datetime.fromisoformat(pollData['openingDate']+" "+pollData['openingTime'])
    closingDateTime = datetime.datetime.fromisoformat(pollData['closingDate']+ " "+pollData['closingTime'])
    print(dataPollsInfo)
    if(openingDateTime>dateTimeNow):
        selectQueryUpcomingInfo ='''SELECT * FROM upcoming_polls_info WHERE poll_id=%s AND user_id=%s'''
        cur.execute(selectQueryUpcomingInfo,(poll_id_old,user_id))
        if(cur.fetchall() != None):
            deleteQueryUpcomingPollsInfo = '''DELETE FROM upcoming_polls_info WHERE poll_id=%s AND user_id=%s'''
            cur.execute(deleteQueryUpcomingPollsInfo,(poll_id_old,user_id))
            insertQueryUpcomingPollsInfo = '''INSERT INTO upcoming_polls_info(user_id,title ,open_date,open_time,close_date, close_time) VALUES(%s,%s,%s,%s,%s,%s);'''
            cur.execute(insertQueryUpcomingPollsInfo,dataPollsInfo)
            poll_id = cur.lastrowid
            insertQueryLivePollOptions = '''INSERT INTO upcoming_poll_options(poll_id, poll_option) VALUES(%s,%s);'''
            for pollOption in pollData['pollOptions']:
                dataPollOptionsOld = (poll_id_old,pollOption['pollOption'])
                dataPollOptionsNew = (poll_id,pollOption['pollOption'])
                selectQueryUpcomingOptions ='''SELECT * FROM upcoming_poll_options WHERE poll_id=%s AND poll_option=%s'''
                cur.execute(selectQueryUpcomingOptions,dataPollOptionsOld)
                if(cur.fetchone() == None):
                    cur.execute(insertQueryLivePollOptions,dataPollOptionsNew)

    elif(openingDateTime<=dateTimeNow and closingDateTime>dateTimeNow):
        selectQueryLiveInfo ='''SELECT * FROM live_polls_info WHERE poll_id=%s AND user_id=%s'''
        cur.execute(selectQueryLiveInfo,(poll_id_old,user_id))
        if(cur.fetchall() != None):
            deleteQueryLivePollsInfo = '''DELETE FROM live_polls_info WHERE poll_id=%s AND user_id=%s'''
            cur.execute(deleteQueryLivePollsInfo,(poll_id_old,user_id))
            insertQueryLivePollsInfo = '''INSERT INTO TABLE live_polls_info(user_id,title ,open_date,open_time,close_date, close_time) VALUES(%s,%s,%s,%s,%s,%s);'''
            cur.execute(insertQueryLivePollsInfo,dataPollsInfo)
            poll_id = cur.lastrowid
            insertQueryLivePollOptions = '''INSERT INTO live_poll_options(poll_id, poll_option) VALUES(%s,%s);'''
            for pollOption in pollData['pollOptions']:
                dataPollOptionsOld = (poll_id_old,pollOption['pollOption'])
                dataPollOptionsNew = (poll_id,pollOption['pollOption'])
                selectQueryLiveOptions ='''SELECT * FROM live_poll_options WHERE poll_id=%s AND poll_option=%s'''
                cur.execute(selectQueryLiveOptions,dataPollOptionsOld)
                if(cur.fetchone() != None):
                    cur.execute(insertQueryLivePollOptions,dataPollOptionsNew)
    
    connection.commit()
    connection.close()
    return {"message":"modification successful!"}, 201

@app.route('/vote/<pollId>',methods=['GET','POST'])
@cross_origin()
def vote(pollId):
    connection=connectDb()
    cur = connection.cursor(buffered=True)
    print('pollId',pollId)
    if (request.method == 'GET'):
        voteData = {}
        getTitleQuery='''SELECT title FROM live_polls_info WHERE poll_id = %s'''
        cur.execute(getTitleQuery,(pollId,))
        title = cur.fetchone()[0]
        getPollOptionsQuery = '''SELECT JSON_ARRAYAGG(poll_option) FROM live_poll_options WHERE poll_id=%s'''
        cur.execute(getPollOptionsQuery,(pollId,))
        pollOptions = cur.fetchone()[0]
        print(pollOptions)
        voteData['title'] = title
        voteData['pollOptions'] = json.loads(pollOptions)
        #print('voteData',voteData)
        return jsonify(voteData)
    if (request.method == 'POST'):
        data = request.get_json()
        print(data)
        selectedOption=data['selected_option']
        print(selectedOption)
        updatePollCountQuery = '''UPDATE live_polls_info SET poll_count = poll_count+1 WHERE poll_id =%s'''
        cur.execute(updatePollCountQuery,(pollId,))
        updateOptionCountQuery = '''UPDATE live_poll_options SET option_count = option_count+1 WHERE poll_option =%s'''
        cur.execute(updateOptionCountQuery,(selectedOption,))
        connection.commit()
        connection.close()
        return {"message":"voting successful!"},200

@app.route('/getPolls',methods=['POST'])
@cross_origin()
def getPolls():
    connection=connectDb()
    dateTimeNow = datetime.datetime.now()
    data = request.get_json()
    user_id =data['user_id']
    print(user_id)
    if user_id != None:
        upcomingList = upcomingPolls(user_id,dateTimeNow,connection)
        liveList = livePolls(user_id,dateTimeNow,connection)
        closedList = closedPolls(user_id,connection)
        totalPollsList = {"upcoming" : upcomingList,"live": liveList,"closed":closedList}
        connection.close()
        return jsonify(totalPollsList),201
    else :
        connection.close()
        return {"message":"no polls created!"},200
   

def upcomingPolls(user_id,dateTimeNow,connection):
    cur = connection.cursor(buffered=True)
    jsonObjPollInfo = '''SELECT JSON_ARRAYAGG(JSON_OBJECT('poll_id',poll_id,'title',title,'open_date',open_date,'open_time',open_time,'close_date',close_date,'close_time',close_time,'poll_count',poll_count)) FROM upcoming_polls_info WHERE user_id = %s'''
    cur.execute(jsonObjPollInfo,(user_id,))
    upcomingJsonArr = cur.fetchone()[0]
    #print("upcoming Arr",upcomingJsonArr)
    if upcomingJsonArr != None:
        upcomingList = json.loads(upcomingJsonArr)
        #print(upcomingList,type(upcomingList))
        index =0
        for obj in upcomingList:

            openingDateTime =  datetime.datetime.fromisoformat(obj['open_date']+" "+obj['open_time'])
            poll_id = (obj['poll_id'],)
            jsonArrPollOptions = '''SELECT JSON_ARRAYAGG(JSON_OBJECT('poll_option',poll_option,'option_count',option_count)) FROM upcoming_poll_options WHERE poll_id = %s;'''
            cur.execute(jsonArrPollOptions,poll_id)
            pollOptions = cur.fetchone()[0]
            #print(pollOptions)
            if (openingDateTime<=dateTimeNow):
                upcomingList.pop(index) if updateUpcomingToLive(user_id,obj,pollOptions,connection) else print("not updated from upcoming to live")
            else:
                upcomingList[index]['pollOptions']=json.loads(pollOptions)
                index+=1

            #print(upcomingList) 
        return upcomingList
    else :
        return [{}]

def livePolls(user_id,dateTimeNow,connection):
    cur = connection.cursor(buffered=True)
    jsonObjPollInfo = '''SELECT JSON_ARRAYAGG(JSON_OBJECT('poll_id',poll_id,'title',title,'open_date',open_date,'open_time',open_time,'close_date',close_date,'close_time',close_time, 'poll_count',poll_count)) FROM live_polls_info WHERE user_id = %s'''
    cur.execute(jsonObjPollInfo,(user_id,))
    liveJsonArr = cur.fetchone()[0]
    #print("live Arr",liveJsonArr)
    if liveJsonArr != None:
        liveList = json.loads(liveJsonArr)
        #print(liveList,type(liveList))
        index =0
        for obj in liveList:
            closingDateTime =  datetime.datetime.fromisoformat(obj['close_date']+" "+obj['close_time'])
            poll_id = (obj['poll_id'],)
            jsonArrPollOptions = '''SELECT JSON_ARRAYAGG(JSON_OBJECT('poll_option',poll_option,'option_count',option_count)) FROM live_poll_options WHERE poll_id = %s;'''
            cur.execute(jsonArrPollOptions,poll_id)
            pollOptions = cur.fetchone()[0]
                
            if (closingDateTime<=dateTimeNow):
                liveList.pop(index) if updateLiveToClosed(user_id,obj,pollOptions,connection) else print("not updated from live to closed")
                
            else:
                liveList[index]['pollOptions']=json.loads(pollOptions)

                maxCount=0
                maxPollOptions=[]
                if pollOptions != None:
                    for pollOption in json.loads(pollOptions):
                        count=pollOption['option_count']
                        if count >= maxCount:
                            maxCount =pollOption['option_count']
                    for pollOption in json.loads(pollOptions):
                        if pollOption['option_count'] == maxCount:
                            maxPollOptions.append(pollOption['poll_option'])
                    
                    maxPercent =math.ceil(maxCount*100/obj['poll_count']) if (obj['poll_count']!=0) else 0
                    liveList[index]['maxPercent'] = maxPercent
                    liveList[index]['maxPollOptions'] = maxPollOptions


                index+=1
            #print(liveList) 
        return liveList
    else :
        return [{}]
    
def closedPolls(user_id,connection):
    cur = connection.cursor(buffered=True)
    jsonObjPollInfo = '''SELECT JSON_ARRAYAGG(JSON_OBJECT('poll_id',poll_id,'title',title,'open_date',open_date,'open_time',open_time,'close_date',close_date,'close_time',close_time,'poll_count',poll_count)) FROM closed_polls_info WHERE user_id = %s'''
    cur.execute(jsonObjPollInfo,(user_id,))
    closedJsonArr = cur.fetchone()[0]
    #print("closed Arr",closedJsonArr)
    if closedJsonArr != None:
        closedList = json.loads(closedJsonArr)
        #print(closedList,type(closedList))
        index =0
        for obj in closedList:
            poll_id = (obj['poll_id'],)
            jsonArrPollOptions = '''SELECT JSON_ARRAYAGG(JSON_OBJECT('poll_option',poll_option,'option_count',option_count)) FROM closed_poll_options WHERE poll_id = %s;'''
            cur.execute(jsonArrPollOptions,poll_id)
            pollOptions = cur.fetchone()[0]
            closedList[index]['pollOptions']=json.loads(pollOptions)
            #print(closedList) 
            maxCount=0
            maxPollOptions=[]
            if pollOptions != None:
                for pollOption in json.loads(pollOptions):
                    count=pollOption['option_count']
                    if count >= maxCount:
                        maxCount =pollOption['option_count']
                for pollOption in json.loads(pollOptions):
                    if pollOption['option_count'] == maxCount:
                        maxPollOptions.append(pollOption['poll_option'])
                maxPercent =math.ceil(maxCount*100/obj['poll_count']) if (obj['poll_count']!=0) else 0
                closedList[index]['maxPercent'] = maxPercent
                closedList[index]['maxPollOptions'] = maxPollOptions
            index+=1
        return closedList
    else :
        return [{}]

def updateUpcomingToLive(user_id,obj,pollOptions,connection):
    #delete record from upcoming_polls-info , upcoming_poll_options 
    #insert record to live_polls_info, live_poll_options
    cur = connection.cursor(buffered=True)
    print("reached update upcoming to live")
    poll_id=obj['poll_id']
    print(obj)
    dataPollsInfo = (user_id,obj['title'],obj['open_date'],obj['open_time'],obj['close_date'],obj['close_time'],obj['poll_count'])

    deleteUpcomingQuery = '''DELETE FROM upcoming_polls_info WHERE poll_id=%s'''
    cur.execute(deleteUpcomingQuery,(poll_id,))
    deleteUpcomingQueryPollOptions = '''DELETE FROM live_poll_options WHERE poll_id=%s'''
    cur.execute(deleteUpcomingQueryPollOptions,(poll_id,))

    insertQueryLivePollsInfo = '''INSERT INTO live_polls_info(user_id,title ,open_date,open_time,close_date, close_time,poll_count) VALUES(%s,%s,%s,%s,%s,%s,%s);'''
    cur.execute(insertQueryLivePollsInfo,dataPollsInfo)
    poll_id = cur.lastrowid
    insertQueryLivePollOptions = '''INSERT INTO live_poll_options(poll_id, poll_option,option_count) VALUES(%s,%s,%s);'''
    print("polloption:" ,pollOptions)
    for pollOption in json.loads(pollOptions):
        print(pollOption)
        dataPollOptions = (poll_id,pollOption['poll_option'],pollOption['option_count'])
        cur.execute(insertQueryLivePollOptions,dataPollOptions)
    connection.commit()
    return True

def updateLiveToClosed(user_id,obj,pollOptions,connection):
    #delete record from upcoming_polls-info , upcoming_poll_options 
    #insert record to live_polls_info, live_poll_options
    cur = connection.cursor(buffered=True)
    print("reached update live to closed")

    poll_id=obj['poll_id']
    dataPollsInfo = (user_id,obj['title'],obj['open_date'],obj['open_time'],obj['close_date'],obj['close_time'],obj['poll_count'])

    deleteLiveQueryPollsInfo = '''DELETE FROM live_polls_info WHERE poll_id=%s'''
    cur.execute(deleteLiveQueryPollsInfo,(poll_id,))
    deleteliveQueryPollOptions = '''DELETE FROM live_poll_options WHERE poll_id=%s'''
    cur.execute(deleteliveQueryPollOptions,(poll_id,))
    insertQueryClosedPollsInfo = '''INSERT INTO closed_polls_info(user_id,title ,open_date,open_time,close_date, close_time,poll_count) VALUES(%s,%s,%s,%s,%s,%s,%s);'''
    cur.execute(insertQueryClosedPollsInfo,dataPollsInfo)
    poll_id = cur.lastrowid
    insertQueryLivePollOptions = '''INSERT INTO closed_poll_options(poll_id, poll_option,option_count) VALUES(%s,%s,%s);'''
    print(pollOptions)
    for pollOption in json.loads(pollOptions):
        print(pollOption)
        dataPollOptions = (poll_id,pollOption['poll_option'],pollOption['option_count'])
        cur.execute(insertQueryLivePollOptions,dataPollOptions)
    connection.commit()
    return True

if __name__ ==" __main__":
    app.run()