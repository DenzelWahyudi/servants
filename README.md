# Servants Web App

### Author - Denzel Mark Wahyudi

---

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`.
5. Open `.env` and set the variable `DB_CONNECTION` to the database connection string, `SECRET_KEY` to your encription key, `RANDOM_KEY` to any value.
6. Run `npm install` to install the project dependencies.
7. Run `npm run dev` to start the dev server.

## Endpoints Documentation

### Users Components

Endpoints:

1. POST `localhost:<portNum>/api/users`. Registrasi baru untuk user dengan form dan menyimpannya ke database.

Body:

```json
{
  "name": "...",
  "email": "...",
  "phoneNumber": "...",
  "password": "...",
  "confirm_password": "..."
}
```

2. GET `localhost:<portNum>/api/users/:id`. Mengambil user dengan `userId`.

Result:

```json
{
	"_id": "...",
	"name": "...",
	"email": "...",
	"phoneNumber": "...",
	"passwordHash": "...",
	"role": "...",
	"__v": 0
}
```
