# Museum of Bugs 🪲

A workshop demo application for **"Debugging the Web with AI, Antigravity, Chrome DevTools MCP & Chrome for Agents"**.

A polished natural history museum website about insects — containing 16 intentionally introduced bugs and setup exercises for hands-on debugging.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
# Install all dependencies
npm run install:all

# Start both Vite (port 5173) and Express API (port 3001)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🐛 What's Inside

The app contains **16 intentionally introduced bugs and setup exercises** across:

| Category | Count | Exercises |
|----------|-------|-----------|
| Accessibility | 3 | #1, #2, #3 |
| Performance | 2 | #4, #5 |
| CSS | 2 | #6, #7 |
| JavaScript | 2 | #8, #9 |
| Network | 2 | #10, #11 |
| Data | 1 | #12 |
| AI Demo | 2 | #13, #16 |
| Runtime | 1 | #14 |
| Memory | 1 | #15 |

---

## 📁 Project Structure

```
bug-museum-participant/
├── client/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/        # React components (with bugs)
│   │   ├── data/              # Exhibit & shop data
│   │   └── assets/            # Insect illustrations
│   └── public/
│       ├── dinosaur.js        # Bug #5 – unused script
│       └── old-analytics.js   # Bug #5 – unused legacy analytics
├── server/                    # Express API
│   ├── index.js               # Bug #10 – no CORS headers
│   └── exhibits-data.js       # Bug #12 – wrong rarity data
├── functions/                 # Firebase Cloud Functions
└── firebase.json              # Firebase Hosting config
```

---

## 🔥 Firebase Deployment

1. Update `.firebaserc` with your Firebase project ID
2. Build the client:
   ```bash
   npm run build
   ```
3. Install Functions dependencies:
   ```bash
   cd functions && npm install
   ```
4. Deploy:
   ```bash
   firebase deploy
   ```

Or use the emulator for local testing:
```bash
firebase emulators:start
```

---

## 🛠️ Bug Overview (No Spoilers)

The app looks polished at first glance. Bugs are hidden in:
- Form elements
- Interactive buttons
- Search functionality
- The gift shop cart
- Network requests
- JavaScript event handling
- Mobile layout
- Memory management

Use Chrome DevTools, Antigravity, and Chrome DevTools MCP to find them all.