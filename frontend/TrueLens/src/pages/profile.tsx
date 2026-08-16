import "./styles/profile.css";
import { useEffect, useState } from "react";
import { getProfile } from "../services/profile";

function Profile() {
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {

        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                console.log("Profile:", data);
                setProfile(data);
            } catch (error) {
                console.error("Profile Error:", error);
            }
        };

        fetchProfile();

    }, []);
    if (!profile) {
        return <h2>Loading...</h2>;
    }
    return (
        <div className="profile-page">

            <div className="profile-card">

                <div className="profile-header">
                    <img
                        src={`https://ui-avatars.com/api/?name=${profile.username}&background=ef4444&color=fff&size=200`}
                        alt="Profile"
                        className="profile-image"
                    />

                    <h2>{profile.username}</h2>
                    <p>{profile.email}</p>
                </div>

                <div className="profile-details">

                    <div className="profile-item">
                        <span>Username</span>
                        <h4>{profile.username}</h4>
                    </div>

                    <div className="profile-item">
                        <span>Total Predictions</span>
                        <h4>{profile.total_predictions}</h4>
                    </div>

                    <div className="profile-item">
                        <span>Fake Images Detected</span>
                        <h4>{profile.total_predictions - profile.real_predictions}</h4>
                    </div>

                    <div className="profile-item">
                        <span>Real Images Detected</span>
                        <h4>{profile.real_predictions}</h4>
                    </div>
                </div>

                

            </div>

        </div>
    );
}

export default Profile;