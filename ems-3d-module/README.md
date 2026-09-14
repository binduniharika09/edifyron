# Smart Industrial Campus - Energy Management System (EMS) 3D Digital Twin

An interactive 3D WebGL Digital Twin and Energy Management System (EMS) platform built with Three.js. It models an industrial smart campus featuring a central 33 kV Energy Hub and 12 radial manufacturing divisions with real-time electrical telemetry.

---

## 🌟 Key Features

- **Central 33 kV Energy Hub**: Substation architecture with high-voltage transformers, cooling radiator banks, rotating energy rings, and a glowing green power core.
- **12 Radial Manufacturing Units**: Custom 3D architectural profiles with photovoltaic solar rooftops, gantry cranes, chimneys, storage silos, and loading bays.
- **Dynamic Energy Conduits**: Glowing neon green laser/particle conduits pulsing power from the hub to each unit in real time.
- **Interactive 3D Floating Badges**: Real-time projected tags pinned to each unit showing Maximum Demand (kVA), Connected Load (kW), and Power Factor (PF).
- **Click-to-Focus Navigation**: Orbit, pan, and zoom around the campus, or click any unit to fly the camera into close-up view.
- **Deep-Dive Analytics Drawer**: Machinery load breakdown table and 6-month historical power consumption charts via Chart.js.
- **Camera & Environment Controls**:
  - Isometric (45° default), Top-Down Aerial, Campus Front, and 33kV Hub presets.
  - Cyberpunk Night Mode vs. Daylight Industrial Park toggle.
  - Live telemetry simulation ticker.

---

## 📊 Telemetry & Data Mapping (12 Divisions)

| Unit # | Division Name | Max Demand | Connected Load | Power Factor | Monthly Consumption |
| :---: | :--- | :---: | :---: | :---: | :---: |
| **1** | PEB Structure Manufacturing | 150 kVA | 679 kW | 0.96 | 38,550 kWh |
| **2** | ROB Structure Manufacturing | 100 kVA | 532 kW | 0.95 | 10,718 kWh |
| **3** | CNG Booster compressor manufacturing | 40 kVA | 67 kW | 0.99 | 5,432 kWh |
| **4** | Fastners manufacturing unit | 180 kVA | 718 kW | 0.95 | 33,059 kWh |
| **5** | Transmision Tower manufacturing unit | 250 kVA | 1,523 kW | 0.95 | 39,709 kWh |
| **6** | Solar Structure Manufacturing | 120 kVA | 990 kW | 0.99 | 20,070 kWh |
| **7** | Scaffolding fabrication unit | 98 kVA | 453 kW | 0.98 | 25,712 kWh |
| **8** | Signboard manufacturing unit | 25 kVA | 134 kW | 0.99 | 3,426 kWh |
| **9** | Galvanising Unit | 120 kVA | 551 kW | 0.99 | 98,437 kWh |
| **10** | Small arm manufacturing unit | 60 kVA | 161 kW | 0.99 | 3,487 kWh |
| **11** | Composite unit | 100 kVA | 2,188 kW | 0.99 | 20,900 kWh |
| **12** | Shelters manufacturing unit | 120 kVA | 2,398 kW | 0.98 | 37,695 kWh |
| **TOTAL** | **Campus Sum** | **1,263 kVA** *(1,400 Contracted)* | **10,394 kW** | **0.97 Avg** | **3,84,791 kWh** |

---

## 🚀 How to Run Locally

### Option 1: Direct File
Simply open `index.html` in Google Chrome, Microsoft Edge, or any modern browser.

### Option 2: Local Web Server (Windows)
Double-click `start-server.bat` to launch a zero-dependency local HTTP server on `http://localhost:8080/`.

---

## 🛠️ Built With

- **Three.js** (WebGL 3D Rendering & Shaders)
- **OrbitControls** (Camera interaction)
- **Tween.js** (Smooth cinematic camera transitions)
- **Chart.js** (Power consumption visualization)
- **HTML5 & Vanilla CSS3** (Futuristic industrial smart dashboard UI)
