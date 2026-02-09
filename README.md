# Agentforce Studio Template

A **ready-to-use starting point** for **designers**, **product managers**, and **developers** who want to build and share **Agentforce Studio**–style prototypes. No Salesforce org or backend required—just open the project in Cursor, run a couple of commands, and you get a local app that looks and feels like Agentforce Studio so you can explore ideas, test flows, and demo to stakeholders.

---

## Who is this for?

- **Designers** — Prototype screens and flows in a real app shell without writing backend code.
- **Product managers** — Spin up clickable demos to validate concepts and gather feedback.
- **Developers** — Start from a consistent Salesforce-style shell and add features with SLDS 2 and a clear theme layer.

You don’t need to be a developer to get it running. The steps below assume you’re starting from scratch (no Node, no Homebrew) and tell you exactly what to install and what to run.

---

## What’s included

- **Global header** — Salesforce-style header with logo, search, favorites, actions, help, setup, notifications, and user avatar.
- **Vertical navigation** — Agentforce Studio–style sidebar (Getting Started, Home, expandable sections for Agents, Models, Data, Prompts, Testing, Analytics, plus Settings and Collapse).
- **App shell** — Fixed header, fixed-width sidebar, and a main content area that scrolls. Ready for your pages.
- **Sample content** — Example list and table so you can see the layout and styling right away.
- **Theme system** — Built on Salesforce’s design system (SLDS) with **one file** for all your visual overrides so branding and tweaks stay in a single place.

---

## Getting started (step-by-step)

Follow these steps in order. All commands are meant to be run in the **Cursor Terminal** (Terminal → New Terminal in Cursor).

### Step 1: Install Node.js (one-time setup)

You need **Node.js** to run the local server. If you’ve never installed it:

1. Go to **https://nodejs.org**
2. Download the **LTS** version (recommended).
3. Run the installer and follow the prompts.
4. **Quit and reopen Cursor** (and the Terminal) so it recognizes Node.

To confirm it worked, in Cursor’s Terminal run:

```bash
node --version
```

You should see a version number (e.g. `v20.x.x`). If you get “command not found,” Node isn’t installed or Cursor wasn’t reopened.

### Step 2: Open the project in Cursor

1. In Cursor: **File → Open Folder**
2. Choose the **Agentforce Studio** template folder (the one that contains this README, `package.json`, and the `src` folder).
3. The folder opens as your workspace.

### Step 3: Install dependencies (one-time per project)

In the **Cursor Terminal**, make sure you’re in the project folder (the one that contains `package.json`). If you just opened the folder in Cursor, the terminal is usually already there. Run:

```bash
npm install
```

Wait until it finishes. You only need to do this once per machine (or when the project’s dependencies change).

*If your terminal opened somewhere else, first run `cd` and then drag the project folder into the terminal to paste its path, then press Enter. After that, run `npm install`.*

### Step 4: Start the app

In the same Terminal, run:

```bash
npm start
```

You should see something like:

```text
   Serving!
   - Local:    http://localhost:3000
```

### Step 5: Open the app in your browser

1. Open your web browser (Chrome, Safari, Firefox, etc.).
2. Go to: **http://localhost:3000**
3. You should see the Agentforce Studio shell with header, sidebar, and sample content.

**Important:** Use **http://localhost:3000** (served by the app). Do **not** open `src/index.html` by double-clicking it (file://). Icons and assets won’t load correctly when opened as a file.

### Stopping the app

In the Terminal where `npm start` is running, press **Ctrl+C** to stop the server. You can run `npm start` again anytime to bring the app back.

---

## Adding new features

You can change the prototype by editing the HTML, adding new pages, or adjusting the theme. The template is built so you can do a lot by **describing what you want** in Cursor and letting the AI help.

### How to ask for changes

In Cursor’s chat (or Composer), describe what you want in plain language. For example:

- **“Add a new page called ‘Reports’ to the sidebar and link it to a new page that shows a simple report list.”**
- **“Change the main page title from ‘Opportunities’ to ‘My Agents’ and update the table headers to match.”**
- **“Add a new section in the left nav for ‘Documentation’ with two items: ‘Guides’ and ‘API Reference’.”**
- **“Make the sidebar 24rem wide instead of 20rem.”** (This will be done via the theme file; see below.)
- **“Use the SLDS card component to show a grid of three cards on the Home page.”**

