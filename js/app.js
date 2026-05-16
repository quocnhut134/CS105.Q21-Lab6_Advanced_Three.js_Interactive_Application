class Application {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.clock = new THREE.Clock();
        this.simplex = new SimplexNoise(); 
        
        this.initThree();
        this.initModules();
        this.initGUI();
        
        this.cameraRig.initIntroAnimation();

        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        
        this.animate();
    }

    initThree() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a1a);
        this.scene.fog = new THREE.FogExp2(0x1a1a1a, 0.015);

        this.camera = new THREE.PerspectiveCamera(
            45, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
        
        this.container.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true; 
        this.controls.dampingFactor = 0.05;
        this.controls.maxPolarAngle = Math.PI / 2 - 0.05; 
    }

    initModules() {
        this.materialManager = new MaterialManager();
        
        this.cameraRig = new CameraRig(this.camera);
        this.cameraRig.addToScene(this.scene);

        this.lightManager = new LightManager();
        this.lightManager.addToScene(this.scene);

        this.objectManager = new ObjectManager(this.materialManager);
        this.objectManager.addToScene(this.scene);
    }

    initGUI() {
        this.gui = new dat.GUI();
        
        const matParam = { MaterialType: 'Standard' };
        this.gui.add(matParam, 'MaterialType', ['Basic', 'Lambert', 'Phong', 'Standard'])
            .name('Loại Vật Liệu Mesh')
            .onChange((value) => {
                this.objectManager.updateGridMaterial(value);
            });

        const fogFolder = this.gui.addFolder('Hiệu Ứng Sương Mù');
        fogFolder.add(this.scene.fog, 'density', 0, 0.1).name('Mật Độ Sương');
        
        this.lightManager.setupGUI(this.gui);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const elapsedTime = this.clock.getElapsedTime();

        TWEEN.update();

        this.controls.update();

        if(this.lightManager.lights.point) {
            this.lightManager.lights.point.position.x = Math.sin(elapsedTime * 0.8) * 6;
            this.lightManager.lights.point.position.z = Math.cos(elapsedTime * 0.8) * 6;
        }

        const boxes = this.objectManager.gridGroup.children;
        boxes.forEach((box) => {
            const userData = box.userData;
            
            const x = userData.gridX;
            const z = userData.gridZ;

            const noiseVal = this.simplex.noise2D(x * 0.15 + elapsedTime * 0.5, z * 0.15 + elapsedTime * 0.5);
            const sineVal = Math.sin(elapsedTime * 2 + userData.index * 0.05);
            const finalScaleY = ((noiseVal + sineVal) * 0.5 + 1.0) * 4.0 + 0.1;

            box.scale.y = finalScaleY;
        });

        this.renderer.render(this.scene, this.camera);
    }
}

window.onload = () => {
    new Application();
};