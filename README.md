# MT1-LABEXAM

# Shopping Cart Management Web Application

## Project Overview
This project is a Shopping Cart Management Web Application developed using Node.js and Express.js. It demonstrates HTTP server creation, routing, handling HTTP methods, serving static HTML files and implementing REST APIs.

## Technologies Used
- Node.js
- JavaScript (ES6)
- Express.js
- HTTP Module
- FS Module
- HTML
- Git & GitHub

## Project Structure

```text
MT1-LABEXAM/
│
├── public/
│   └── index.html
│
├── screenshots/
│
├── httpServer.js
├── expressApp.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

## Features

### Part A: HTTP Module
- Created an HTTP server using Node.js.
- Implemented routing for Home, Cart and About pages.
- Implemented GET and POST requests.
- Served static HTML files using the FS module.
- Added error handling for invalid routes and requests.

### Part B: Express.js REST API
Implemented CRUD operations:

| Method | Endpoint | Function |
|---|---|---|
| GET | /cart | Get all cart items |
| GET | /cart/:id | Get product by ID |
| POST | /cart | Add a new product |
| PUT | /cart/:id | Update product details |
| DELETE | /cart/:id | Delete a product |

- Used an array of objects to store shopping cart data.
- Implemented JSON middleware.
- Added product validation and error handling.
- Calculated total price using price × quantity.

## Installation and Setup

1. Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

2. Navigate to the project folder:

```bash
cd MT1-LABEXAM
```

3. Install dependencies:

```bash
npm install
```

## Running the Application

### Start HTTP Server (Port 3000)

```bash
node httpServer.js
```

### Start Express Server (Port 4000)

Open another terminal and run:

```bash
node expressApp.js
```

## API Testing

All Express.js REST API endpoints were tested using EchoAPI in VS Code.

## Screenshots

Screenshots of server execution, API responses and application testing are available in the `screenshots` folder.

## Database

No database is used. Shopping cart records are maintained using JavaScript arrays.

## Author

**Abhay Pratap Singh**

B.Tech – Computer Science and Engineering

ABES Engineering College

## Project

MT1 Lab Examination – Full Stack Development