The project is set up so that:

- **New pages** are added as HTML files in `src/` and linked from the nav.
- **Navigation** is controlled by `src/components/vertical-nav.html` (one place to add or reorder items).
- **Visual changes** (colors, spacing, widths) go in **one file**: `src/theme/slds-theme.css` (see “How theming works” below).

### Where things live

| What you want to change | File or place |
|-------------------------|----------------|
| Sidebar links and labels | `src/components/vertical-nav.html` |
| Header (logo, search, actions) | `src/components/global-header.html` |
| Main content of the home page | `src/index.html` (the area inside `<main>`) |
| New pages | New HTML files in `src/`, e.g. `src/reports.html` |
| Colors, spacing, nav width, shell layout | `src/theme/slds-theme.css` |
| Reusable nav component | Loaded by `src/js/vertical-nav.js`; markup in `vertical-nav.html` |

When you add a new page in a subfolder, the nav component can point to it by setting the data attribute, for example:

```html
<div id="app-vertical-nav" data-vertical-nav-src="../components/vertical-nav.html"></div>
```

---

## How theming works (SLDS 2 and the theme file)

The template uses **Salesforce’s Lightning Design System** so the UI stays consistent with Salesforce and Agentforce. Theming is built in **three layers**:

1. **SLDS 1 (base)** — Core design system (components, tokens, icons) in `src/theme/slds-1/`. This is the foundation; you don’t edit these files.
2. **SLDS 2** — An extra layer (`src/theme/slds-plus.css`) that adds SLDS 2 tokens and component updates. Again, you don’t edit this for your customizations.
3. **Your overrides** — **All** of your app-specific styling (brand colors, sidebar width, shell layout, spacing, etc.) goes in **one file**: **`src/theme/slds-theme.css`**.

### Why one theme file?

- **Single place to look** — Designers and PMs know: “If it’s a visual change, it’s in `slds-theme.css`.”
- **No hunting** — You don’t have to search through many files to change a color or width.
- **Safe to customize** — The base SLDS files stay untouched, so upgrades and consistency are easier.

### What goes in `slds-theme.css`

- **Token overrides** — e.g. changing a background or border color to match your brand (using SLDS token names).
- **App “aliases”** — Short names that map to SLDS tokens (e.g. nav width, header height) so the rest of the app uses one variable.
- **Layout and shell** — Rules for the app shell (header height, main area, sidebar width, borders).

The file is already set up with variables like `--app-nav-column-width` and `--app-global-header-height`. To change the sidebar width or header height, edit those values in `src/theme/slds-theme.css`. The project follows the rule: **no one-off colors or spacing in component HTML**; all visual customization stays in this theme file so everything stays consistent and easy to maintain.

---

## Quick reference

| Task | Command or action |
|------|--------------------|
| First-time setup | Install Node from nodejs.org, then in Cursor Terminal: `npm install` |
| Start the app | In project folder: `npm start` |
| Open the app | Browser: **http://localhost:3000** |
| Stop the app | In Terminal: **Ctrl+C** |
| Change nav / add pages | Edit `src/components/vertical-nav.html` and add or link new HTML in `src/` |
| Change look and feel | Edit **`src/theme/slds-theme.css`** only |

---

## Reusing in other stacks

The UI is static HTML and standard SLDS markup. You can reuse the structure and class names in Lightning Web Components (LWC), React, Vue, or other frameworks by adapting the markup to your stack; the same theme file concept (one place for visual overrides) applies there too.

---

## Need help?

- **App won’t start** — Make sure you ran `npm install` in the project folder and that `node --version` works. Then run `npm start` from the same folder.
- **Icons or images missing** — Always use **http://localhost:3000**; don’t open `index.html` as a file.
- **Want to add a feature** — Describe it in Cursor (e.g. “Add a Reports page and put it in the sidebar”) and point to this README so the AI keeps new pages and styling in the right places (nav component, `src/`, and `slds-theme.css`).
