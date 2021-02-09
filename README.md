# TS-REST-API :penguin:

![create with](https://img.shields.io/badge/create%20with-%F0%9F%92%96-ff69b4)

It's typescript rest api server with bearer token auth with establieshed CORS to allow access from any domain. This rest api configured to use MongoDB.

![url=https://ibb.co/NmmCh46](https://i.ibb.co/wwwgHvN/Untitled-1.jpg)

## A little bit about work of tokens here

To get token you need to sign up or sign in. After that token will be added in collections ***tokens*** and will be expired in 10 min. If you request to one of routers in ***User***, the time of token flow will be extended on 10 min. If don't, the token will be deleted from collections and you need to create a new one. The max time of using one token is 7 days.

## Routers

### sign up
```sh
   curl --location --request POST 'localhost:3000/auth/signup' \
   --header 'Content-Type: application/json' \
   --data-raw '{
      "id": "cat@catmail.com",
      "password": "WowYay123"
   }'

```

### sign in
```sh
   curl --location --request POST 'localhost:3000/auth/signin' \
   --header 'Content-Type: application/json' \
   --data-raw '{
      "id": "cat@catmail.com",
      "password": "WowYay123"
   }'

```

### log out
```sh
   curl --location --request GET 'localhost:3000/auth/logout/:all' \
   --header 'Content-Type: application/json'\
   --header "Authorization: Bearer <here is some token>"
```
with param `all`:
- true - removes all users bearer tokens
- false - removes only current token

### info
```sh
   curl --location --request GET 'localhost:3000/user/info' \
   --header 'Content-Type: application/json'\
   --header "Authorization: Bearer <here is some token>"
```

### latency
```sh
   curl --location --request GET 'localhost:3000/user/latency' \
   --header 'Content-Type: application/json'\
   --header "Authorization: Bearer <here is some token>"
```

## All what you need to start it:
```sh
    npm i
    npm start
```

***Free Software, Hell Yeah!*** :sheep: