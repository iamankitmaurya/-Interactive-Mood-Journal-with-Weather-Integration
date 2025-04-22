import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker"; // Import react-datepicker for calendar
import "react-datepicker/dist/react-datepicker.css"; // Import the datepicker styles

function EntryForm({ onAdd }) {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [weather, setWeather] = useState("");
  const [location, setLocation] = useState(""); // State for location
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch weather based on user's geolocation
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Fetching weather data
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
          );
          const data = await response.json();
          setWeather(`${data.current.temperature_2m}°C`);
        } catch (err) {
          console.error("Weather fetch error:", err);
          setWeather("N/A");
        }

        // Fetching location name based on user's geolocation (reverse geocoding)
        try {
          const geoResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const geoData = await geoResponse.json();
          setLocation(
            geoData.address.city ||
              geoData.address.town ||
              geoData.address.village ||
              "Unknown"
          );
        } catch (err) {
          console.error("Location fetch error:", err);
          setLocation("N/A");
        }
      },
      (err) => {
        console.error("Location error:", err);
        setWeather("N/A");
        setLocation("N/A");
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("You must be logged in.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/entries",
        {
          mood,
          note,
          date: selectedDate.toISOString(), // Pass selected date
          weather,
          location, // Send location data
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Entry added:", response.data);
      onAdd();
      setMood("");
      setNote("");
      setError("");
    } catch (err) {
      console.error("Add entry error:", err.response?.data || err);
      setError(err.response?.data?.error || "Failed to add entry");
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", !isDarkMode);
  };

  // Emoji selection handler
  const handleEmojiClick = (emoji) => {
    setMood(emoji);
  };

  return (
    <div
      className={`container p-4 rounded shadow-lg ${
        isDarkMode ? "bg-dark text-light" : "bg-light"
      }`}
      style={{ transition: "all 0.3s ease" }}
    >
      <div className="position-relative">
        {/* Dark Mode Toggle Button at Top Right */}
        <button
          className={`btn ${
            isDarkMode ? "btn-light" : "btn-dark"
          } position-absolute top-0 end-0 m-3 shadow-sm`}
          onClick={toggleDarkMode}
        >
          Dark Mode
        </button>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <h3 className="text-center mb-4">
              <span className="text-primary">Record Your Mood</span>
            </h3>
            <form onSubmit={handleSubmit} className="form-container">
              <div className="mb-3">
                <label className="form-label text-info">Mood:</label>
                <div className="d-flex justify-content-start">
                  {/* Emoji Selection */}
                  {["😊", "😔", "😡", "😎", "🥲"].map((emoji, index) => (
                    <button
                      type="button"
                      key={index}
                      className={`btn btn-outline-primary mx-2 animate__animated animate__fadeIn ${
                        mood === emoji ? "active bg-primary text-white" : ""
                      }`}
                      style={{ fontSize: "2rem", transition: "all 0.2s ease" }}
                      onClick={() => handleEmojiClick(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label text-info">Note:</label>
                <textarea
                  className="form-control animate__animated animate__fadeInUp"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  required
                  style={{ transition: "all 0.3s ease" }}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label text-info">Weather (auto):</label>
                <input
                  type="text"
                  className="form-control animate__animated animate__fadeInUp"
                  value={weather}
                  disabled
                  style={{ transition: "all 0.3s ease" }}
                />
              </div>

              {/* Location (auto) */}
              <div className="mb-3">
                <label className="form-label text-info">Location (auto):</label>
                <input
                  type="text"
                  className="form-control animate__animated animate__fadeInUp"
                  value={location}
                  disabled
                  style={{ transition: "all 0.3s ease" }}
                />
              </div>

              {/* Calendar (Date Picker) */}
              <div className="mb-3">
                <label className="form-label text-info">Select Date:</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="form-control animate__animated animate__fadeInUp"
                  dateFormat="MMMM d, yyyy"
                />
              </div>

              {error && <p className="text-danger">{error}</p>}
              <button
                type="submit"
                className="btn btn-success w-100 animate__animated animate__fadeIn"
                disabled={loading}
                style={{ transition: "all 0.3s ease" }}
              >
                {loading ? "Adding..." : "Add Entry"}
              </button>
            </form>
          </div>

          {/* Calendar Column */}
          <div className="col-md-3">
            <h4 className="text-center text-info">Calendar</h4>
            {/* Just a placeholder div for the calendar */}
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
              className="d-block mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryForm;
