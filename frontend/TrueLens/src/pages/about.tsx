import "./styles/about.css";

function About() {
    return (
        <div className="about-page">

            {/* Hero */}
            <section className="hero">
                <h1>About TrueLens AI</h1>
                <p>
                    Detecting AI-generated images with deep learning,
                    helping users identify manipulated media with confidence.
                </p>
            </section>

            {/* Mission */}
            <section className="mission">
                <h2>🎯 Our Mission</h2>

                <p>
                    As AI-generated content becomes increasingly realistic,
                    TrueLens AI aims to provide a fast and reliable way to
                    distinguish authentic images from manipulated ones.
                </p>

                <p>
                    Our goal is to combat misinformation, identity fraud,
                    and digital deception through accessible AI-powered
                    image analysis.
                </p>
            </section>

            {/* How It Works */}
            <section className="working">
                <h2>How It Works</h2>

                <div className="steps">

                    <div className="step">
                        <div className="icon">📤</div>
                        <h3>Upload Image</h3>
                        <p>Upload a facial image for analysis.</p>
                    </div>

                    <div className="arrow">→</div>

                    <div className="step">
                        <div className="icon">🧠</div>
                        <h3>CNN Analysis</h3>
                        <p>The deep learning model extracts visual features.</p>
                    </div>

                    <div className="arrow">→</div>

                    <div className="step">
                        <div className="icon">🔍</div>
                        <h3>Feature Extraction</h3>
                        <p>AI identifies artifacts associated with deepfakes.</p>
                    </div>

                    <div className="arrow">→</div>

                    <div className="step">
                        <div className="icon">✅</div>
                        <h3>Prediction</h3>
                        <p>Receive the final prediction with confidence.</p>
                    </div>

                </div>
            </section>

            {/* Features */}
            <section className="features">
                <h2>Key Features</h2>

                <div className="feature-grid">
                    <div className="feature-card">⚡ Fast Prediction</div>
                    <div className="feature-card">🎯 High Accuracy</div>
                    <div className="feature-card">🖥 User-Friendly Interface</div>
                    <div className="feature-card">📜 Prediction History</div>
                    <div className="feature-card">🔒 Secure Image Processing</div>
                    <div className="feature-card">📊 Modern Dashboard</div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="techstack">
                <h2>Technology Stack</h2>

                <div className="stack-grid">

                    <div className="stack-card">
                        <h3>Frontend</h3>
                        <p>React</p>
                        <p>TypeScript</p>
                        <p>CSS</p>
                    </div>

                    <div className="stack-card">
                        <h3>Backend</h3>
                        <p>FastAPI</p>
                    </div>

                    <div className="stack-card">
                        <h3>Database</h3>
                        <p>MongoDB</p>
                    </div>

                    <div className="stack-card">
                        <h3>Machine Learning</h3>
                        <p>TensorFlow</p>
                        <p>Keras</p>
                        <p>CNN</p>
                    </div>

                    <div className="stack-card">
                        <h3>Deployment</h3>
                        <p>Vercel</p>
                        <p>Render</p>
                    </div>

                </div>
            </section>

            {/* Why */}
            <section className="why">
                <h2>Why Deepfake Detection?</h2>

                <p>
                    Deepfake technology has transformed digital media,
                    making it increasingly difficult to distinguish
                    between real and AI-generated content.
                </p>

                <p>
                    TrueLens AI provides an accessible tool that helps
                    users detect manipulated images and encourages
                    responsible use of artificial intelligence.
                </p>
            </section>

            {/* Developer */}
            

        </div>
    );
}

export default About;