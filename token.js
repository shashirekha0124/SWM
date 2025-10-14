<html>
<title>Token</title>
<body>
<script>
// token.js
export async function fetchNewToken() {
  const tokenUrl = 'https://dsclitsapi.karnatakasmartcity.in/ITMSVehicleTripsUpdate/AuthenticateUser';

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',  // Use POST if API requires it
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        strUserName:"itms",
      strPassword:"Itms@123",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const token = data?.token || data?.access_token;

    if (token) {
      localStorage.setItem('authToken', token);
      console.log('✅ Token generated successfully:', token);
    } else {
      console.error('❌ Token not found in response:', data);
    }
  } catch (error) {
    console.error('⚠️ Token fetch error:', error);
  }
}

// Automatically refresh token every 1 hour
setInterval(fetchNewToken, 60 * 60 * 1000); // 1 hour
fetchNewToken(); // Initial token fetch
</body>
</html>

