import React from "react";
import { useAuth } from "context/authContext";
import "./App.css";
import { AuthenticatedApp } from "screens/authenticatedApp";
import { UnAuthenticatedApp } from "screens/unAuthenticatedApp";
// import HomeWork1 from "homework/home-1";
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </div>
  );
}

export default App;
