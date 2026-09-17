# WhosOnScreen 🎬

> **Instant On-Screen Actor Identification — Prime Video X-Ray for the Entire Web.**

[![Manifest V3](https://img.shields.io/badge/Chrome-Manifest%20V3-blue?style=flat-square&logo=googlechrome)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)
[![Version](https://img.shields.io/badge/Version-0.2.0-purple?style=flat-square)](manifest.json)

**WhosOnScreen** is a lightweight, high-performance Chrome extension that brings the magic of Amazon Prime Video's **X-Ray** to **Netflix, JioHotstar, YouTube, Prime Video, and any HTML5 video player on the web**. 

With a single hotkey (`Alt+W` / `⌥W`) or by tapping a floating player pill, WhosOnScreen instantly scans the video frame, identifies the actors on screen, and renders a native, translucent player panel with rich filmographies, character roles, biographies, and direct IMDb/TMDB links.

---

## ✨ Key Features

### 1. ⚡ Effortless Triggers (Zero Friction)
- **Universal Hotkeys (No Mouse Needed)**:
  - **Windows / Linux**: `Alt + W`
  - **Mac**: `⌥W` (Option + W) or `⇧⌘W` (Cmd + Shift + W)
  - Registered via capture-phase listeners on `<all_urls>` so streaming players never swallow or block the keystroke.
- **Discreet Floating Player Pill**:
  - Automatically floats in the upper corner of any active video player (`≥340px × 190px`).
  - Auto-fades after 3.5s of mouse idle during playback and reappears smoothly on mouse movement.
  - Isolated inside a closed Shadow DOM so host page CSS never distorts it.
- **Auto-Open on Pause (Optional)**:
  - Hands-free toggle in the footer (`⏸ Auto-Pause: ON/OFF`). When enabled, pausing video automatically brings up the X-Ray panel.

### 2. 🎯 3-Tier Honest Mode Hierarchy
We believe truthfulness is paramount. Instead of guessing or falsely claiming who is on screen, WhosOnScreen uses a transparent 3-tier hierarchy that matches Amazon Prime Video X-Ray's honesty:

| Mode | Header Treatment | Badge | Detection Pipeline |
| :--- | :--- | :--- | :--- |
| **High Confidence** | `IN THIS SCENE` | `ON SCREEN` (Frosted) | Face(s) verified on camera with temporal voting & single-frame cut preservation. |
| **Medium Confidence**| `SPEAKING IN SCENE` | `SPEAKING` (Subdued) | Subtitle cue matches active character dialogue when faces are obscured. |
| **Fallback** | `MAIN CAST & LEADS` | `LEAD` (Outline) | Wide shots, scenery, or DRM canvas lock — honest explanatory note displayed. |

### 3. 🧠 Robust Face Detection Pipeline
- **Quality Filter Tuned for Cinema**: Aspect ratio checks (`0.95–1.80`) and permissive luminance thresholds (`luma ≥ 8`) ensure dark, side-lit, chiaroscuro, and noir streaming scenes (*The Night Manager, Shōgun, The Batman*) aren't falsely rejected.
- **Multi-Frame Temporal Voting**: Evaluates candidate faces across consecutive frames (180ms apart) to confirm spatial consistency and filter transient artifacts.
- **Single High-Quality Frame Override**: If a clear foreground face appears right before a fast cut or shot transition, it is preserved instead of being penalized by the next frame.
- **Bounded Cast Matching**: Prioritizes top-billed characters and weights prominent foreground faces first.

### 4. 🎨 Native Prime Video X-Ray Aesthetics
- **Restrained Player Chrome**: No neon AI gimmicks, glowing dots, or distracting animations. Clean, tracked uppercase typography and frosted monochrome tags.
- **Cinematic Dark Glass**: Dual-stop linear gradient (`rgba(16, 18, 28, 0.88)` to `rgba(10, 11, 16, 0.93)`) with 32px backdrop blur and 200% saturation filter.
- **Docked Right Edge**: 375px wide panel positioned cleanly at `right: 24px, top: 24px, bottom: 88px` with clearance for scrub bars.
- **High-Clarity Headshots**: 64px circular portraits with ambient rim border, 17px bold typography, and `-2px` hover lift.
- **Actor Detail View**: Tap any actor card to explore large 92px×124px portraits, birth place, age, child actor tags, frosted biography, and known-for filmography grid.

### 5. 🚀 Sub-5ms Instant Second Opens
- **Two-Tier L1/L2 Cache Architecture**:
  - **L1 In-Memory `Map`**: Instant synchronous `0ms` response for previously loaded titles, cast, and actor profiles.
  - **L2 `chrome.storage.local`**: Persistent cache across browser restarts with 7-day TTL.

### 6. 🌐 Universal Compatibility
- **Supported Platforms**: Netflix, JioHotstar, Amazon Prime Video, YouTube, Vimeo, and custom HTML5 web players.
- **Unknown Sites & Local Video Fallback**: Shows an interactive **Universal Discovery Card** with 1-tap quick pills (*Panchayat, The Night Manager, Mirzapur, Shōgun, Stranger Things, Animal*) to immediately load cast details.
- **1-Click Title Correction**: Misidentified title? Click the inline pencil icon `[✎]` in the header to instantly search or adjust the title.

---

## 📥 How to Install (Load Unpacked)

Since WhosOnScreen is currently open-source in active development, install it in Developer Mode:

1. **Clone or Download** this repository:
   ```bash
   git clone https://github.com/rohanrjoshii/WhosOnScreen.git
   cd WhosOnScreen
   ```

2. **Install dependencies & build**:
   ```bash
   npm install
   npm run build
   ```
   *(This outputs the production bundle to `dist/`)*.

3. **Load into Google Chrome / Chromium**:
   - Open Chrome and navigate to `chrome://extensions`.
   - Enable **Developer mode** using the toggle in the top-right corner.
   - Click the **Load unpacked** button in the top-left corner.
   - Select the `dist/` directory inside this repository (or the repository root containing `manifest.json`).

4. **Pin the extension** and open any streaming site!

---

## ⌨️ Controls & Shortcuts

| Action | Shortcut (Windows/Linux) | Shortcut (Mac) |
| :--- | :--- | :--- |
| **Toggle X-Ray Overlay** | `Alt + W` | `⌥W` (Option + W) or `⇧⌘W` |
| **Close Overlay** | `Escape` | `Escape` |
| **Inline Title Correction** | Click `[✎]` in header | Click `[✎]` in header |
| **Toggle Auto-Pause Mode** | Click `⏸ Auto-Pause` in footer | Click `⏸ Auto-Pause` in footer |

---

## ⚠️ Current Limitations & DRM Considerations

1. **DRM & Hardware-Accelerated Video (Widevine L1)**:
   - On some hardware and browser configurations, encrypted video streams (e.g. Netflix, Prime Video) block `<canvas>` pixel reading via Widevine DRM protection.
   - **How WhosOnScreen handles this**: When canvas reading is restricted, WhosOnScreen gracefully falls back to dialogue speaker matching and top-billed scene leads with honest mode labeling (`Main Cast & Leads`), ensuring the user is never left with a broken or empty screen.
2. **Extreme Lighting & Oblique Angles**:
   - Characters shot in heavy shadow, silhouettes, or extreme profile angles (>75° rotation) may not register as frontal face candidates.
3. **TMDB Coverage**:
   - Cast metadata, character roles, and profile photos depend on The Movie Database (TMDB) API.

---

## 🧠 Advanced Face Recognition Architecture & Roadmap

WhosOnScreen is engineered with modern computer vision principles tailored for browser extensions:

```
Video Frame (Canvas 480p)
   │
   ▼
Face Quality Filter ─── (Reject tiny faces < 32px, motion blur, non-facial aspect ratios)
   │
   ▼
Multi-Frame Temporal Voting ─── (Sample across 180ms burst to eliminate blinks/flicker)
   │
   ▼
Bounded Cast Matching ─── (Search space strictly constrained to the title's 10–15 cast members)
   │
   ▼
3-Tier Confidence Output:
   ├── High Confidence (Face Match) ──> "In This Scene" (● On Screen)
   ├── Mid Confidence (Subtitle Cue) ──> "Speaking in Scene" (● Speaking)
   └── Fallback (Scene Leads)        ──> "Main Cast & Leads" (● Top Billed)
```

### Planned Roadmap:
- [ ] **ONNX Runtime Web Integration**: Running lightweight AdaFace / ArcFace models in an isolated WebAssembly/WebGPU offscreen document for high-fidelity embedding extraction.
- [ ] **5-Point Landmark Face Alignment**: Standardizing eye and nose angle alignment before feeding crops to embedding models.
- [ ] **Local Video Drag-and-Drop**: Support for offline MP4/MKV video files with custom subtitles.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
