# Servants Web App

---

## Development Setup

1. Install the recommended VS Code extensions: `ESLint`.
2. Copy and rename `.env.example` to `.env` inside the server folder.
3. Open `.env` and set the enviroment variables.
4. In the `package.json` file inside client folder, there should be "build": "tsc -b && vite build", but `tsc -b` is removed since it stops vercel from running because of the typescript check.
