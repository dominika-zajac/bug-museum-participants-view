# Museum of Bugs 🪲

A hands-on workshop environment for **"Debugging the Web with AI Agents + Chrome DevTools"**.

> **"Stop describing bugs to agents. Give them access to the running system and let them investigate."**

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+**
- **npm 9+**

#### Installing Node.js & npm (if needed)

First, check if you already have Node.js and npm installed:

```bash
node -v
npm -v
```

If you need to install or update them:

- **Official Installer (Recommended for beginners):**
  - Download and install the LTS version from [nodejs.org](https://nodejs.org/) (npm is automatically included).

- **Using a Version Manager (Recommended for flexibility):**
  - **macOS / Linux (`nvm`):**
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
    # Restart terminal or reload shell profile, then:
    nvm install 20
    nvm use 20
    ```
  - **Windows (`nvm-windows` or `fnm`):**
    - Install [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) or [fnm](https://github.com/Schniz/fnm).

- **Using Package Managers:**
  - **macOS (Homebrew):**
    ```bash
    brew install node
    ```
  - **Windows (winget):**
    ```powershell
    winget install OpenJS.NodeJS.LTS
    ```
  - **Linux (Ubuntu / Debian):**
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```

> **Tip:** If you already have Node.js installed but need to update npm to version 9+, run:
> ```bash
> npm install -g npm@latest
> ```


### Install & Run

```bash
# Install all dependencies
npm run install:all

# Start both Vite client (:5173) and Express API (:3001)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🔁 The Investigation Loop

Every exercise in this workshop follows the 6-step diagnostic loop:

```mermaid
graph LR
    O["<b>1. OBSERVE</b><br/>Understand context"] --> R["<b>2. REPRODUCE</b><br/>Trigger & confirm live"]
    R --> I["<b>3. INVESTIGATE</b><br/>Trace runtime cause"]
    I --> H["<b>4. HYPOTHESIS</b><br/>Form a theory"]
    H --> F["<b>5. FIX</b><br/>Apply change"]
    F --> V["<b>6. VERIFY</b><br/>Prove it works"]
    V -. "If verification fails" .-> I
```

```
1. OBSERVE      → Understand user bug report & context
2. REPRODUCE    → Trigger & confirm failure live in browser
3. INVESTIGATE  → Inspect Network, Console & DOM with DevTools
4. HYPOTHESIS   → Form evidence-backed theory & rule out red herrings
5. FIX          → Apply minimal targeted code change
6. VERIFY       → Prove fix works under matching live conditions
```

Skill instructions are available in:
`.agents/skills/investigation-loop/SKILL.md`

---

## 🎯 The 4 Workshop Exercises (+ Warm-Up)

| Exercise | Scenario | Diagnostic Focus |
| :--- | :--- | :--- |
| **Ex 0** | **Warm-Up: The Missing Specimen** | Environment setup · Network panel inspection |
| **Ex 1** | **The Wrong Diagnosis** | Avoiding static code traps · Network 500 error tracing |
| **Ex 2** | **The Phantom Save** | Optimistic UI vs failed persistence · Page reload verification |
| **Ex 3** | **Works on My Machine** | Mobile responsive emulation (390px) · DOM touch overlay inspection |
| **Ex 4** | **Final Boss: Double Ticket** | Network throttling (Slow 3G) · Concurrency race conditions |

See [WORKSHOP.md](./WORKSHOP.md) for full exercise descriptions.

---

## 📊 Running Evals

To run the automated evaluation suite:

```bash
node evals/run-evals.js
```
