import "./styles/prediction-card.css";

interface PredictionCardProps {
    image: string;
    prediction: string;
    confidence: number;
}

function PredictionCard({
    image,
    prediction,
    confidence,
}: PredictionCardProps) {

    const isReal = prediction.toLowerCase() === "real";

    return (
        <div className="result">
            <h3>Analysis Result</h3>

            <div className="upimg">
                <img src={image} alt="Uploaded Preview" />
            </div>

            <div className={`prediction-badge ${isReal ? "real" : "fake"}`}>
                {isReal ? "REAL IMAGE" : "AI GENERATED"}
            </div>

            <div className="result-row">
                <span>Prediction</span>
                <span className="value">{prediction}</span>
            </div>

            <div className="confidence-section">
                <div className="confidence-header">
                    <span>Confidence Score</span>
                    <span>{confidence.toFixed(2)}%</span>
                </div>

                <div className="progress-bar">
                    <div
                        className={`progress ${isReal ? "real" : "fake"}`}
                        style={{ width: `${confidence}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default PredictionCard;