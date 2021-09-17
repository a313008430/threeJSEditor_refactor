import * as THREE from "three";

export class Engine {
    private renderTime: THREE.Clock = null;

    /**
     * 游戏渲染器
     */
    renderer: THREE.WebGLRenderer = null;

    /**
     * 游戏场景
     */
    sceneGame: THREE.Scene = null;

    /**
     * 透视像机
     */
    camera: THREE.PerspectiveCamera = null;

    init(canvas: HTMLCanvasElement) {
        console.log(canvas);
        console.log(THREE);

        this.renderTime = new THREE.Clock();

        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            context: canvas.getContext("webgl2"), //小程序 不支持webgl2
            alpha: true,
            //抗锯齿
            antialias: true,
        });
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        this.sceneGame = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000
        );

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this.sceneGame.add(cube);

        this.camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            this.renderer.render(this.sceneGame, this.camera);
        };

        animate();
    }

    private dt: number;
    private animate() {
        requestAnimationFrame(() => this.animate());

        this.renderer.render(this.sceneGame, this.camera);

        this.dt = this.renderTime.getDelta();
    }

    /**
     * 更新游戏的正交相机
     */
    private updateCameraOrh() {
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 1000;

        // this.cameraOrh.left = (frustumSize * aspect) / -1.6;
        // this.cameraOrh.right = (frustumSize * aspect) / 1.6;
        // this.cameraOrh.top = frustumSize / 1.6;
        // this.cameraOrh.bottom = frustumSize / -1.6;
        // this.cameraOrh.updateProjectionMatrix();

        // console.log((frustumSize * aspect) / 2, frustumSize / 2)

        // this.cameraOrhBg.left = (frustumSize * aspect) / -1.6;
        // this.cameraOrhBg.right = (frustumSize * aspect) / 1.6;
        // this.cameraOrhBg.top = frustumSize / 1.6;
        // this.cameraOrhBg.bottom = frustumSize / -1.6;

        // this.cameraOrhBg.updateProjectionMatrix();
    }
}
