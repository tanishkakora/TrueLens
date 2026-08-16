import "./styles/history.css";
import { useEffect, useState } from "react";
import {
    getHistory,
    deletePrediction,
    clearHistory,
    getImageUrl
} from "../services/history";

interface Prediction {
    id: string;
    image_id: string;
    filename: string;
    prediction: string;
    confidence: number;
    uploaded_at: string;
}

function History() {
    const [history, setHistory] = useState<Prediction[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {
        try {
            const data = await getHistory();
            setHistory(data);
        } catch (error) {
            console.error(error);
            alert("Failed to load history.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm(
            "Delete this prediction?"
        );

        if (!confirmDelete) return;

        try {
            await deletePrediction(id);

            setHistory((prev) =>
                prev.filter((item) => item.id !== id)
            );
        } catch (error) {
            console.error(error);
            alert("Failed to delete prediction.");
        }
    };

    const handleClearHistory = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to clear your entire prediction history?"
        );

        if (!confirmDelete) return;

        try {
            await clearHistory();
            setHistory([]);
        } catch (error) {
            console.error(error);
            alert("Failed to clear history.");
        }
    };

    if (loading) {
        return (
            <div className="history-page">
                <div className="history-header">
                    <h1>Prediction History</h1>
                </div>

                <p className="empty">Loading...</p>
            </div>
        );
    }

    return (
        <div className="history-page">

            <div className="history-header">
                <h1>Prediction History</h1>

                {history.length > 0 && (
                    <button
                        className="clear-history-btn"
                        onClick={handleClearHistory}
                    >
                        Clear History
                    </button>
                )}
            </div>

            {history.length === 0 ? (
                <p className="empty">
                    No prediction history found.
                </p>
            ) : (
                <div className="history-container">
                    {history.map((item) => (
                        <div
                            className="history-card"
                            key={item.id}
                        >
                            <div className="history-image">
                                <img
                                    src={getImageUrl(item.image_id)}
                                    alt={item.filename}
                                />
                            </div>

                            <div className="history-top">
                                <h3 title={item.filename}>
                                    {item.filename}
                                </h3>

                                <span
                                    className={
                                        item.prediction.toLowerCase() === "real"
                                            ? "real"
                                            : "fake"
                                    }
                                >
                                    {item.prediction}
                                </span>
                            </div>

                            <p>
                                <strong>Confidence:</strong>{" "}
                                {item.confidence.toFixed(2)}%
                            </p>

                            <p>
                                <strong>Uploaded:</strong>{" "}
                                {new Date(
                                    item.uploaded_at
                                ).toLocaleString()}
                            </p>

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    handleDelete(item.id)
                                }
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default History;