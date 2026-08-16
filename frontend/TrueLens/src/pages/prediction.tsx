import "./styles/prediction.css";
import { useRef, useState } from "react";
import PredictionCard from "../components/prediction-card";
import { predictImage } from "../services/prediction";

function Prediction() {
    const [hasResult, setHasResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState("");
    const [confidence, setConfidence] = useState(0);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
    const [dragging, setDragging] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File | null) => {
        if (!file) return;

        const validTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];

        if (!validTypes.includes(file.type)) {
            alert("Please upload a JPG, JPEG, PNG or WEBP image.");
            return;
        }

        setSelectedImage(file);
        setPreview(URL.createObjectURL(file));
        setHasResult(false);
        setPrediction("");
        setConfidence(0);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);

        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        setPreview("");
        setHasResult(false);
        setPrediction("");
        setConfidence(0);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleAnalyze = async () => {
        if (!selectedImage) return;

        try {
            setLoading(true);

            const result = await predictImage(selectedImage);

            setPrediction(result.prediction);
            setConfidence(result.confidence);

            setHasResult(true);
        } catch (error) {
            console.error(error);
            alert("Prediction failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleChooseAnother = () => {
        removeImage();

        // Open file picker immediately
        setTimeout(() => {
            fileInputRef.current?.click();
        }, 0);
    };

    return (
        <div className="outer">
            <h2>DeepFake Detection</h2>

            <p>
                Upload an image to analyze whether it is real or AI-generated.
            </p>

            <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleInputChange}
            />

            {!hasResult ? (
                /* =========================
                   UPLOAD STATE
                ========================== */
                <div className="upload-state">

                    <div
                        className={`img-box ${dragging ? "dragging" : ""}`}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(true);
                        }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={handleDrop}
                    >
                        {!preview ? (
                            <>
                                <span className="upload-icon">⬆️</span>

                                <p>Drag & Drop Image</p>

                                <span>or Click to Upload</span>

                                <small>
                                    JPG • JPEG • PNG • WEBP
                                </small>
                            </>
                        ) : (
                            <>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="preview-image"
                                />

                                <button
                                    className="remove-image"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeImage();
                                    }}
                                >
                                    ✕
                                </button>
                            </>
                        )}
                    </div>

                    <div className="buttons">
                        <button
                            className="choose-btn"
                            onClick={() =>
                                fileInputRef.current?.click()
                            }
                        >
                            Choose Image
                        </button>

                        <button
                            className="analyze-btn"
                            disabled={!selectedImage || loading}
                            onClick={handleAnalyze}
                        >
                            {loading ? "Analyzing..." : "Analyze Image"}
                        </button>
                    </div>
                </div>
            ) : (
                /* =========================
                   RESULT STATE
                ========================== */
                <div className="result-state">

                    <PredictionCard
                        image={preview}
                        prediction={prediction}
                        confidence={confidence}
                    />

                    <button
                        className="another-image-btn"
                        onClick={handleChooseAnother}
                    >
                        Choose Another Image
                    </button>

                </div>
            )}
        </div>
    );
}

export default Prediction;