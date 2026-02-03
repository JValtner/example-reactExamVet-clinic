import React, { useEffect, useState } from "react";
import { useUser } from "../../context/contextUser";
import { getCurrentProfile } from "../../service/authService";

const Profile = () => {
  const { user, setUser, token } = useUser();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user && token) {
        setLoading(true);
        try {
          const data = await getCurrentProfile();
          setProfile(data);
          setUser(data); // sync context
        } catch (err) {
          console.error("Failed to load profile:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [user, token, setUser]);

  if (loading) return <div className="profile-loading">Loading profile...</div>;
  if (!profile) return <div className="profile-empty">No profile data available.</div>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <div className="profile-row">
          <span className="profile-label">Username:</span>
          <span className="profile-value">{profile.username}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Name:</span>
          <span className="profile-value">{profile.name}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Surname:</span>
          <span className="profile-value">{profile.surname}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Role:</span>
          <span className="profile-value">{profile.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
