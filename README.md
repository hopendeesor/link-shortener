# Link Shortener

A lightweight URL shortening API built with Node.js and Express.

The service accepts a long URL, generates a short code, and stores the mapping in memory. The generated code can then be used to retrieve the original URL.

The project also includes automated tests, linting, Docker support, and a GitHub Actions CI/CD workflow.

## Features

* Create shortened links
* Retrieve URLs using a short code
* JSON API
* Input validation for required URLs
* Automated tests with Jest and Supertest
* ESLint code quality checks
* Docker containerization
* GitHub Actions CI/CD pipeline
* Separate staging and production deployment hooks

## Tech Stack

* Node.js 20
* Express 5
* Jest
* Supertest
* ESLint
* Docker
* GitHub Actions

## Project Structure

```text
link-shortener/
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   ├── app.js
│   ├── app.test.js
│   └── server.js
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

## API Endpoints

### Create a Short Link

**POST** `/links`

Request:

```json
{
  "url": "https://example.com"
}
```

Successful response:

```json
{
  "code": "link1",
  "url": "https://example.com"
}
```

The API returns HTTP `201 Created` when the link is successfully created.

If the URL is not provided, the API returns:

```json
{
  "error": "URL is required"
}
```

with HTTP `400 Bad Request`.

### Retrieve a Link

**GET** `/links/:code`

Example:

```text
GET /links/link1
```

Successful response:

```json
{
  "url": "https://example.com"
}
```

If the short code does not exist, the API returns:

```json
{
  "error": "Link not found"
}
```

with HTTP `404 Not Found`.

## Getting Started

### Prerequisites

You need:

* Node.js 20 or later
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/hopendeesor/link-shortener.git
```

Move into the project directory:

```bash
cd link-shortener
```

Install dependencies:

```bash
npm ci
```

### Start the Application

Start the server with:

```bash
node src/server.js
```

The application listens on port `3000` by default.

You can use a different port by setting the `PORT` environment variable:

```bash
PORT=8080 node src/server.js
```

## Testing

The project uses Jest and Supertest for automated API testing.

Run the test suite:

```bash
npm test
```

The current tests cover:

* Creating a shortened link
* Rejecting requests without a URL
* Returning `404` for an unknown short code

## Code Quality

ESLint is used to check the codebase for linting issues.

Run:

```bash
npm run lint
```

## Docker

The application can be packaged and run as a Docker container.

Build the image:

```bash
docker build -t link-shortener .
```

Run the container:

```bash
docker run -p 3000:3000 link-shortener
```

The application will then be available on port `3000`.

The Docker image uses Node.js 20 Alpine as its base image and installs production dependencies before copying the application source code.

## CI/CD

The repository uses GitHub Actions for continuous integration.

The workflow runs when changes are pushed to the `main` branch or when a version tag matching `v*` is pushed.

The CI pipeline:

1. Checks out the repository.
2. Sets up Node.js 20.
3. Installs dependencies with `npm ci`.
4. Runs ESLint.
5. Runs the automated test suite.

Deployment jobs run only after the tests pass.

### Staging Deployment

Pushes to the main branch trigger the staging deployment hook after successful tests.

### Production Deployment

Version tags trigger the production deployment hook after successful tests.

Deployment hooks are stored as GitHub Actions secrets rather than being hard-coded in the repository.

## Application Flow

```text
Client
  |
  | POST /links
  | { "url": "https://example.com" }
  v
Express API
  |
  | Generate short code
  v
In-memory link store
  |
  | Return code
  v
Client
  |
  | GET /links/link1
  v
Express API
  |
  | Look up short code
  v
Original URL
```

## Current Storage Model

The current implementation stores links in memory while the application is running.

This makes the project simple and lightweight, but data is lost whenever the application restarts.

The current implementation is therefore best suited for learning, demonstration, and development rather than production workloads requiring persistent storage.

## Limitations

The current implementation has several limitations:

* Links are stored only in memory.
* Restarting the application removes all stored links.
* Short codes are generated sequentially.
* There is no persistent database.
* There is no authentication or authorization.
* There is no rate limiting.
* URLs are only checked for presence; comprehensive URL validation is not implemented.
* There are no analytics or click tracking features.
* The API returns the original URL rather than performing an HTTP redirect.

## Future Improvements

Possible improvements include:

* Add persistent storage with PostgreSQL
* Add structured application logging
* Add monitoring and alerting
* Deploy to a cloud platform
* Add infrastructure as code
* Add separate development, staging, and production environments

