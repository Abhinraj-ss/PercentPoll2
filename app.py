from crypt import methods
from flask import Flask, request
import mysql.connector

app = Flask(__name__)

connection = mysql.connector.connect(host="localhost",user = "root", passwd ="root", auth_plugin='mysql_native_password')

cur = connection.cursor()

#cur.execute('''CREATE DATABASE percentpoll;''')
cur.execute('''USE percentpoll;''' )





@app.route("/members")
def server():
    return {"members": ["member1", "member2"]}

@app.route("/newpoll", methods=["POST"])
def newPoll():
    pollData = request.get_json()
    insertQueryPollsInfo = '''INSERT INTO polls_info(user_id,title ,open_date,openTime,close_date, close_time) VALUES(%s,%s,%s,%s,%s,%s);'''
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

if __name__ ==" __main__":
    app.run(debug= True)