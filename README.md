# Vehicle Inventory Management System

## Overview

The Vehicle Inventory Management System is a web application designed to help authorized users manage a vehicle inventory. This system allows users to perform CRUD (Create, Read, Update, Delete) operations on the vehicle database. The application is built with a React frontend, AWS backend services, and utilizes various AWS services for user authentication, API management, serverless computing, and data storage.

## Features

- **User Authentication**: Secure login and user management handled by AWS Cognito.
- **Vehicle Management**: Authorized users can add, view, update, and delete vehicles from the inventory.
- **Responsive UI**: A clean and intuitive interface built with React and Mantine UI.
- **Serverless Architecture**: Backend operations are managed by AWS Lambda functions.
- **API Gateway**: AWS API Gateway handles API requests and triggers Lambda functions.
- **Data Storage**: Vehicle data is stored in AWS DynamoDB, a fast and flexible NoSQL database service.
- **State Management**: Global state management using Zustand for consistent data handling across the application.

## Technology Stack

- **Frontend**: React, Mantine UI
- **Backend**: AWS Amplify, AWS API Gateway, AWS DynamoDB, AWS Cognito
- **State Management**: Zustand
- **Hosting**: AWS Amplify

