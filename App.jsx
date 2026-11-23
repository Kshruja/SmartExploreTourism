
import { useEffect, useState } from "react";
import { getDestinations, getRecommendations, getHotels } from "./api";
import "./App.css";

const interestOptions = [
  "Historical",
  "Nature",
  "Architecture",
  "Culture",
  "Food",
  "Shopping",
  "Adventure",
];

// Correct destination image paths
const destinationImages = {
  "mysore palace": "/historical/mysore-palace.avif",
  "chamundi hills": "/nature/chamundi-hills.jpg",
  "brindavan gardens": "/nature/Brindavan-Gardens.jpg",
  "st. philomena's church": "/architecture/St.-Philomenas-Cathedral.webp",
};

// Get the correct image based on destination name

const getDestinationImage = (place) => {
  const name = place.name?.trim().toLowerCase();
  const category = place.category?.trim().toLowerCase();

  const categoryImages = {
    "mysore palace": {
      historical: "/historical/mysore-palace.avif",
      architecture: "/architecture/mysore-palace.avif",
    },
    "chamundi hills": {
      historical: "/historical/chamundi-hills.jpg",
      nature: "/nature/chamundi-hills.jpg",
    },
    "st. philomena's church": {
      historical: "/historical/St.-Philomenas-Cathedral.webp",
      architecture: "/architecture/St.-Philomenas-Cathedral.webp",
    },
    "brindavan gardens": {
      nature: "/nature/Brindavan-Gardens.jpg",
    },
  };

  return categoryImages[name]?.[category] || place.image || "";
};


const activities = [
  // Historical
  {
    name: "Mysore Palace Tour",
    category: "Historical",
    price: 100,
    image: "/historical/mysore-palace.avif"
  },
  {
    name: "Chamundi Hills Visit",
    category: "Historical",
    price: 200,
    image: "/historical/chamundi-hills.jpg"
  },
  {
    name: "St. Philomena's Church Visit",
    category: "Historical",
    price: 0,
    image: "/historical/St.-Philomenas-Cathedral.webp"
  },

  // Nature
  {
    name: "Chamundi Hills Visit",
    category: "Nature",
    price: 200,
    image: "/nature/chamundi-hills.jpg"
  },
  {
    name: "Brindavan Gardens Visit",
    category: "Nature",
    price: 150,
    image: "/nature/Brindavan-Gardens.jpg"
  },
  {
    name: "Mysore Zoo",
    category: "Nature",
    price: 120,
    image: "/nature/mysore-zoo.webp"
  },

  // Architecture
  {
    name: "St. Philomena's Church Visit",
    category: "Architecture",
    price: 0,
    image: "/architecture/St.-Philomenas-Cathedral.webp"
  },
  {
    name: "Mysore Palace Tour",
    category: "Architecture",
    price: 100,
    image: "/architecture/mysore-palace.avif"
  },

  // Culture
  {
    name: "Mysuru Dasara Experience",
    category: "Culture",
    price: 300,
    image: "/culture/mysuru-dasara.webp"
  },
  {
    name: "KSIC Mysore Silk Factory",
    category: "Culture",
    price: 16000,
    image: "/culture/mysore-silk.jpeg"
  },
  {
    name: "Sandalwood and Handicrafts Experience",
    category: "Culture",
    price: 150,
    image: "/culture/sandalwood-handicrafts.jpg"
  },

  // Food
  {
    name: "Hotel RRR",
    category: "Food",
    foodType: "Both",
    price: 300,
    image: "/food/Hotel-RRR.webp"
  },
  {
    name: "Hotel Vinayaka Mylari",
    category: "Food",
    foodType: "Veg",
    price: 100,
    image: "/food/Mylari-Dose.jpg"
  },
  {
    name: "Indra Cafe's Paras Visit",
    category: "Food",
    foodType: "Veg",
    price: 200,
    image: "/food/indra-cafe.webp"
  },
  {
    name: "Hotel Vaibhav",
    category: "Food",
    foodType: "Non-Veg",
    price: 250,
    image: "/food/hotel-vaibhav.jpg"
  },

  // Shopping
  {
    name: "Devaraja Market Shopping",
    category: "Shopping",
    price: 200,
    image: "/shopping/devaraja-market.webp"
  },
  {
    name: "KSIC Mysore Silk Factory",
    category: "Shopping",
    price: 16000,
    image: "/shopping/mysore-ksic.webp"
  },
  {
    name: "Nexus Centre City Mall Visit",
    category: "Shopping",
    price: 0,
    image: "/shopping/NexusCentreCity.jpeg"
  },
  {
    name: "Mall of Mysore Visit",
    category: "Shopping",
    price: 0,
    image: "/shopping/mallofmysore.jpg"
  },
  {
    name: "BM Habitat Mall Visit",
    category: "Shopping",
    price: 0,
    image: "/shopping/BM-habitat-mall.jpg"
  },


// Adventure
  {
  name: "Chamundi Hills Trekking",
  category: "Adventure",
  price: 200,
  image: "/adventure/treking.jpg"
  },
  {
  name: "Kunti Betta Trekking",
  category: "Adventure",
  price: 500,
  image: "/adventure/kunti-betta.jpg"
  },
  {
  name: "Mysuru Cycling Experience",
  category: "Adventure",
  price: 300,
  image: "/adventure/cycle.webp"
  },
  {
  name: "Karanji Lake Boating Experience",
  category: "Adventure",
  price: 100,
  image: "/adventure/karanji-lake.jpg"
  },
  {
  name: "GRS Fantasy Park",
  category: "Adventure",
  price: 2000,
  image: "/adventure/GRS.webp"
  },

];

