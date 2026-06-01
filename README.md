# Servants Web App

---

## Development Setup

1. Install the recommended VS Code extensions: `ESLint`.
2. Copy and rename `.env.example` to `.env`.
3. Open `.env` and set the variable `DB_CONNECTION` to the database connection string, `JWT_SECRET` to your encription key.
4. Run `npm install` on server folder to install the project dependencies.
5. Run `npm run build` on client folder to install the project dependencies.
6. Run `npm run dev` to start the dev server and dev client.
7. In the `package.json` file inside client folder, there should be "build": "tsc -b && vite build". But `tsc -b` is removed since it stops vercel from running because of the typescript check.