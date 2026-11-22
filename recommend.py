
destinations = [
    {
        "name": "Mysore Palace",
        "category": "Historical",
        "location": "Mysuru",
        "cost_per_person": 100,
        "duration": 2,
        "image": "/historical/mysore-palace.avif"
    },
    {
        "name": "Chamundi Hills",
        "category": "Nature",
        "location": "Mysuru",
        "cost_per_person": 200,
        "duration": 2,
        "image": "/nature/chamundi-hills.jpg"
    },
    {
        "name": "Brindavan Gardens",
        "category": "Nature",
        "location": "Mysuru",
        "cost_per_person": 150,
        "duration": 3,
        "image": "/nature/Brindavan-Gardens.jpg"
    },
    {
        "name": "St. Philomena's Church",
        "category": "Architecture",
        "location": "Mysuru",
        "cost_per_person": 0,
        "duration": 1,
        "image": "/architecture/St.-Philomenas-Cathedral.webp"
    },
    {
        "name": "Chamundi Hills Trekking",
        "category": "Adventure",
        "location": "Mysuru",
        "cost_per_person": 200,
        "duration": 1,
        "image": "/adventure/treking.jpg"
    },
    {
        "name": "Kunti Betta Trekking",
        "category": "Adventure",
        "location": "Pandavapura, Mandya",
        "cost_per_person": 500,
        "duration": 1,
        "image": "/adventure/kunti-betta.jpg"
    },
]


def recommend_destinations(
    interests,
    budget=3000,
    days=2,
    travellers=2
):
    interests = [item.lower() for item in interests]

    recommendations = []

    for place in destinations:
        if place["category"].lower() in interests:

            estimated_cost = (
                place["cost_per_person"] * travellers
            )

            if estimated_cost <= budget and place["duration"] <= days:

                result = place.copy()
                result["estimated_total_cost"] = estimated_cost

                recommendations.append(result)

    return recommendations


if __name__ == "__main__":
    results = recommend_destinations(
        interests=["Nature"],
        budget=3000,
        days=2,
        travellers=2
    )

    print("Personalized destination recommendations:")

    for place in results:
        print(place)
