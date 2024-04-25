# Assignment "A RESTful HTTP API"

## Overview
This assignment involves creating a web service that provides access to a product inventory database via a RESTful HTTP API. This service will run locally (e.g., on `http://localhost:3000/`) and will manage product data stored in a local database.

## Objectives
### Functionality
- **Retrieve Full Dataset**: Allows fetching all data from the product inventory database.
- **CRUD Operations**: Implements minimal CRUD functionalities for individual records, including:
  - **Create**: Add new product data.
  - **Retrieve**: Fetch data for a specific item.
  - **Update**: Modify data for a specific item.
  - **Delete**: Remove data for a specific item.

### RESTful Requirements
- Uses appropriate HTTP 1.1 methods for each function.
- Ensures that HTTP GET methods are safe and, except for POST, all methods are idempotent.
- Responds with JSON format, accepting JSON input for data creation or updates.
- Utilizes appropriate HTTP headers and response codes, including errors.

## Documentation
- Publish API documentation in a single HTML5 file focusing on the use of the API by front-end developers.
- Exclude installation or backend implementation details.
- Document CRUD functionalities and define key REST elements for each function:
  - **Endpoint URI**
  - **HTTP Methods**
  - **HTTP Response Codes**
  - **MIME Format**

Include concrete examples of both input and output for each service.

## Implementation
- Develop using the Node.js framework, utilizing SQLite for database interactions.
- Follow the guidelines and examples provided in zyBook sections 9.1, 9.2, and 9.3.
- Ensure your web service adheres to "npm install, npm start" conventions with a proper `package.json` file.

## Submission Details
- Ensure the service runs on any computer with recent versions of Node.js and npm.
- Include all necessary dependencies in `package.json`.
- All server code should be in a file named `server.js`, and the service should be startable with "npm start".

**Note**: Begin with a draft of your API documentation and seek feedback from your TA before implementation to avoid discrepancies.
