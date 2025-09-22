# E-Services Microfrontends Project

This application is my portfolio. It is composed of various sections including but not limited to projects, contact and programming challenges. The entire application is accessible via the root endpoint.

The overall structur is implemented using Node.js, React and the microfrontend architecture. Each microfronted is framework agnostic.

With a slight modification to the bootstrap file within each microfronted, an alternate framework can replace the existing React framework.

Certain sections, particularly, the projects section interacts with the services-api.

## Getting Started

1. Ensure you have Node.js and React installed
2. Create necessary .env files for each microfronted if needed. Note: a templage of required environment variables will be made available.

## Running the Project

#### In Development:

- Run all microfrontends at once:
  At root, execute the following command `npm run dev`
- Run individual microfrontends: Refer to each microfrontend README file for further instructions.

## CI/CD

## Docker

## Running the Tests
