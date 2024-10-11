import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";

function UserProfile({ db, user }) {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
        setDisplayName(docSnap.data().displayName || "Anonymous");
        setBio(docSnap.data().bio || "");
      } else {
        const newProfile = {
          displayName: user.displayName || "Anonymous",
          email: user.email,
          bio: "",
        };
        await setDoc(docRef, newProfile);
        setProfile(newProfile);
        setDisplayName(newProfile.displayName);
      }
    };
    fetchProfile();
  }, [db, user]);

  const handleUpdateProfile = async () => {
    const docRef = doc(db, "users", user.uid);
    try {
      const updatedProfile = { displayName, bio };
      await setDoc(docRef, updatedProfile, { merge: true });
      setProfile((prevProfile) => ({ ...prevProfile, ...updatedProfile }));
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      {editing ? (
        <>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display Name"
          />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
          />
          <button onClick={handleUpdateProfile}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{profile.displayName}</h2>
          <p>{profile.email}</p>
          <p>{profile.bio}</p>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </>
      )}
    </div>
  );
}

export default UserProfile;
