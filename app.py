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
    insertQuery = '''INSERT INTO poll_info(title ,poll_id,open_date,openTime ,close_date , close_time) VALUES(%s,%s,%s,%s,%s,%s);'''
    data = (pollData['Title'],1,pollData['openingDate'],pollData['openingTime'],pollData['closingDate'],pollData['closingTime'])
    print(pollData)
    cur.execute(insertQuery,data)
    #cur.execute('''SELECT * from poll_info;''' )
    for x in cur:
        print(x)

    connection.commit()
    return "Done",201

if __name__ ==" __main__":
    app.run(debug= True)