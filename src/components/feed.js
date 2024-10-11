import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import {
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";

function PhotoFeed({ db, user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [activeCommentPost, setActiveCommentPost] = useState(null);

  useEffect(() => {
    const fetchPosts = () => {
      const postsQuery = query(
        collection(db, "posts"),
        orderBy("timestamp", "desc"),
        limit(10)
      );

      const unsubscribe = onSnapshot(
        postsQuery,
        (snapshot) => {
          const fetchedPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            likes: doc.data().likes || [],
            comments: doc.data().comments || [],
          }));
          setPosts(fetchedPosts);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching posts: ", error);
          setLoading(false);
        }
      );

      return unsubscribe;
    };

    const unsubscribe = fetchPosts();
    return () => unsubscribe();
  }, [db]);

  const handleLike = async (postId) => {
    const postRef = doc(db, "posts", postId);
    const post = posts.find((p) => p.id === postId);
    if (post.likes.includes(user.uid)) {
      await updateDoc(postRef, {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(user.uid),
      });
    }
  };

  const handleComment = async (postId) => {
    if (commentText.trim() === "") return;

    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      comments: arrayUnion({
        userId: user.uid,
        text: commentText,
        timestamp: serverTimestamp(),
      }),
    });

    setCommentText("");
    setActiveCommentPost(null);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={post.imageUrl}
              alt={post.caption}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.caption}
              </Typography>
              <IconButton onClick={() => handleLike(post.id)}>
                {post.likes.includes(user.uid) ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {post.likes.length} likes
              </Typography>
              <IconButton onClick={() => setActiveCommentPost(post.id)}>
                <CommentIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {post.comments.length} comments
              </Typography>
              {post.comments.slice(0, 2).map((comment, index) => (
                <Typography key={index} variant="body2" color="text.secondary">
                  {comment.text}
                </Typography>
              ))}
              {activeCommentPost === post.id && (
                <div>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                  />
                  <Button onClick={() => handleComment(post.id)}>Post</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default PhotoFeed;
