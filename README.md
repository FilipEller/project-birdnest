# Project Birdnest

This is a pre-assignment submission for the Reaktor developer trainee 2023 position.  
The assignment is described [here](http://assignments.reaktor.com/birdnest/).

The running application can be visited [here](https://misty-bird-6153.fly.dev/).

## Getting started
All instructions start with a terminal open in the root of the project.

With Docker:

Run the application in production mode: `docker-compose -f docker-compose.yml up --build`  
Run the application in development mode: `docker-compose -f docker-compose.dev.yml up --build`

Without Docker:

Run the application in production mode:  
1. `cd birdnest-frontend`
1. `npm install`
1. `cd ../birdnest-backend`
1. `npm install`
1. `npm run start:full`

Run the application in development mode:  
1. `cd birdnest-backend`
1. `npm install`
1. `npm run dev`
1. Start a new terminal in the project root.
1. `cd birdnest-frontend`
1. `npm install`
1. `npm start`
