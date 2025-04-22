import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

function EntryList({ entries }) {
  const [isDarkMode, setIsDarkMode] = useState(false); // State to toggle dark mode

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`container my-4 ${isDarkMode ? "bg-dark text-light" : ""}`}>
      {/* Dark Mode Toggle Button */}
      <button
        className={`btn ${isDarkMode ? "btn-light" : "btn-dark"} mb-3`}
        onClick={toggleDarkMode}
      >
        Dark Mode
      </button>

      <h3 className="text-center mb-4">Your Mood Entries</h3>

      {entries.length === 0 ? (
        <div
          className={`alert ${
            isDarkMode ? "alert-secondary" : "alert-info"
          } text-center`}
        >
          No entries found.
        </div>
      ) : (
        <div className="row">
          {entries.map((entry) => (
            <div className="col-md-6 col-lg-4 mb-4" key={entry._id}>
              <div
                className={`card shadow-sm h-100 ${
                  isDarkMode ? "bg-secondary text-light" : ""
                }`}
              >
                <div className="card-body">
                  <h5 className="card-title text-primary">{entry.mood}</h5>
                  <p className="card-text">{entry.note}</p>
                  {entry.weather && (
                    <p className="card-text">
                      <small className="text-muted">
                        Weather: {entry.weather}
                      </small>
                    </p>
                  )}
                  {entry.location && (
                    <p className="card-text">
                      <small className="text-muted">
                        Location: {entry.location}
                      </small>
                    </p>
                  )}
                  {entry.date && (
                    <p className="card-text">
                      <small className="text-muted">
                        Date: {new Date(entry.date).toLocaleString()}
                      </small>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EntryList;
