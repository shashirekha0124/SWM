// token.js
// Handles token generation and refresh for ArcGIS services

// Replace with your actual ArcGIS credentials
const CLIENT_ID = "itms";
const CLIENT_SECRET = "Itms@123";

// Token settings
const TOKEN_URL = "https://dsclitsapi.karnatakasmartcity.in/ITMSVehicleTripsUpdate/AuthenticateUser";
const TOKEN_LIFETIME_MS = 60 * 60 * 1000; // 1 hour
const REFRESH_BEFORE_MS = 5 * 60 * 1000; // refresh 5 mins before expiry

/**
 * Fetch a new ArcGIS token using client credentials
 */
async function fetchNewToken() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "client_credentials",
    f: "json"
  });

  try {
    const response = await fetch(TOKEN_URL, {
      method: "POST",
      body: params
    });

    const data = await response.json();

    if (data.access_token) {
      const expiryTime = Date.now() + (data.expires_in * 1000);
      localStorage.setItem("authToken", data.access_token);
      localStorage.setItem("tokenExpiry", expiryTime.toString());
      console.info("[TOKEN] New token fetched successfully.");
      return data.access_token;
    } else {
      console.error("[TOKEN] Failed to fetch token:", data);
      return null;
    }
  } catch (err) {
    console.error("[TOKEN] Error fetching token:", err);
    return null;
  }
}

/**
 * Ensures a valid token is available
 */
async function ensureValidToken() {
  const token = localStorage.getItem("authToken");
  const expiry = Number(localStorage.getItem("tokenExpiry"));

  if (!token || !expiry || Date.now() > expiry - REFRESH_BEFORE_MS) {
    return await fetchNewToken();
  }

  return token;
}

/**
 * Automatically refresh token before expiry
 */
function scheduleAutoRefresh() {
  const timeout = TOKEN_LIFETIME_MS - REFRESH_BEFORE_MS;
  setTimeout(fetchNewToken, timeout);
  console.info("[TOKEN] Auto-refresh scheduled.");
}

// Initialize on page load
(async function initTokenSystem() {
  const token = await ensureValidToken();
  if (token) {
    console.log("[TOKEN] Ready to use:", token);
    scheduleAutoRefresh();
  }
})();