function App() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [interests, setInterests] = useState([]);
  const [foodPreference, setFoodPreference] = useState("All");
  const [budget, setBudget] = useState("3000");
  const [days, setDays] = useState("2");
  const [travellers, setTravellers] = useState("2");
  const [hotelType, setHotelType] = useState("Any");
  const [hotels, setHotels] = useState([]);
  

  const [recommendations, setRecommendations] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  


  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const data = await getDestinations();
        setDestinations(data);
      } catch (err) {
        setError(
          "Unable to load destinations. Please check the backend server."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDestinations();
  }, []);

  const handleInterestChange = (interest) => {
    setInterests((previous) =>
      previous.includes(interest)
        ? previous.filter((item) => item !== interest)
        : [...previous, interest]
    );

    setSubmitted(false);
  };

  const handleGetHotels = async () => {
    try {
      const results = await getHotels(budget, hotelType);
      setHotels(results);
    } catch (err) {
      console.error("Could not load hotels:", err);
      alert("Unable to load hotels. Please check the backend.");
    }
  };

  const handleRecommend = async () => {
    if (interests.length === 0) {
      alert("Please select at least one interest.");
      return;
    }

    try {
      setLoadingRecommendations(true);

      const results = await getRecommendations({
        interests: interests,
        budget: Number(budget),
        days: Number(days),
        travellers: Number(travellers),
      });

      setRecommendations(results);

      await handleGetHotels();

      setSubmitted(true);
    } catch (err) {
      console.error("Could not load recommendations:", err);
      alert("Unable to get recommendations. Please check the backend.");
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const selectedHotels = hotels;

  const selectedActivities = activities.filter((activity) => {
    const matchesInterest = interests.includes(activity.category);

    const matchesFoodPreference =
      activity.category !== "Food" ||
      foodPreference === "All" ||
      activity.foodType === foodPreference ||
      activity.foodType === "Both";

    return matchesInterest && matchesFoodPreference;
  });

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">
          Smart<span>Explore.</span>
        </h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#destinations">Destinations</a>
          <a href="#planner">Plan Trip</a>
          <a href="#results">Recommendations</a>
        </div>

        <a href="#planner">
          <button className="login-btn">Get Started</button>
        </a>
      </nav>

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="tagline">
            YOUR PERSONAL MYSURU TRAVEL PLANNER
          </p>

          <h1>
            Explore Mysuru,<br />
            <span>Your Way.</span>
          </h1>

          <p className="description">
            Discover destinations, hotels and activities selected
            around your interests, budget and travel preferences.
          </p>

          <a href="#planner">
            <button className="explore-btn">
              Plan Your Trip →
            </button>
          </a>
        </div>
      </section>

      {/* POPULAR DESTINATIONS SECTION */}
      <section className="destinations" id="destinations">
        <p className="tagline">DISCOVER THE CITY</p>

        <h2>Popular Mysuru Destinations</h2>

        {loading && <p>Loading destinations...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <div className="destination-grid">
            {destinations.map((place, index) => (
              <div
                className="destination-card"
                key={place.id ?? place.name ?? index}
              >
                <img
                  src={getDestinationImage(place)}
                  alt={place.name}
                  className="destination-image"
                  onError={(e) => {
                    console.error(
                      "Popular destination image failed:",
                      e.currentTarget.src
                    );
                    e.currentTarget.style.display = "none";
                  }}
                />

                <div className="destination-info">
                  <h3>{place.name}</h3>
                  <p>{place.category}</p>
                  <p>{place.location}</p>

                  <span>
                    Estimated budget: ₹
                    {place.budget ?? "Not specified"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* TRAVEL PLANNER */}
      <section className="recommendation-section" id="planner">
        <p className="tagline">
          PERSONALIZED TRAVEL PLANNING
        </p>

        <h2>Plan Your Mysuru Trip</h2>

        <p>
          Tell us what you enjoy. SmartExplore will help you plan your visit.
        </p>

        <div className="planner-form">
          <h3>1. Choose Your Interests</h3>

          <div className="interest-options">
            {interestOptions.map((interest) => (
              <label key={interest}>
                <input
                  type="checkbox"
                  checked={interests.includes(interest)}
                  onChange={() => handleInterestChange(interest)}
                />
                {interest}
              </label>
            ))}
          </div>
            {interests.includes("Food") && (
              <div className="food-preference">
                <h3>Food Preference</h3>

                <select
                  value={foodPreference}
                  onChange={(e) => setFoodPreference(e.target.value)}
                >
                  <option value="All">All Food Options</option>
                  <option value="Veg">Vegetarian</option>
                  <option value="Non-Veg">Non-Vegetarian</option>
                </select>
              </div>
            )}

          <h3>2. Your Travel Preferences</h3>

          <div className="preference-grid">
            <label>
              Total Budget (₹)
              <input
                type="number"
                min="1"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </label>

            <label>
              Number of Travel Days
              <input
                type="number"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />
            </label>

            <label>
              Number of Travellers
              <input
                type="number"
                min="1"
                max="50"
                value={travellers}
                onChange={(e) => setTravellers(e.target.value)}
              />
            </label>

            <label>
              Preferred Hotel Type
              <select
                value={hotelType}
                onChange={(e) => setHotelType(e.target.value)}
              >
                <option value="Any">Any</option>
                <option value="Budget">Budget</option>
                <option value="Mid-range">Mid-range</option>
                <option value="Luxury">Luxury</option>
              </select>
            </label>
          </div>

          <button
            onClick={handleRecommend}
            disabled={
              loadingRecommendations || interests.length === 0
            }
          >
            {loadingRecommendations
              ? "Finding Recommendations..."
              : "Find My Travel Recommendations"}
          </button>
        </div>
      </section>

      {/* RECOMMENDATION RESULTS */}
      {submitted && (
        <section
          className="recommendation-section"
          id="results"
        >
          <p className="tagline">
            YOUR PERSONALIZED RESULTS
          </p>

          <h2>Your Mysuru Travel Recommendations</h2>

          {/* RECOMMENDED DESTINATIONS */}
          <h3>Recommended Destinations</h3>

          <div className="destination-grid">
            {recommendations.length > 0 ? (
              recommendations.map((place, index) => (
                <article
                  className="destination-card"
                  key={place.id ?? place.name ?? index}
                >
                  <img
                    src={getDestinationImage(place)}
                    alt={place.name}
                    className="destination-image"
                    onError={(e) => {
                      console.error(
                        "Recommended destination image failed:",
                        e.currentTarget.src
                      );
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="destination-info">
                    <h3>{place.name}</h3>
                    <p>{place.category}</p>
                    <p>{place.location}</p>

                    {place.estimated_total_cost !== undefined && (
                      <span>
                        Estimated total cost: ₹
                        {place.estimated_total_cost}
                      </span>
                    )}
                  </div>
                </article>
              ))
            ) : (
              <p>
                No matching destinations found. Try other interests.
              </p>
            )}
          </div>

          {/* HOTEL SUGGESTIONS */}
          <h3>Hotel Suggestions</h3>

          <div className="destination-grid">
            {selectedHotels.length > 0 ? (
              selectedHotels.map((hotel) => (
                <article
                  className="destination-card"
                  key={hotel.name}
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="hotel-image"
                    onError={(e) => {
                      console.error(
                        "Hotel image failed:",
                        e.currentTarget.src
                      );
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="destination-info">
                    <h3>{hotel.name}</h3>
                    <p>{hotel.type}</p>
                    <p>{hotel.facilities}</p>

                    <span>
                      Estimated price per night: ₹{hotel.price}
                    </span>
                  </div>
                </article>
              ))
            ) : (
              <p>
                No sample hotels match your selected budget and hotel type.
              </p>
            )}
          </div>

          {/* SUGGESTED ACTIVITIES */}
          <h3>Suggested Activities</h3>

          <div className="destination-grid">
            {selectedActivities.length > 0 ? (
              selectedActivities.map((activity, index) => (
                <article
                  className="destination-card"
                  key={`${activity.name}-${activity.category}-${index}`}
                >
                  <img
                    src={activity.image}
                    alt={activity.name}
                    className="activity-image"
                    onError={(e) => {
                      console.error(
                        "Activity image failed:",
                        e.currentTarget.src
                      );
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="destination-info">
                    <h3>{activity.name}</h3>
                    <p>{activity.category}</p>

                    <span>
                      Sample estimated cost: ₹
                      {activity.price} per person
                    </span>
                  </div>
                </article>
              ))
            ) : (
              <p>
                No activities match your selected interests yet.
              </p>
            )}
          </div>

          {/* TRIP SUMMARY */}
          <p>
            Trip duration: {days} day(s) | Travellers: {travellers} |
            Total budget: ₹{budget}
          </p>
        </section>
      )}

      {/* FOOTER */}
      <footer>
        <h2>SmartExplore.</h2>
        <p>Discover Mysuru. Travel your way.</p>
      </footer>

    </div>
  );
}

export default App;
