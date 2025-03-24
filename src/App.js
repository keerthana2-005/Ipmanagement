import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import VerificationPage from "./pages/VerificationPage"; // Import VerificationPage
import LoginPage from "./pages/LoginPage"; // Import LoginPage component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />  {/* Add LoginPage Route */}
      </Routes>
    </Router>
  );
};

export default App;
