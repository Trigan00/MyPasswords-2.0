# MyPasswords

MyPasswords is a cloud-enabled, mobile-ready password manager.

- PostgreSQL
- Nest
- React
- RTK Query
- TS

## Features

- Two-factor authentication
- Storing passwords in encrypted form
- Editing passwords
- Generating strong passwords
- Displaying password complexity


To log in using two-factor authentication, you need to use applications such as Google Authenticator.

## Installation

Install the dependencies and devDependencies and start the server.

```sh
cd server
npm i
npm run start:dev
```

```sh
# .env
DB_USER=user
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=databaseName
PORT = 5000
JWT_ACCESS_SECRET = your secret
JWT_REFRESH_SECRET = your secret
twoFASecret = your secret
SMTP_HOST = your smtp
SMTP_PORT = 465
SMTP_USER = smtp user
SMTP_PASSWORD = your password
API_URL = http://localhost:5000
CLIENT_URL = http://localhost:3000
```

Install the dependencies and devDependencies and start the client.

```sh
cd client
npm i
npm run start
```

```sh
# .env.local
REACT_APP_SERVERURL = http://localhost:5000
```

#### Building for source

For production release:

```sh
cd server
npm run build
cd client
npm run build
```
## Demo

![Auth Page](https://github.com/Trigan00/MyPasswords-2.0/assets/102516666/9ce4e29a-5477-438d-bbb9-ed43dad9b729)
![Password Page](https://github.com/Trigan00/MyPasswords-2.0/assets/102516666/b69668d0-bc4a-415d-8590-bfd2998c7545)

