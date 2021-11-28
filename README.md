# URL Shortener API

This is my implementation of the URL Shortener API. It has two endpoints

- First receives an URL and generates a short URL.
- Second receives a short URL and redirects to the original URL. Additionally registers the visit.

### Run the API:

The easiest way to start an application is to run it inside a Docker container with docker-compose. It will start an API and its dependencies (database). On the development environment, it will also start a pgadmin container.

To start the application run the following command inside the root folder:

```
docker-compose up -d --build
```

To stop the application run:

```
docker-compose down
```

### Use the API:

To shorten an URL (for example 'http://google.com') send the following POST request:

```
POST /shortUrl HTTP/1.1
Host: tier.app
Content-Type: application/json
Content-Length: 36

{
    "url": "http://google.com"
}
```

The response will contain an original URL and short URL, for example:

```
{
    "url": "http://google.com",
    "shortUrl": "http://tier.app/oemCC1N"
}
```

Navigate to the short URL to be redirected to the original URL:

```
GET /oemCC1N HTTP/1.1
Host: tier.app
```

### Run API tests:

* Navigate into the api folder:

```
cd api
```

* Restore packages inside the api folder:

```
npm install
```

* run tests

```
npm test
```