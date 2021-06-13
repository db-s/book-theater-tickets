# Book Theater Tickets

This is a demo application with a list of APIs to handle an imaginary theater ticket purchase. It also includes a couple APIs to show analytic data about theater visitors and earnings.

# Get Started

## Run app directly

To start the server, run the following command

```sh
npm start
```

To run tests, run the following command

```sh
npm test
```

Access the app on http://localhost:3001

To check if API service is up, run the following command

```sh
curl http://localhost:3001/api/ping
```

## Run app via Docker

To start Node.js and MongoDB services, run the following command

```sh
docker compose up
```

To run tests on Docker container, run the following command

```sh
docker container exec -it app_web /bin/bash -c 'npm run test:docker'
```

## Authentication

- For authentication, bearer token should be passed in request header `Authorization`. Here, you can just pass the string `hello@123` and it will authenticate the APIs.
- Base API path - `/api`, so to access any api, the url will look like this - `http://localhost:3001/api/<API_ENDPOINT>`

## API Docs

- To access API docs, visit - http://localhost:3001/api-docs
- To view Postman collection, visit - https://documenter.getpostman.com/view/6269740/TzeTJ9nw

## Notes

- For analytics data, `start date` and `end data` will actually look for Ticket model attribute __`performanceTime`__ which indicates the time when play will be performed in the theater, not when the ticket was purchased.
- App directory has been mounted into the container `app_web` using bind mount. So you can modify any file inside app directory and the change will reflect in docker container. However, it may take a few moments for the server to restart.