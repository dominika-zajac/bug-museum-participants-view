# Museum of Bugs: Workshop Guide 🪲

**"Debugging the Web with AI Agents + Chrome DevTools"**  
*Participant Guide*

---

## 💡 Core Workshop Rule

> **"Stop describing bugs to agents. Give them access to the running system and let them investigate."**

When debugging with AI coding agents, avoid pasting a bug description and hoping the model guesses the fix from static code. Instead, give the agent access to the live running browser session and prompt it to follow the **6-step Investigation Loop**.

---

## 🔁 The 6-Step Investigation Loop

```mermaid
graph LR
    O["<b>1. OBSERVE</b><br/>Understand context"] --> R["<b>2. REPRODUCE</b><br/>Trigger & confirm live"]
    R --> I["<b>3. INVESTIGATE</b><br/>Trace runtime cause"]
    I --> H["<b>4. HYPOTHESIS</b><br/>Form a theory"]
    H --> F["<b>5. FIX</b><br/>Apply change"]
    F --> V["<b>6. VERIFY</b><br/>Prove it works"]
    V -. "If verification fails" .-> I
```

| Step | Core Question | DevTools / Agent Action |
| :--- | :--- | :--- |
| **1. OBSERVE** | *What is the reported issue & context?* | Read user bug report, identify target URL/component, note required viewport or network conditions. |
| **2. REPRODUCE** | *Can we see the failure live in the browser?* | Navigate to page, trigger user actions, capture **Screenshots**, confirm broken UI or error state. |
| **3. INVESTIGATE** | *Where does it break at runtime?* | Inspect **failed HTTP response bodies**, **DOM bounding boxes**, **computed CSS rules**, **event listeners**, **stack traces**. |
| **4. HYPOTHESIS** | *Why is this happening?* | Connect runtime evidence to code; actively **rule out red herrings** and plausible false leads. |
| **5. FIX** | *What is the minimal targeted fix?* | Apply minimal, clean change to client or server code. |
| **6. VERIFY** | *Does it work under identical conditions?* | Re-run reproduction in browser under the **same mobile viewport, network throttling, or page reload** to capture proof. |

---

## 🛠️ Workshop Exercises

### Exercise 0 — Warm-Up: Setup & Connectivity (~5–7 min)
- **User Bug Report:**  
  > *"Something is wrong with this exhibit page. The Ant Colony exhibit card never displays its photograph. Investigate the running application using DevTools and fix it."*
- **Goal:** Verify that your agent + DevTools setup is connected and working.

---

### Exercise 1 — The Wrong Diagnosis (~20 min)
- **User Bug Report:**  
  > *"Searching for the 'Goliath Beetle' in the search bar fails with an error. Find the cause and fix it."*
- **Challenge:** Source-code inspection alone may suggest plausible but incorrect fixes. Let your agent inspect the runtime browser evidence to find the actual root cause.

---

### Exercise 2 — The Phantom Save (~25 min)
- **User Bug Report:**  
  > *"The UI says the curator notes were saved successfully, but after refreshing the page the old notes return. Find out why, fix it, and prove that the fix works."*
- **Challenge:** The UI displays an optimistic success state even though state persistence failed. Use Network inspection to locate the real issue.

---

### Exercise 3 — Works on My Machine (~20 min)
- **User Bug Report:**  
  > *"Visitors on mobile devices report they cannot click the 'Reserve Guided Specimen Tour' button. It works completely fine on desktop. Find the trigger and fix it."*
- **Challenge:** The bug only manifests under specific browser viewport conditions. Use responsive device emulation (`390px` mobile width) to inspect layout collisions.

---

### Exercise 4 — Final Boss: Double Ticket (~20–25 min)
- **User Bug Report:**  
  > *"Some visitors accidentally purchase duplicate tickets. Support says it happens mostly on mobile connections. We cannot reproduce it reliably on fast office network. Fix it."*
- **Challenge:** Reproduce the issue under **Network Throttling** (Slow 3G), identify the race condition, and implement a robust loading guard.

---

## 📊 Running Evals

To evaluate your fixes against the test suite:

```bash
node evals/run-evals.js
```
