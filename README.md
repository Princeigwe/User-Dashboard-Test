# RESTful API with User Authentication

This repository contains a RESTful API that facilitates user registration, login, and access to protected endpoint. Built with Node.js and MongoDB.

## Table of Contents
- [Requirements](#requirements)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
  - [Protected Endpoint](#protected-endpoint)


## Requirements
- **User Registration:** Users can register using a unique email, username and password.
- **User Login:** Registered users can log in using their credentials. The API provides an authentication token upon successful login.
- **Authentication Middleware:** Authentication strategy and guard verifies authentication tokens for protected dashboard endpoint.
- **Protected Route:** The "/dashboard" endpoint is protected by a JwtGuard before request is received.
- **Database:** MongoDB to store user information.

## Tech Stack
- Node.js
- TypeScript
- MongoDB

## Getting Started
### Installation
1. Clone this repository: `git clone https://github.com/Princeigwe/User-Dashboard-Test.git`
2. Navigate to the project directory: `cd user-dashboard-test`
3. Install dependencies: `npm install`

### Usage
1. Configure MongoDB connection URI and JWT secret: `MONGO_URI` `JWT_SECRET` in an `.env` file.
2. Start the server: `npm start:dev`
3. Access the API at `http://localhost:3000/api/v1`

## API Endpoints
### User Registration
- **Endpoint:** `POST /api/v1/auth/register`
- **Request Body:**
  ```json
  {
    "email"   : "your_email",
    "username": "your_username",
    "password": "your_password"
  }

### User Login
- **Endpoint:** `POST /api/v1/auth/login`
- **Request Body:**
  ```json
  {
    "email"   : "your_email",
    "password": "your_password"
  }

### Protected Endpoint
- **Endpoint:** `GET /api/v1/dashboard  -H Authorization: Bearer jwt-token` 
- **Response:**
  ```json
  {
    "message": "Welcome to your dashboard {username}"
  }
