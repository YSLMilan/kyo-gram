import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button, TextField, CircularProgress } from "@mui/material";

function PhotoUpload({ user, db, storage }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (image) {
      setUploading(true);
      try {
        console.log("Starting upload process...");

        const storageRef = ref(storage, `images/${Date.now()}_${image.name}`);
        console.log("Uploading image to Storage...");
        await uploadBytes(storageRef, image);
        console.log("Image uploaded successfully. Getting download URL...");
        const downloadURL = await getDownloadURL(storageRef);
        console.log("Download URL obtained:", downloadURL);

        console.log("Adding post to Firestore...");
        const docRef = await addDoc(collection(db, "posts"), {
          imageUrl: downloadURL,
          caption: caption,
          userId: user.uid,
          timestamp: serverTimestamp(),
          likes: 0,
        });
        console.log("Post added to Firestore with ID:", docRef.id);

        setImage(null);
        setCaption("");
        alert("Photo uploaded successfully!");
      } catch (error) {
        console.error("Error uploading photo: ", error);
        alert(`Failed to upload photo. Error: ${error.message}`);
      } finally {
        setUploading(false);
      }
    } else {
      alert("Please select an image to upload.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      <TextField
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Enter a caption"
        fullWidth
        margin="normal"
      />
      <Button
        onClick={handleUpload}
        variant="contained"
        color="primary"
        disabled={uploading || !image}
      >
        {uploading ? <CircularProgress size={24} /> : "Upload"}
      </Button>
    </div>
  );
}

export default PhotoUpload;
