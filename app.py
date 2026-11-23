
from flask import Flask, jsonify, request
from flask_cors import CORS
from recommend import recommend_destinations

app = Flask(__name__)

CORS(app)

# Sample tourism destination database

# Sample tourism destination database
destinations = [
    {
        "id": 1,
        "name": "Mysore Palace",
        "category": "Historical",
        "location": "Mysuru",
        "budget": 100,
        "description": "Explore the magnificent royal palace of Mysuru.",
        "image": "/historical/mysore-palace.avif"
    },
    {
        "id": 2,
        "name": "Chamundi Hills",
        "category": "Nature",
        "location": "Mysuru",
        "budget": 50,
        "description": "Enjoy beautiful views of Mysuru.",
        "image": "/nature/chamundi-hills.jpg"
    },
    {
        "id": 3,
        "name": "Brindavan Gardens",
        "category": "Nature",
        "location": "Mysuru",
        "budget": 100,
        "description": "Experience beautiful gardens and musical fountains.",
        "image": "/nature/Brindavan-Gardens.jpg"
    },
    {
        "id": 4,
        "name": "St. Philomena's Church",
        "category": "Architecture",
        "location": "Mysuru",
        "budget": 0,
        "description": "Discover beautiful neo-Gothic architecture.",
        "image": "/architecture/St.-Philomenas-Cathedral.webp"
    },
    {
        "id": 5,
        "name": "Mysore Palace",
        "category": "Architecture",
        "location": "Mysuru",
        "budget": 100,
        "description": "Admire the magnificent Indo-Saracenic architecture of Mysore Palace.",
        "image": "/architecture/mysore-palace.avif"
    }
]



#Hotel Database
hotels = [
    # Budget Hotels
    {
        "id": 1,
        "name": "Yuvraj Galaxy Inn",
        "type": "Budget",
        "price": 1500,
        "facilities": "Comfortable rooms and family accommodation",
        "image": "/hotels/yuvraj-galaxy.jpg"
    },
    {
        "id": 2,
        "name": "Yuvraj Palace Inn",
        "type": "Budget",
        "price": 1800,
        "facilities": "Comfortable rooms and convenient city access",
        "image": "/hotels/yuvraj-palace.jpg"
    },
    {
        "id": 3,
        "name": "Yuvraj Comforts",
        "type": "Budget",
        "price": 2000,
        "facilities": "Modern amenities and comfortable accommodation",
        "image": "/hotels/yuvraj-comforts.avif"
    },

    # Mid-range Hotels
    {
        "id": 4,
        "name": "Emerald Urban Comforts",
        "type": "Mid-range",
        "price": 4500,
        "facilities": "Modern rooms and vegetarian dining",
        "image": "/hotels/emerald-urban.jpeg"
    },
    {
        "id": 5,
        "name": "ibis Styles Mysuru",
        "type": "Mid-range",
        "price": 5500,
        "facilities": "Modern accommodation and rooftop dining",
        "image": "/hotels/ibis-styles.jpg"
    },
    {
        "id": 6,
        "name": "Southern Star Mysore",
        "type": "Mid-range",
        "price": 6000,
        "facilities": "Restaurant, garden surroundings and comfortable rooms",
        "image": "/hotels/southern-star.avif"
    },

    # Luxury Hotels
    {
        "id": 7,
        "name": "Radisson Blu Plaza Hotel, Mysore",
        "type": "Luxury",
        "price": 9000,
        "facilities": "Premium rooms, dining and swimming pool",
        "image": "/hotels/radisson-blu.jpg"
    },
    {
        "id": 8,
        "name": "Royal Orchid Metropole",
        "type": "Luxury",
        "price": 8500,
        "facilities": "Heritage architecture, dining and outdoor pool",
        "image": "/hotels/royal-orchid.jpg"
    },
    {
        "id": 9,
        "name": "Lalitha Mahal Palace Hotel",
        "type": "Luxury",
        "price": 8000,
        "facilities": "Heritage palace accommodation and royal ambience",
        "image": "/hotels/lalitha-mahal.jpg"
    }
]

# =========================================
# GET ALL DESTINATIONS
# =========================================

@app.route("/api/destinations", methods=["GET"])
def get_destinations():
    return jsonify(destinations)


# =========================================
# GET RECOMMENDED HOTELS
# =========================================

@app.route("/api/hotels", methods=["POST"])
def get_hotels():

    data = request.get_json() or {}

    budget = float(data.get("budget", 3000))
    hotel_type = data.get("hotelType", "Any")

    recommended_hotels = []

    for hotel in hotels:

        if hotel["price"] <= budget:

            if hotel_type == "Any" or hotel["type"] == hotel_type:
                recommended_hotels.append(hotel)

    return jsonify(recommended_hotels)


# =========================================
# GET DESTINATION BY ID
# =========================================

@app.route("/api/destinations/<int:destination_id>")
def get_destination(destination_id):

    destination = next(
        (d for d in destinations if d["id"] == destination_id),
        None
    )

    if destination:
        return jsonify(destination)

    return jsonify({
        "error": "Destination not found"
    }), 404


# =========================================
# GET PERSONALIZED RECOMMENDATIONS
# =========================================

@app.route("/api/recommend", methods=["POST"])
def recommend():

    data = request.get_json() or {}

    interests = data.get("interests", [])
    budget = float(data.get("budget", 3000))
    days = int(data.get("days", 2))
    travellers = int(data.get("travellers", 2))

    results = recommend_destinations(
        interests=interests,
        budget=budget,
        days=days,
        travellers=travellers
    )

    return jsonify(results)


# =========================================
# RUN FLASK SERVER
# =========================================

if __name__ == "__main__":
    app.run(debug=True, port=5000)

