from flask import Flask, jsonify
app = Flask(__name__)

@app.route('/get-token')
def get_token():
    token = "your_token_here"
    return jsonify({"token": token})

if __name__ == "__main__":
    app.run(port=5000)
