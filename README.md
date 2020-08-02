# pwa-budget-tracker

Just a simple budget tracker app made using JavaScript, NodeJS, Express, Mongoose and hosted on Heroku.

![SS](https://github.com/randze/pwa-budget-tracker/blob/master/img/app.jpg)

## Installation
1. Cloning the repo
2. npm install
3. Run "node server.js"

## How it works
- Add positive/negative entries
- Will post to MongoDB if theres a connection
- If offline will post to local indexDB
- Once theres a connection again will bulk post saved entries to the database and wipe the indexDB

## Improvements to be done
- Refactoring code

## Links
[App](https://randze-budget-tracker.herokuapp.com/)
