import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import AuthForm from "./components/auth";
import PhotoUpload from "./components/upload";
import PhotoFeed from "./components/feed";
import UserProfile from "./components/profile";
import app from "./config/firebase-config";

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Kiyo Gram
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {user && (
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
          )}
          {user ? (
            <Button color="inherit" onClick={() => auth.signOut()}>
              Sign Out
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/auth">
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "20px" }}>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <>
                  <PhotoUpload user={user} db={db} storage={storage} />
                  <PhotoFeed db={db} user={user} />
                </>
              ) : (
                <AuthForm auth={auth} />
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <UserProfile user={user} db={db} />
              ) : (
                <AuthForm auth={auth} />
              )
            }
          />
          <Route path="/auth" element={<AuthForm auth={auth} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
