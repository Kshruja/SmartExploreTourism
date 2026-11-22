# SmartExplore – Personalized Mysuru Travel Planner

## 1. Project Overview

SmartExplore is a personalized travel planning web application designed to help users explore popular tourist destinations in Mysuru, Karnataka.

The application recommends destinations and activities based on the user's interests, travel budget, number of travel days, and number of travellers. It also provides hotel suggestions and food options to make travel planning easier.

## 2. Features

- **Popular Destinations:** Displays popular tourist attractions in Mysuru.
- **Personalized Recommendations:** Recommends destinations based on selected interests, budget, and travel duration.
- **Interest Selection:** Allows users to choose from Historical, Nature, Architecture, Culture, Food, Shopping, and Adventure.
- **Hotel Suggestions:** Displays hotel options based on budget and hotel type.
- **Activity Suggestions:** Provides activities related to the user's selected interests.
- **Food Preferences:** Allows users to filter food suggestions by Vegetarian and Non-Vegetarian options.
- **Adventure Activities:** Includes activities such as trekking and cycling.
- **Estimated Costs:** Displays estimated costs for recommended destinations and activities.

## 3. Technologies Used

### Frontend
- React.js
- JavaScript
- HTML
- CSS

### Backend
- Python
- Flask
- Flask-CORS

## 4. Project Structure

```text
SmartExplore/
│
├── frontend/
│   ├── public/
│   │   ├── historical/
│   │   ├── nature/
│   │   ├── architecture/
│   │   ├── culture/
│   │   ├── food/
│   │   ├── shopping/
│   │   ├── adventure/
│   │   └── hotels/
│   │
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── services/
│   │
│   └── package.json
│
├── backend/
│   ├── app.py
│   └── recommend.py
│
└── README.md
```

*Note: Adjust the folder names above to match your actual project structure.*

## 5. Installation and Setup

### Prerequisites
- Python installed
- Node.js and npm installed
- Git installed

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/SmartExplore.git
cd SmartExplore
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 2: Start the Backend

Open a terminal in the backend folder:

```bash
pip install flask flask-cors
python app.py
```

The Flask backend runs on:

`http://127.0.0.1:5000`

### Step 3: Start the Frontend

Open another terminal in the frontend folder:

```bash
npm install
npm run dev
```

Open the local URL displayed in the terminal to access SmartExplore.

## 6. Recommendation System

SmartExplore uses a Python-based recommendation function to filter destinations according to:

- Selected travel interests
- Available budget
- Number of travel days
- Number of travellers

Destinations that match the selected interests and satisfy the budget and duration conditions are displayed as recommendations.

## 7. Project Objective

The main objective of SmartExplore is to simplify travel planning by providing personalized destination recommendations, hotel suggestions, activity options, and estimated travel costs in one application.

## 8. Screenshots

Screenshots of the application can be added here to demonstrate its interface and functionality.

---

**SmartExplore – Explore Mysuru Your Way!**

## Application Screenshots

### Homepage
![Homepage](screenshots/01-homepage.png)

### Popular Destinations
![Popular Destinations](screenshots/02-popular-destinations.png)

### Travel Planner
![Travel Planner](screenshots/03-travel-planner.png)

### Recommended Destinations
![Recommendations](screenshots/04-recommendations.png)

### Hotel Suggestions
![Hotels](screenshots/05-hotels.png)

### Activities and Food
![Activities](screenshots/06-activities-food.png)

### Adventure Activities
![Adventure](screenshots/07-adventure.png)