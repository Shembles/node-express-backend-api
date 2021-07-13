# Node Express Back-end!

A backend RESTful API.

## Potential Fixes

- I am still looking into mocking mysql database for endpoint testing with jest. So, I could not write unit tests.
- on retrieving orders, my url query string parameters are sent as strings. I am getting an error when page and limit are empty, because o my validations.

## Environment Setup

1. You'll need to clone https://github.com/Shembles/node-express-backend-api.git and run

```
npm install
```

then

```
npm start.
server will start at localhost:3200
```

2. I used MySQL for database. I also committed a file named create-db.sql with a snipet for creating the database. 

3. I also committed a .env for environmental varables. You will need to use your own varables for the database.

## Built With

- Node.js, Express.js and MySQL (database)

- Postman for endpoint testing. Link below for collection: 

https://www.getpostman.com/collections/4c41b1d424eaefbd8904