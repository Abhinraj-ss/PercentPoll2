from distutils.log import debug
from flask import Flask

app = Flask(__name__)

@app.route("/members")
def server():
    return {"members": ["member1", "member2"]}

if __name__ ==" __main__":
    app.run(debug= True)