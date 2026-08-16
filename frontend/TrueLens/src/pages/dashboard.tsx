import "./styles/dashboard.css"
import socialMedia from "./assets/socialmedia.png";
import banking from "./assets/banking.png";
import news from "./assets/news.png";
import { Link } from "react-router-dom";
function dashboard() {
    return (
        <>
            <div className="detection">
                <h1>AI Powered DeepFake Detection</h1>
                <p>Upload an image to determine whether it is authentic or AI-generated using our CNN-based detection model.</p>
                <div className="hero-buttons">
                    <Link to="/prediction" className="predict-btn">
                        Predict
                    </Link>

                    <Link to="/about" className="learn-btn">
                        Learn More
                    </Link>
                </div>
            </div>
            <div className="stats">
                <h3>Global Deepfake Threat Overview</h3>
                <p>Explore key statistics highlighting the growing impact of AI-generated fraud and misinformation.</p>
                <div className="cards">
                <div className="stat-card">
                    <img src={socialMedia} alt="Social Media Deepfakes" />
                    <h4>Social Media Deepfakes</h4>
                    <p className="info">
                        <span className="number">1.2M+</span>
                        <span className="text">
                            Suspected deepfake posts reported annually.
                        </span>
                    </p>
                </div>

                <div className="stat-card">
                    <img src={banking} alt="banking" />
                    <h4>Banking Fraud</h4>
                    <p className="info">
                        <span className="number">$12.5B+</span>
                        <span className="text">
                            Estimated global losses linked to AI-enabled fraud annually.
                        </span>
                    </p>
                </div>

                <div className="stat-card">
                    <img src={news} alt="news" />
                    <h4>Deepfake Headlines</h4>
                    <p className="info">
                        <span className="number">62%</span>
                        <span className="text">
                            People worldwide are concerned about fake news online, with worries rising alongside AI-generated content
                        </span>
                    </p>
                </div>
            </div>
            </div>
        </>

    );
}

export default dashboard