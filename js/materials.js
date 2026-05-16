class MaterialManager {
    constructor() {
        this.textures = this.createProceduralTextures();
        this.materials = {};
        this.initMaterials();
    }

    createProceduralTextures() {
        const canvasSize = 512;
        const canvas = document.createElement('canvas');
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff'; ctx.fillRect(0,0,canvasSize,canvasSize);
        ctx.fillStyle = '#999999';
        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                if ((i+j)%2 === 0) ctx.fillRect(i*64, j*64, 64, 64);
            }
        }
        const colorTexture = new THREE.CanvasTexture(canvas);
        colorTexture.wrapS = THREE.RepeatWrapping;
        colorTexture.wrapT = THREE.RepeatWrapping;
        colorTexture.repeat.set(2, 2);

        const canvasR = document.createElement('canvas');
        canvasR.width = 256; canvasR.height = 256;
        const ctxR = canvasR.getContext('2d');
        ctxR.fillStyle = '#222222'; ctxR.fillRect(0,0,256,256); 
        ctxR.strokeStyle = '#ffffff'; ctxR.lineWidth = 2;
        for(let i=0; i<20; i++) { 
            ctxR.beginPath();
            ctxR.arc(Math.random()*256, Math.random()*256, Math.random()*50, 0, Math.PI*2);
            ctxR.stroke();
        }
        const roughnessTexture = new THREE.CanvasTexture(canvasR);

        return { color: colorTexture, roughness: roughnessTexture };
    }

    initMaterials() {
        const color = 0x3a93ff; 

        // MeshBasicMaterial
        this.materials['Basic'] = new THREE.MeshBasicMaterial({ color: color });

        // MeshLambertMaterial
        this.materials['Lambert'] = new THREE.MeshLambertMaterial({ color: color });

        // MeshPhongMaterial
        this.materials['Phong'] = new THREE.MeshPhongMaterial({ 
            color: color, 
            shininess: 100, 
            specular: 0x555555 
        });

        // MeshStandardMaterial
        this.materials['Standard'] = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.2,
            metalness: 0.8,
            map: this.textures.color,
            roughnessMap: this.textures.roughness
        });

        // Ground Plane
        this.materials['Ground'] = new THREE.MeshStandardMaterial({
            color: 0x222222,
            roughness: 0.6,
            metalness: 0.1
        });
    }

    getMaterial(type) {
        return this.materials[type] || this.materials['Standard'];
    }
}