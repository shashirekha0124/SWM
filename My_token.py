import requests
import time

AUTH_URL = "https://dsclitsapi.karnatakasmartcity.in/ITMSVehicleTripsUpdate/AuthenticateUser"
CREDENTIALS = {
    "strUserName": "itms",
    "strPassword": "Itms@123"
}
headers = {"Content-Type": "application/json"}

class TokenManager:
    def __init__(self):
        self.token = None
        self.expiry_time = 0  # Timestamp when token expires

    def get_token(self):
        current_time = time.time()
        # Refresh token if none or about to expire within 5 minutes
        if not self.token or current_time >= self.expiry_time:
            self.token = self.generate_token()
        return self.token

    def generate_token(self):
        response = requests.post(AUTH_URL, json=CREDENTIALS, headers=headers)
        data = response.json()
        
        print("Response JSON:", data)  # Debug print

        token = None
        expiry_seconds = 0

        if isinstance(data, list) and len(data) > 0:
            token = data[0].get("responsecode")
            expiry_seconds = data[0].get("Session Expiry", 0)

        # Set expiry time, refresh 5 minutes (300 seconds) before actual expiry
        self.expiry_time = time.time() + expiry_seconds - 300 if expiry_seconds > 300 else time.time() + expiry_seconds
        
        return token

# Usage example
if __name__ == "__main__":
    token_manager = TokenManager()
    api_token = token_manager.get_token()
    print("API Token:", api_token)
