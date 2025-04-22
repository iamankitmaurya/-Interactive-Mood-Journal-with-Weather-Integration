Interactive Mood Journal with Weather Integration
Overview
This is an interactive mood journal web application where users can record their moods, write notes, and track the weather at the time of their entry. The application integrates with a weather API to automatically fetch current weather conditions based on the user's location. It also supports dark mode, a calendar for selecting dates, and JWT authentication for secure login/logout functionality.

Key Features:
Mood Tracking: Users can select their mood using emojis (😊, 😔, 😡, 😎, 🥲).

Note-Taking: Users can write a short note along with their mood entry.

Weather Integration: Automatically fetches and displays the current weather based on the user's geolocation.

Calendar: Allows users to select and view entries for specific dates.

Dark Mode: Toggle dark mode for a better user experience.

Authentication: Users must log in to add entries using JWT-based authentication.

Technologies Used
Frontend:

React.js

Bootstrap 5

React DatePicker (for calendar)

Axios (for API requests)

React Context API (for state management)

Backend:

Node.js with Express

JWT (JSON Web Tokens) for authentication

MongoDB (for data storage)

APIs:

Open Meteo API (for weather data)

Geolocation API (to get the user's location)

Setup Instructions
Prerequisites
Node.js (version 14 or above)

MongoDB instance (local or cloud)

A JWT-based authentication setup

1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/interactive-mood-journal.git
cd interactive-mood-journal
2. Install Frontend Dependencies
Navigate to the frontend directory and install the necessary dependencies:

bash
Copy
Edit
cd frontend
npm install
3. Install Backend Dependencies
Navigate to the backend directory and install the necessary dependencies:

bash
Copy
Edit
cd backend
npm install
4. Configure Environment Variables
Create a .env file in both the frontend and backend directories to store environment variables (such as API keys, JWT secrets, etc.).

For example, in the backend folder, add the following:

ini
Copy
Edit
MONGO_URI=mongodb://localhost:27017/mood-journal
JWT_SECRET=your_jwt_secret
For the frontend, ensure the API base URL is set correctly in your Axios calls.

5. Start the Application
Run Backend
In the backend folder, start the backend server:

bash
Copy
Edit
npm start
Run Frontend
In the frontend folder, start the frontend server:

bash
Copy
Edit
npm start
The application will now be running at http://localhost:3000 (frontend) and http://localhost:5000 (backend).

Usage
Login: Use the login functionality to authenticate the user and gain access to the app.

Add Entries: After logging in, users can add mood entries with their notes, select their mood emoji, and check the weather automatically.

View Entries: View past entries, including mood, note, weather, and the date of entry.

Dark Mode: Toggle dark mode by clicking the button at the top right.

Calendar: Use the calendar to select a date and view entries for that day.
