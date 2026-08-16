import "./styles/sign_up.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
function sign_up() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            await api.post("/signup", {
                username,
                email,
                password,
            });

            alert("Account created successfully!");

            navigate("/sign_in");

        } catch (error: any) {
            alert(
                error.response?.data?.detail || "Signup failed."
            );
        } finally {
            setLoading(false);
        }
    };
    return (

        <div className="outersp">
            <div className="Heading">
                True<span>Lens</span> AI
            </div>

            <form className="innersp" onSubmit={handleSubmit}>
                <h2>Create New Account</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Creating Account..." : "Sign Up"}
                </button>

                <div className="signupsp">
                    Already has an account?  {" "}
                    <Link to="/sign_in">  Sign In</Link>
                </div>
            </form>
        </div>

    );
}

export default sign_up