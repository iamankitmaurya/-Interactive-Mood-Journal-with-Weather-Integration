import axios from "axios";
import React, { useEffect, useState } from "react";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import EntryForm from "./components/Entry/EntryForm";
import EntryList from "./components/Entry/EntryList";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (token) fetchEntries();
  }, [token]);

  const fetchEntries = async () => {
    const res = await axios.get("http://localhost:5000/api/entries", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEntries(res.data.entries);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setPage("login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-pink-100 p-4">
      {token ? (
        <div className="max-w-2xl mx-auto">
          <Navbar onLogout={handleLogout} />
          <EntryForm token={token} onAdd={fetchEntries} />
          <EntryList entries={entries} />
        </div>
      ) : page === "login" ? (
        <LoginForm
          onSuccess={(token) => {
            setToken(token);
            setPage("home");
          }}
          onSwitch={() => setPage("register")}
        />
      ) : (
        <RegisterForm onSwitch={() => setPage("login")} />
      )}
    </div>
  );
}

export default App;
