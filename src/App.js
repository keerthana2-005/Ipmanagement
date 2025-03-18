import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import VerifyPage from "./pages/VerifyPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignupPage />} />
                <Route path="/verify" element={<VerifyPage />} />
            </Routes>
        </Router>
    );
}

export default App;
