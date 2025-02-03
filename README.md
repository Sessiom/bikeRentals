# [Rex's Rentals - Demo Website](rexrentals.onrender.com)

Welcome to **Rex's Rentals**, a demo rental store website built using **React + Vite**. This project showcases a modern frontend for an online rental service with an Express.js backend and an SQLite database.

![Home Page](https://github.com/Sessiom/bikeRentals/blob/main/homePage.PNG?raw=true)

## Demo Admin Access

To explore the admin functionalities, use the following login credentials:

- **Email:** `admin@example.com`
- **Password:** `ilovebikes123`

## Features

- Browse rental items
- User authentication system 
- Admin dashboard for managing rentals

## Tech Stack

- **Frontend:** React + Vite
- **CSS Framework:** Bootstrap
- **Backend:** Express.js
- **Database:** SQLite

## Setup Instructions

1. Clone this repository:
   git clone https://github.com/Sessiom/bikeRentals

2. Install dependencies:
   npm run build in root directory or,
   cd ../frontEnd && npm install && npm run build && cd ../backEnd && npm install

3. Set Environment Variables:
   in ./backEnd create a .env file with two variables,
   PORT=?
   JWT_SECRET=?

4. Run the project:
   npm run dev in ./backEnd or,
   node --watch --env-file=.env ./src/server.js *NOTE you may need to add --experimental-sqlite

