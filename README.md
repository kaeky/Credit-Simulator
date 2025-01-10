# NestJS Microservices Starter Project

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

This repository contains a application for simulate credits built using the [NestJS](https://github.com/nestjs/nest)
framework:

## Authentication
This project uses Don't use authentication, but you can implement it with features such as: 
- JWT (JSON Web Tokens) for secure API authentication.
- OAuth 2.0 for integrating third-party login services (Google, Facebook, etc.).
## Documentation
 ### Sequence Diagram
  ```bash
  Usuario             |API Gateway (GraphQL)| Servicios                    | Base de Datos
--------------------|---------------------|------------------------------|----------------------
   |                  |                     |                              |
   | Peticiones       |                     |                              |
   |----------------->|                     |                              |
   |                  |Solicitudes          |                              |
   |                  |-------------------->|                              |
   |                  |                     | Consultar                    |
   |                  |                     |----------------------------> |
   |                  |                     | Datos del cliente            |
   |                  |                     |<---------------------------- |
   |                  | Procesar solicitud  |                              |
   |                  |<--------------------|                              |
   | Respuesta        |                     |                              |
   |<-----------------|                     |                              |
  ```
## Data flow diagram
<p align="center">
  <a href="https://imgur.com/P8RL5aw" target="blank"><img src="https://i.imgur.com/P8RL5aw.png" alt="Data flow diagram"/></a>
</p>

## Architecture Diagram
  ### Not implemented yet
<p align="center">
  <a href="https://i.imgur.com/1PS95ub.png" target="blank"><img src="https://i.imgur.com/1PS95ub.png" alt="Data flow diagram"/></a>
</p>

## Component and Modules
  ### 1. Clients Module
  **Description**: Manages client data within the system.  
  **Functionality**:
  - Allows for adding, updating, and retrieving client information.
  - Provides a CRUD interface (except delete) for managing client records.
  
  ### 2. Credits Module
  **Description**: Handles the configuration of credit-related data, such as interest rates and loan ranges.  
  **Functionality**:
  - Allows editing and managing interest rates.
  - Manages loan ranges for different types of credit.
  
  ### 3. Offers Module
  **Description**: Manages the creation and management of credit offers for clients.  
  **Functionality**:
  - Creates credit offers based on client data and credit parameters.
  - Links clients to specific credit offers.
  
  ### 4. Simulator Module
  **Description**: Simulates credit scenarios based on client input and available credit parameters.  
  **Functionality**:
  - Simulates different credit scenarios (loan amount, interest rate, term) based on the client's financial capacity.
  - Calculates the most suitable loan and interest rate for a client.
  
  ### 5. Insurances Module
  **Description**: Manages insurance-related data, specifically insurance rates based on the client's age.  
  **Functionality**:
  - Allows management of insurance rates for different age groups.
  - Retrieves applicable insurance rates based on the client's age.
  
  ### 6. Test Module
  **Description**: Contains unit tests for ensuring the correct functionality of all other modules.  
  **Functionality**:
  - Runs unit tests for individual components.
  - Verifies the correctness of business logic and processes.
  
## Opportunities for Improvement
- ### More Validations
  - **Data Redundancy Prevention**:
    - Implement validations to ensure that redundant or duplicate data is not inserted into the system. This could include:
    - Checking for duplicate entries when creating or updating records.
    - Enforcing uniqueness constraints at the database level for critical fields (e.g., email, username).
    - Use GraphQL resolvers and services to validate incoming data before saving it to the database.
  - **Error Handling**:
    - Improve error handling by providing meaningful error messages without exposing sensitive information (e.g., stack traces or internal implementation details).
    - Ensure that all potential validation errors are properly captured and returned to the client in a structured manner.
- ### Authentication
    - **Endpoints Security**: 
      - Ensure that all sensitive API endpoints are secured using authentication mechanisms such as JWT or OAuth 2.0 to prevent unauthorized access.
      - Implement role-based access control (RBAC) to limit access to specific resources based on user roles.
      - Consider enabling two-factor authentication (2FA) for users accessing critical operations or sensitive data.

    - **Password Management**:
      - Enforce strong password policies for user accounts, including minimum length, complexity, and expiration periods.
      - Use secure password hashing algorithms (e.g., bcrypt, Argon2) for storing passwords in the database.

    - **Session Management**:
      - Implement secure session handling, including setting proper session expiration times and using secure cookies for session storage.
      - Use token revocation mechanisms to invalidate sessions when necessary (e.g., when a user logs out or changes their password).

    - **Audit Logging**:
      - Implement audit logging to track authentication-related events, such as login attempts, password changes, and role modifications. This will help in identifying potential security breaches and responding to incidents more effectively.

## Database Setup

### Step 1: Create a PostgreSQL Database with Docker

Run the following command to set up a PostgreSQL database instance using Docker:

```bash
docker run -d --restart always \
  --name <CustomNameContainer> \
  -e POSTGRES_PASSWORD=<CustomPsword> \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  -v /c/Postgresql/volumes/cajasocial/data:/var/lib/postgresql/data/ \
  -p 5433:5432 postgres
```
### Step 2: Connect to the PostgreSQL Database
Once the Docker container is running, connect to the PostgreSQL instance using a client such as psql or a database management tool. Create a database named cajasocial or any other preferred name:
```bash
CREATE DATABASE cajasocial;
```

### Step 3: Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/kaeky/Credit-Simulator
```
#### The repository contains each module with its own services and test files

### Step 4: Environment Variables
create a .env file and add the following environment variables like the .env.example file and database created in step 1.
### Step 5: Running the Project
  - In the root folder open a terminal and run the following commands:
```bash
# Install dependencies
npm install

# Run migrations
npm run migration:run

# Run in development mode
npm run start:dev

# Run in production mode
npm run start:prod
```
### Step 6: Test the Project
  - go to https://www.postman.com/kaeky/workspace/credit-simulator and import the collection in postman
  - run each request to test the project
### Step 7: Tests
    - In the root folder open a terminal and run the following commands:
```bash
# unit tests
$ npm run test
# coverage
$ npm run test:cov  
```

## If you want to deploy the project in a docker container, you can use the following commands:
```bash
# Create a network
$ docker network create my-network
# Assign the network to the database container
$ docker network connect my-network <CustomNameContainer>
# Modify the .env file to use the database container name as the host
# Build the image with the local.DockerFile
$ docker build -t credit-simulator -f ./docker/local.DockerFile .
$ docker run --network my-network --name back-container -d -p 4000:4000 credit-simulator
```