import { useState } from "react";
import { verifyCode } from "../api";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const handleVerify = async () => {
        try {
            await verifyCode(email, code);
            navigate("/login");  // Redirect to login page after verification
        } catch (err) {
            setError(err.response?.data?.message || "Invalid verification code!");
        }
    };

    return (
        <div>
            <h2>Enter Verification Code</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input type="text" placeholder="Enter code" value={code} onChange={(e) => setCode(e.target.value)} />
            <button onClick={handleVerify}>Verify</button>
        </div>
    );
};

export default VerifyEmail;
