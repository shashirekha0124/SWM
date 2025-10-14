from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Allow only your GitHub Pages origin
CORS(app, origins=["https://shashirekha0124.github.io"])

@app.route("/get-token")
def get_token():
    token = "MY_SECURE_TOKEN_12345"
    return jsonify({"token": token})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
