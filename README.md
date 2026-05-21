# CS105.Q21 - Advanced Three.js Interactive Demo Application

**Student: Duong Quoc Nhut - ID: 23521132**

An interactive Web 3D application designed using a professional **Modular Architecture**. This project synthesizes and showcases core **Three.js** production techniques, ranging from hierarchical object tree management and shadow map optimization to complex algorithmic animations and Physically Based Rendering (PBR) materials.

**You can find full demo video here: [Advanced Three.js Interactive Demo Application](https://www.youtube.com/watch?v=kVIonvwlmlg)**

https://github.com/user-attachments/assets/9878879a-bd98-4fff-8318-b6b999c77ae7

---

## Core Features

1. **Professional Modular Architecture:** The codebase is decoupled into strictly isolated classes (`App Engine`, `CameraRig`, `LightManager`, `MaterialManager`, `ObjectManager`) adhering to the Separation of Concerns (SoC) principle, allowing for seamless maintenance and scalability.
2. **Camera Animation Rig:** Utilizes nested `THREE.Group` nodes to isolate discrete transform domains (Rotation X, Rotation Y, Translation Z). This design eliminates **Gimbal Lock** and enables fluid cinematic intro camera animations powered by **Tween.js** easing curves.
3. **PBR Materials & Procedural Textures:** Employs advanced `MeshStandardMaterial` to render photorealistic physical surfaces. High-fidelity color (checkerboard) and roughness (smudges/scratches) maps are procedurally generated on-the-fly using internal HTML Canvases, removing external asset dependencies. It also supports runtime switching between `Basic`, `Lambert`, `Phong`, and `Standard` shading profiles.
4. **Comprehensive Lighting Matrix & Soft Shadows:** Integrates 5 distinct light classifications (`AmbientLight`, `DirectionalLight`, `PointLight`, `SpotLight`, `RectAreaLight`). Features optimized high-resolution shadow maps (`THREE.PCFSoftShadowMap`) configured with precise shadow `bias` parameters to eliminate shadow acne artifacts.
5. **Complex Organic Animation Loop:** Powers a dynamic 10x10 grid of meshes (`BoxGrid`). The vertical displacement and scaling are driven by a linear combination of periodic trigonometric waves (`Math.sin()`) and continuous 2D **Simplex Perlin Noise**, producing fluid, undulating natural wave motion.
6. **Intuitive Real-Time Interaction UI:** Implements `OrbitControls` with physics-based inertial damping (`enableDamping`) and a fully interactive `dat.GUI` control panel. Users can manipulate scene parameters, light intensities, fog densities (`FogExp2`), and material types in real time.

---

## Production-Ready Libraries (via CDN)

* **Three.js (r128):** Core WebGL graphic rendering abstraction framework.
* **OrbitControls:** Mouse/touch orbital camera tracking control plugin.
* **dat.GUI (v0.7.7):** Lightweight parameter tuning user interface library.
* **Tween.js (v18.6.4):** Easing-driven kinematic interpolation engine.
* **Simplex-Noise (v2.4.0):** Algorithmic noise generation utility for organic transformations.

---

## Installation & Execution Guide

Because the application leverages ES6 modular scripts and local asset loading, browsers will restrict direct execution of `index.html` via the `file://` protocol due to Cross-Origin Resource Sharing (**CORS**) security policies. The project must be served through a local development server.

### Step 1: Source Assembly

Create a project root directory named `threejs-advanced-demo`. Distribute the provided modular source codes into their corresponding files following the exact structure illustrated in the **Project Directory Structure** section.

### Step 2: Launching a Local Environment

* **Option 1: Visual Studio Code Live Server (Recommended)**
1. Open the `threejs-advanced-demo` folder inside **Visual Studio Code**.
2. Install the **Live Server** extension from the Marketplace.
3. Right-click your `index.html` file and select **Open with Live Server** (or click the *Go Live* status bar button at the bottom-right corner).


* **Option 2: Native Python HTTP Server**
Open your operating system Terminal (or Command Prompt) inside the root directory and run:
```bash
# For Python 3.x environments
python -m http.server 8080

```


Once running, open your web browser and navigate to: `http://localhost:8080`
* **Option 3: Node.js Global CLI Server**
Install a lightweight web server package globally:
```bash
npm install -g http-server

```


Execute the execution command inside your project directory root:
```bash
http-server -p 8080

```


Then view the build output by pointing your browser to: `http://localhost:8080`

### Step 3: Navigation and Interaction Modalities

* **Orbit Camera:** Left-click and drag to rotate the camera around the spatial target.
* **Pan Camera:** Right-click and drag (or hold `Shift` + Left-click and drag) to move the viewport plane.
* **Dolly / Zoom:** Roll the mouse scroll wheel to transition distance fields smoothly.
* **Control UI (dat.GUI):** Locate the dashboard in the top-right corner. You can alter the material profile dynamically (e.g., selecting `Basic` to bypass light interactions, or `Phong` to emphasize mirror specularity) or adjust specific light intensities and fog levels to evaluate rendering changes instantly.
"""

<img width="1467" height="906" alt="Image" src="https://github.com/user-attachments/assets/98f385a8-8962-433d-9c76-6734511658bb" />
