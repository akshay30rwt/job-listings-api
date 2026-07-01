# Job Listings API

A REST API to manage job listings built with Node.js, Express.js and MongoDB following MVC architecture.

## Features
- Full CRUD for job listings
- Filter jobs by location
- Sort jobs by salary
- Search jobs by title

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

## How to Run
- npm install
- npm run dev

## API Endpoints
- POST   /jobs                  - Create a job listing
- GET    /jobs                  - Get all job listings
- GET    /jobs/:id              - Get a job by ID
- PUT    /jobs/:id              - Update a job
- DELETE /jobs/:id              - Delete a job
- GET    /jobs?title=           - Search by title
- GET    /jobs/filter/:location - Filter by location
- GET    /jobs/sorted/salary    - Sort by salary