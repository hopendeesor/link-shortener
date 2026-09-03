# Link Shortener

This is a lightweight web service designed to compress long URLs into short, shareable links. The project uses a modular design to keep latency low, ensure proper data isolation, and make future scaling easier.

## Key Features

* Fast URL shortening: Turns long, messy tracking links into short alphanumeric slugs.
* Base62 encoding: Uses a reliable encoding algorithm to generate unique IDs and avoid hash collisions.
* Quick redirection: Uses standard HTTP 301 and 302 redirects to forward users with minimal delay.
* Input validation: Checks and cleans URLs when they are submitted to protect the system from broken or malicious strings.
* Reliable storage: Uses a relational database mapping system to safely store the links.

## Tech Stack

* Core Runtime: Node.js with Express, Python, or Java (Change this to match your project's language)
* Database: SQLite, PostgreSQL, or MongoDB (Change this to match your database)
* Testing Suite: Jest, PyTest, or Mocha

## Getting Started

### Prerequisites

Make sure you have your runtime environment and a package manager installed on your machine:
* Runtime engine: Node.js (version 18 or higher) or Python (version 3.10 or higher)
* Package tools: npm or pip

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com
   cd link-shortener
   ```

2. Install the dependencies:
   ```bash
   npm install   # Use 'pip install -r requirements.txt' if you are using Python
   ```

3. Set up your environment variables:
   Create a .env file in the root folder of the project and add your configurations:
   ```env
   PORT=8080
   DATABASE_URL=your_database_connection_string
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm start     # Use 'python main.py' if you are using Python
   ```
   The server will start running locally at http://localhost:8080.

## API Architecture

### 1. Shorten a Link
* Endpoint: POST /api/shorten
* Request Body:
  ```json
  {
    "longUrl": "https://example.com"
  }
  ```
* Success Response (201 Created):
  ```json
  {
    "id": "aB3cD9",
    "shortUrl": "http://localhost:8080/aB3cD9",
    "longUrl": "https://example.com"
  }
  ```

### 2. Redirect a Link
* Endpoint: GET /:slug
* Success Action (302 Redirect): Automatically routes incoming traffic to the original destination URL.

## Testing

You can run the automated tests to verify that the application and its algorithms work correctly:
```bash
npm test        # Use 'pytest' if you are using Python
```

## System Design Notes

* Unique ID Generation: The system maps an internal auto-incrementing database ID to a Base62 string containing characters from a-z, A-Z, and 0-9. This keeps the shortened URLs short and unique.
* Performance: By creating an index on the slug column in the database, looking up a link takes O(1) constant time, which keeps the application highly efficient.

## Limitations and Trade-offs

* Single-server bottlenecks: The current setup runs on a single server instance, which creates a single point of failure and limits total traffic capacity.
* Memory constraints: The application hits the database for every single redirect request, which will slow down response times under heavy user loads.
* Basic security: The system lacks rate limiting, making it vulnerable to brute-force automated scripts or denial-of-service attacks.
* Analytics gaps: The service only redirects users and does not track click counts, user locations, or browser metrics.
* Fixed short codes: Users cannot choose their own custom text or expiration dates for the shortened URLs.
