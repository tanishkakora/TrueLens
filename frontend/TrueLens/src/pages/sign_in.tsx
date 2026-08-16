import "./styles/sign_in.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function SignIn() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await api.post("/signin", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("username", response.data.username);

            navigate("/dashboard");
        } catch (error: any) {
            alert(
                error.response?.data?.detail || "Login failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="outersi">
            <div className="Heading">
                True<span>Lens</span> AI
            </div>

            <form className="innersi" onSubmit={handleSubmit}>
                <h2>SignIn to Your Account</h2>

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

                <button type="submit" disabled={loading}>
                    {loading ? "Signing In..." : "Sign In"}
                </button>

                <div className="signupsi">
                    Don't have an account?  {" "}
                    <Link to="/sign_up">  Sign Up</Link>
                </div>
            </form>
        </div>
    );
}

export default SignIn;