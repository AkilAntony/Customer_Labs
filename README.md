# Segment Creator

This page allows users to create a segment by selecting schemas and saving the segment.

## Features

*   Input field for segment name
*   Dropdown to select schema
*   Button to add new schema
*   Dynamic addition of new schema dropdowns
*   Data submission to server in specified format

*Data Format*

The data is submitted to the server in the following format:


{
  "segment_name": "last_10_days_blog_visits",
  "schema": [
    { "first_name": "First name" },
    { "last_name": "Last name" }
  ]
}


*How to Run the App*

1. _Clone the repository_: Clone the repository using `git clone ([repository url](https://github.com/AkilAntony/Customer_Labs_task)).
2. _Install dependencies_: Install the dependencies using `npm install` or `yarn install`.
3. _Start the app_: Start the app using `npm start` or `yarn start`.
4. _Open in browser_: Open the app in your browser at `http://localhost:3000`.

