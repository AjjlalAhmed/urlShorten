# urlShorten URL Shortner with NodeJS ExpressJS and MongoDB
A HTTP service to short the URL with the limit count on how many times that shorten URL can be used.
This project is made using NodeJS ExpressJS and MongoDB.

How it works
User enters a valid URL into the form. If the format is valid, the webpage will respond with a JSON containing the original url and shortened url. If the URL is not valid or does not exist, the api will respond with an error saying Invalid URL.

How to use
After cloning the repo:
- cd dir
- npm install
To protect database details, I used dotenv and a .env file. Please rename the .envExample to .env and paste your DBURI URI BASEURL.

