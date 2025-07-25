# Quiz Master

An interactive quiz application for creating, managing, and participating in quizzes.

## Live Demo

https://quizz-production-724e.up.railway.app

## Features

- **User Authentication:** Secure user authentication with JWT.
- **Create Quizzes:** Users can create quizzes with multiple-choice questions.
- **Share and Join Quizzes:** Users can share quiz codes with others to join the quiz.
- **Feedback and Ratings:** Users can submit feedback and star ratings for quizzes they have attempted.
- **Review and Leaderboard:** Users can review questions and answers of attempted quizzes and view leaderboard results.
- **View Created Quizzes:** Users can view the questions and answers of the quizzes they have created.

## Technologies Used

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Priyanshur17/Quiz-app.git
   cd Quiz-app
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the `backend` directory and add the following:

     ```plaintext
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

### Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. Start the frontend server:

   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

- **Create a Quiz:** Log in and create a quiz by providing a title, questions, and multiple-choice options.
- **Share Quiz Code:** Share the generated quiz code with others to allow them to join the quiz.
- **Join a Quiz:** Enter the quiz code to join an existing quiz.
- **Submit Feedback:** After completing a quiz, submit feedback and rate the quiz.
- **Review Questions:** Review the questions and answers of attempted quizzes.
- **View Leaderboard:** See the leaderboard results for the quizzes.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.
