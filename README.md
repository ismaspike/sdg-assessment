# SDG Assessment

This is a population research application where users can browse number of
population of countries/continents, view their details. The app allows users to
search for different populations and filter it bt number.

## Features

- **Continents population**: Displays population filtered by continents
- **Countries population**: Users can search for continents, and it's countries
  population will be shown
- **Filter by number**: Different populations can be filtered by number.

## Tech Stack

- **React**: The frontend of the app is built with React.
- **React Router**: Used for client-side routing between different pages like
  phone list, phone details, and cart.
- **Context API**: Used for state management to handle global app states such as
  cart items, phone list, and loading states.
- **Node**: Backend is managed by a node server in the /server folder
- **Typescript**: To type all the api calls and information of the components
- **SCSS**: For styling the application with custom themes and responsive
  layouts. **GraphJS**: For showing the bar-graph

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/ismaspike/sdg-assessment.git
   ```

2. Navigate to project directory

   ```sh
   cd sdg-assessment
   ```

3. Install NPM packages in both, server and client folders

   ```sh
   cd server
   npm install
   cd client
   npm start
   ```

4. Start both, server and client projects in different consoles

   ```sh
   cd server
   npm start
   cd client
   npm start
   ```

5. Open the Project in Your Browse

   Go to localhost:3000 in your browser

## Folder structure

    ./server
    Contains Node Backend server

    ./client
      Contains React Frontal server

    ./client/src/components
      Components created in the app. It's divided in:

      ./components/main
        Core components of the app

      ./components/common
        Smaller components that can be used in main components for several cases

    ./client/src/styles
      Styles applied for all the app. Contains the variables, the imports and the main app styles

    ./client/src/types
      Models used to type the context data and the api responses (adapetd and not adapted)

## Deploy and minify

Both servers (Node and React) are prepared to be deployed and minified. Server
has a line in index.ts that triggers build when deployed in prod, and client has
it's build files ready (and can be updated with an npm run build)

## Other functions

The app has also esLint and preetify to indent and format the code.
Configuration will be installed directly in npm start, but be careful not to
have a custom configuration in the plugins of your IDE
