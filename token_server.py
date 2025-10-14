from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # this allows all origins; for stricter security, specify only your domain

@app.route("/get-token")
def get_token():
    token = "your_token_here"
    return jsonify({"token": token})

if __name__ == "__main__":
    app.run(port=5000)
