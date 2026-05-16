class LightManager {
    constructor() {
        this.lights = {};
        this.helpers = {};
        this.initLights();
    }

    initLights() {
        // Ambient Light
        this.lights.ambient = new THREE.AmbientLight(0xffffff, 0.15);

        // Directional Light
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
        dirLight.position.set(10, 20, 10);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048; 
        dirLight.shadow.mapSize.height = 2048;
        dirLight.shadow.camera.near = 0.5;
        dirLight.shadow.camera.far = 50;
        const d = 15;
        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;
        dirLight.shadow.bias = -0.0005; 
        this.lights.directional = dirLight;

        // Point Light
        const pointLight = new THREE.PointLight(0xffaa00, 1, 30);
        pointLight.position.set(0, 8, 0);
        pointLight.castShadow = true;
        this.lights.point = pointLight;

        const sphereGeo = new THREE.SphereGeometry(0.2, 16, 16);
        const sphereMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
        this.pointLightMarker = new THREE.Mesh(sphereGeo, sphereMat);
        this.lights.point.add(this.pointLightMarker); // Gắn marker làm con của PointLight

        // Spot Light 
        const spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.position.set(0, 15, 0);
        spotLight.angle = Math.PI / 6;
        spotLight.penumbra = 0.4; 
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1048;
        spotLight.shadow.mapSize.height = 1048;
        this.lights.spot = spotLight;

        // RectAreaLight
        if (typeof THREE.RectAreaLight !== 'undefined') {
            this.lights.rect = new THREE.RectAreaLight(0x00ffaa, 5, 4, 4);
            this.lights.rect.position.set(0, 5, -5);
            this.lights.rect.lookAt(0, 0, 0);
        }
    }

    addToScene(scene) {
        Object.keys(this.lights).forEach(key => {
            scene.add(this.lights[key]);
        });
        
        if(this.lights.spot) scene.add(this.lights.spot.target);
    }

    setupGUI(gui) {
        const folder = gui.addFolder('Hệ Thống Ánh Sáng');
        folder.add(this.lights.ambient, 'intensity', 0, 1).name('Ambient Cường Độ');
        folder.add(this.lights.directional, 'intensity', 0, 2).name('Mặt Trời Cường Độ');
        folder.add(this.lights.point, 'intensity', 0, 3).name('Đèn Điểm Cường Độ');
        folder.add(this.lights.spot, 'intensity', 0, 3).name('Đèn Nón Cường Độ');
        folder.add(this.lights.spot, 'penumbra', 0, 1).name('Đèn Nón Độ Mờ Biên');
        folder.open();
    }
}