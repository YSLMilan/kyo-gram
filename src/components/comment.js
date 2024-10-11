import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function CommentForm({ db, user, postId }) {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;

    await addDoc(collection(db, "posts", postId, "comments"), {
      text: comment,
      userId: user.uid,
      timestamp: serverTimestamp(),
    });

    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default CommentForm;
