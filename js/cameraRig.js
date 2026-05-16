class CameraRig {
    constructor(camera) {
        this.camera = camera;

        this.rigY = new THREE.Group();
        this.rigX = new THREE.Group(); 

        this.rigY.name = "cameraRig_Y";
        this.rigX.name = "cameraRig_X";

        this.rigY.add(this.rigX);
        this.rigX.add(this.camera);

        this.camera.position.z = 40;
    }

    addToScene(scene) {
        scene.add(this.rigY);
    }

    initIntroAnimation() {
        new TWEEN.Tween(this.camera.position)
            .to({ z: 25 }, 3000)
            .easing(TWEEN.Easing.Cubic.Out)
            .start();

        this.rigX.rotation.x = -Math.PI / 4;
        new TWEEN.Tween(this.rigY.rotation)
            .to({ y: Math.PI * 2 }, 4000)
            .easing(TWEEN.Easing.Quintic.Out)
            .start();
    }
}