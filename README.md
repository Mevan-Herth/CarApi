# Car API

A simple RESTful API built using Express.js for managing a collection of cars. The API allows you to create, read, update, and delete car records. The data is stored in a `cars.json` file on the server.

## Setup

### Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository to your local machine from master.
2. Navigate to the project directory in your terminal.
3. Install dependencies:

    ```terminal
    npm install
    ```

4. Start the server:

    ```terminal
    npm start
    ```

    The server will run on `http://localhost:3000`.

## API Endpoints

### 1. Get all cars

**GET** `/cars`

- Returns a list of all cars in the collection.

**Example response:**
```json
[
  {
    "id": 1,
    "make": "Toyota",
    "model": "Camry",
    "year": 2015
  },
  {
    "id": 2,
    "make": "Honda",
    "model": "Civic",
    "year": 2018
  }
]
