# Kiyo Gram

Kiyo Gram is a photo-sharing web application built with React and Firebase. It allows users to upload photos, like and comment on posts, and manage their profiles.

## Features

- User authentication (sign up, sign in, sign out)
- Photo upload with captions
- News feed displaying recent photos
- Like and unlike posts
- Comment on posts
- User profiles

## Technologies Used

- React.js
- Firebase (Authentication, Firestore, Storage)
- Material-UI for styling

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of Node.js and npm
- You have a Firebase account and a new Firebase project set up

## Setting Up Kiyo Gram

To set up Kiyo Gram, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/kiyo-gram.git
   ```

2. Navigate to the project directory:
   ```
   cd kiyo-gram
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

5. Start the development server:
   ```
   npm start
   ```

6. Open your browser and visit `http://localhost:3000`

## Firebase Setup

1. Create a new project in the [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication in the Authentication section
3. Create a Firestore database in test mode
4. Set up Firebase Storage

## Contributing to Kiyo Gram

To contribute to Kiyo Gram, follow these steps:

1. Fork this repository
2. Create a branch: `git checkout -b <branch_name>`
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request

Alternatively, see the GitHub documentation on [creating a pull request](https://help.github.com/articles/creating-a-pull-request/).

## Contact

If you want to contact me, you can reach me at `torndotcom1@gmail.com`.

## License

This project uses the following license: [MIT License](https://opensource.org/licenses/MIT).
