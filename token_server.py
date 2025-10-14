from flask import Flask, jsonify
from My_token import TokenManager  # ✅ import your token class
from flask_cors import CORS

app = Flask(__name__)

# Allow only your GitHub Pages origin
CORS(app, origins=["https://shashirekha0124.github.io"])

# Create a global token manager
token_manager = TokenManager()

# Route to get current token
@app.route('/get-token', methods=['GET'])
def get_token():
    try:
        token = token_manager.get_token()
        return jsonify({
            'token': token,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'failed'
        }), 500

# Run the Flask server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

