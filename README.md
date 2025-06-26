# Formvive – Predictive Product Feedback Simulator

A full-stack application that simulates Formvive’s predictive feedback flow. Users submit a product feedback form and receive an AI-style, persona-driven response. Built with React, TailwindCSS, Node.js, Express, and OpenAI.

---

## Project Overview

Formvive is a modern web application that enables users to simulate product feedback before building. The app features a two-step form flow: users enter product details, then receive simulated feedback from a randomly selected persona (e.g., enthusiastic user, skeptical reviewer, professional analyst). Feedback is generated using OpenAI or a mock, and all transitions are animated for a smooth UX.

---

## Features

### Form & Feedback Simulation
- Product feedback form with:
  - Product Name
  - Problem Solved
  - Target Audience
- Animated transition between form and feedback screens
- Simulated feedback generated via OpenAI API (or mock)
- Multiple personas: Enthusiastic, Skeptical, Professional
- Responsive, modern UI with TailwindCSS
- Error handling and loading states

### Backend
- Express.js API for feedback generation
- Persona selection logic
- OpenAI integration for realistic feedback
- Feedback and input saved to PostgreSQL via Prisma ORM
- Debug logging for development

---

## Tech Stack

### Frontend:
- React (TypeScript)
- TailwindCSS
- Framer Motion (for animation)
- Axios (API calls)

### Backend:
- Node.js
- Express.js
- TypeScript
- Prisma ORM (PostgreSQL)
- OpenAI API
- Debug for Logging
- dotenv for environment config

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- PostgreSQL database (for backend)

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/form-vive.git
    cd form-vive
    ```

2. **Setup Backend**
    ```bash
    cd server
    npm install
    # Configure your .env file (see below)
    npx prisma migrate deploy
    npm run build
    npm start
    ```

3. **Setup Frontend**
    ```bash
    cd ../client
    npm install
    # Configure your .env file (see below)
    npm start
    ```

---

## Environment Configuration

### Backend Configuration (`server/.env`)
```
PORT=4000
DATABASE_URL=your_postgres_connection_string
OPENAI_API_KEY=your_openai_api_key
DEBUG=*
```

### Frontend Configuration (`client/.env`)
```
REACT_APP_API_URL=http://localhost:4000/api/feedback
```

> **Note:** Both `.env` files are gitignored by default.

---


---

## API Documentation

### Feedback Endpoints

- `POST /api/feedback`
    - **Body:**  
      ```json
      {
        "productName": "Smart Water Bottle",
        "problem": "Forgets to drink enough water during the day",
        "audience": "Busy professionals"
      }
      ```
    - **Response:**  
      ```json
      {
        "response": "AI-generated feedback text...",
        "persona": "enthusiastic"
      }
      ```





---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Testing

The project includes unit tests for both frontend and backend.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## About

Formvive is a one-button product survey service that helps product teams simulate feedback before they build. This project demonstrates a fast, clean, and believable simulation of that experience.
