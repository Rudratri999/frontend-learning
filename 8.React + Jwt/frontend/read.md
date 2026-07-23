Register
   ↓
POST /register
   ↓
User Stored
   ↓
Login
   ↓
POST /login
   ↓
JWT Generated
   ↓
Token Sent
   ↓
React stores token
   ↓
Dashboard
   ↓
GET /profile
Authorization: Bearer TOKEN
   ↓
Token Verified
   ↓
User Data Returned
   ↓
Welcome rudra
   ↓
Logout
   ↓
Token Removed


Example 1

Backend:

return {
    "message": "Welcome Rudra"
}

Frontend:

setMessage(response.data.message)

✅ Works


Example 2

Backend:

return {
    "username": current_user
}

Frontend:

response.data.username

✅ Works

Example 3

Backend:

return {
    "name": "Rudra",
    "role": "Developer"
}

Frontend:

response.data.name
response.data.role

✅ Works

FastAPI Return
      ↓
JSON Response
      ↓
response.data
      ↓
Access keys by name