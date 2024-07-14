# Trello Viewer Center
## Description
This project is a firebase serverless function that manage the trello api secrets, and provide apis to get/set the trello api secrets.

## Tech Stack
- Firebase 
  - Firebase Functions
  - Firebase Firestore
- Node.js
- Typescript

## How to run
1. Clone this repository
2. Run `cd functions && yarn install`
3. Run `ENV_SECRET={{ENV_SECRET}} yarn decrypt` decrypt the `.env.local` file, replace `{{ENV_SECRET}}` with the secret
4. Run `yarn serve` to start the firebase emulator

