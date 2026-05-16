class ObjectManager {
    constructor(materialManager) {
        this.materialManager = materialManager;
        this.gridGroup = new THREE.Group();
        this.gridGroup.name = "BoxGrid_Group";
        this.createBoxGrid();
        this.createGround();
    }

    createBoxGrid() {
        const amount = 10;      
        const separation = 1.5; 
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        
        geometry.translate(0, 0.5, 0); 

        const initialMat = this.materialManager.getMaterial('Standard');

        let index = 0;
        for (let i = 0; i < amount; i++) {
            for (let j = 0; j < amount; j++) {
                const mesh = new THREE.Mesh(geometry, initialMat);
                
                mesh.position.x = (i - amount / 2) * separation;
                mesh.position.z = (j - amount / 2) * separation;
                mesh.position.y = 0;

                mesh.userData = {
                    index: index,
                    gridX: i,
                    gridZ: j
                };

                this.gridGroup.add(mesh);
                index++;
            }
        }
    }

    createGround() {
        const groundGeo = new THREE.PlaneGeometry(100, 100);
        const groundMat = this.materialManager.getMaterial('Ground');
        this.ground = new THREE.Mesh(groundGeo, groundMat);
        
        this.ground.rotation.x = -Math.PI / 2; 
        this.ground.position.y = 0;
        this.ground.name = "Ground_Plane";
    }

    addToScene(scene) {
        scene.add(this.gridGroup);
        scene.add(this.ground);

        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                if (child.name === "Ground_Plane") {
                    child.receiveShadow = true;  
                } else {
                    child.castShadow = true;     
                    child.receiveShadow = true;  
                }
            }
        });
    }

    updateGridMaterial(materialType) {
        const targetMat = this.materialManager.getMaterial(materialType);
        this.gridGroup.children.forEach(child => {
            child.material = targetMat;
        });
    }
}